/* Sends rows to a Google Sheet through its Apps Script web app
   (apps/api/google-apps-script/AdsConversions.gs). No Google Cloud project
   or service account: the script runs as the sheet's owner and checks a
   shared secret. */
export class SheetWebhookClient {
  constructor(
    private readonly url: string,
    private readonly secret: string,
  ) {}

  private async post(body: Record<string, unknown>) {
    /* Apps Script answers a POST with a redirect to the result; fetch follows it. */
    const res = await fetch(this.url, {
      method: 'POST',
      headers: { 'content-type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...body, secret: this.secret }),
      redirect: 'follow',
    });
    const text = await res.text();
    let out: { ok?: boolean; error?: string } = {};
    try {
      out = JSON.parse(text);
    } catch {
      throw new Error(`Sheet script did not answer (HTTP ${res.status}). Check the web app URL and that it is deployed for "Anyone".`);
    }
    if (!res.ok || !out.ok) throw new Error(`Sheet script: ${out.error ?? `HTTP ${res.status}`}`);
  }

  /* Creates each missing tab with its first rows (headers). */
  ensureTabs(tabs: Record<string, string[][]>) {
    return this.post({ action: 'ensureTabs', tabs });
  }

  append(tab: string, rows: (string | number)[][]) {
    if (!rows.length) return Promise.resolve();
    return this.post({ action: 'append', tab, rows });
  }
}
