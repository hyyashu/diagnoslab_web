/**
 * Diagnos Lab: bookings -> Google Ads conversions sheet.
 *
 * The API (apps/api/src/routes/leads/ads-upload.service.ts) posts each
 * Google Ads booking here; this script writes it as a row in one of two tabs
 * that Google Ads reads on a schedule:
 *   "Google Ads - click IDs"       (bookings with a Google click ID)
 *   "Google Ads - phone and email" (other Google Ads bookings, hashed)
 * The API creates the tabs and headers on its first call.
 *
 * Setup (once):
 * 1. In the Google Sheet: Extensions > Apps Script. Paste this file, save.
 * 2. Project Settings (gear) > Script properties > Add property:
 *      SECRET = a long random text (same as GOOGLE_SHEET_WEBHOOK_SECRET
 *      in the API's environment on Dokploy).
 * 3. Deploy > New deployment > type "Web app":
 *      Execute as: Me
 *      Who has access: Anyone
 *    Approve the permissions, then copy the Web app URL into
 *    GOOGLE_SHEET_WEBHOOK_URL on Dokploy.
 * 4. Optional: run testSetup() once from the editor; it checks the secret
 *    is set and shows which tabs exist.
 *
 * After editing this script: Deploy > Manage deployments > edit > Version:
 * New version, so the same URL runs the new code.
 */

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret) return reply_({ ok: false, error: 'SECRET is not set in Script properties' });
    if (body.secret !== secret) return reply_({ ok: false, error: 'Wrong secret' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (body.action === 'ensureTabs') {
        var created = [];
        Object.keys(body.tabs || {}).forEach(function (name) {
          if (ss.getSheetByName(name)) return;
          var sheet = ss.insertSheet(name);
          appendRows_(sheet, body.tabs[name]);
          sheet.setFrozenRows(2);
          created.push(name);
        });
        return reply_({ ok: true, created: created });
      }
      if (body.action === 'append') {
        var tab = ss.getSheetByName(body.tab);
        if (!tab) return reply_({ ok: false, error: 'Tab not found: ' + body.tab });
        appendRows_(tab, body.rows || []);
        return reply_({ ok: true, added: (body.rows || []).length });
      }
      return reply_({ ok: false, error: 'Unknown action' });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return reply_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

/* A browser visit to the URL shows that the script is live. */
function doGet() {
  return reply_({ ok: true, service: 'Diagnos Lab Google Ads sheet' });
}

/* The first column (click ID or hashed email) and the time go in as plain
   text, so Sheets never reformats them; the value stays a number. */
function appendRows_(sheet, rows) {
  if (!rows.length) return;
  var width = rows.reduce(function (w, r) { return Math.max(w, r.length); }, 0);
  var values = rows.map(function (r) {
    var row = r.slice();
    while (row.length < width) row.push('');
    return row;
  });
  var start = sheet.getLastRow() + 1;
  sheet.getRange(start, 1, values.length, width).setNumberFormat('@');
  values.forEach(function (row, i) {
    row.forEach(function (v, j) {
      if (typeof v === 'number') sheet.getRange(start + i, j + 1).setNumberFormat('0');
    });
  });
  sheet.getRange(start, 1, values.length, width).setValues(values);
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function testSetup() {
  var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
  Logger.log(secret ? 'SECRET is set (' + secret.length + ' characters).' : 'SECRET is NOT set.');
  Logger.log('Tabs: ' + SpreadsheetApp.getActiveSpreadsheet().getSheets().map(function (s) { return s.getName(); }).join(', '));
}
