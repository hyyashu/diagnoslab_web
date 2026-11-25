"use client";
import PageHeader from "@/components/PageHeader";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import EmployeeList from "./EmployeeList";
import EmployeeVisits from "./EmployeeVisits";
import VisitMapPanel from "./VisitMapPanel";
import MeetingSearchBar from "./MeetingSearchBar";
import MeetingHistoryTable from "./MeetingHistoryTable";
import HistoryMapPanel from "./HistoryMapPanel";

/* ================= EMPLOYEE DATA ================= */

const employees = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Sales Executive",
    visits: [
      {
        id: 1,
        client: "ABC Medical",
        time: "10:30 AM",
        status: "completed",
        lat: 25.5941,
        lng: 85.1376,
      },
      {
        id: 2,
        client: "Health Care Center",
        time: "2:00 PM",
        status: "attending",
        lat: 25.61,
        lng: 85.15,
      },
    ],
  },
  {
    id: 2,
    name: "Anita Verma",
    role: "Field Manager",
    visits: [],
  },
];

/* ================= HISTORY DATA ================= */

const historyData = [
  {
    id: 1,
    agent: "Rahul Sharma",
    client: "ABC Medical",
    remark: "Product discussion completed",
    checkIn: "10:00 AM",
    checkOut: "11:00 AM",
    location: "Patna",
    lat: 25.5941,
    lng: 85.1376,
    date: "2026-03-02",
  },
  {
    id: 2,
    agent: "Anita Verma",
    client: "Health Care Center",
    remark: "Follow-up meeting",
    checkIn: "1:00 PM",
    checkOut: "2:15 PM",
    location: "Muzaffarpur",
    lat: 25.61,
    lng: 85.15,
    date: "2026-03-01",
  },
];

export default function MeetingScreen() {
  /* ---------------- HISTORY STATE ---------------- */

  const [searchHistory, setSearchHistory] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  /* ---------------- SELECTION STATE ---------------- */

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  /* ================= FILTER LOGIC ================= */

  const filteredHistory = useMemo(() => {
    return historyData.filter((item) => {
      const matchesSearch =
        item.agent.toLowerCase().includes(searchHistory.toLowerCase()) ||
        item.client.toLowerCase().includes(searchHistory.toLowerCase()) ||
        item.remark.toLowerCase().includes(searchHistory.toLowerCase());

      const matchesEmployee =
        employeeFilter === "all" || item.agent === employeeFilter;

      const matchesClient =
        clientFilter === "all" || item.client === clientFilter;

        const matchesDate =
        !dateFilter ||
        item.date === dateFilter.toISOString().split("T")[0];

      return (
        matchesSearch &&
        matchesEmployee &&
        matchesClient &&
        matchesDate
      );
    });
  }, [searchHistory, employeeFilter, clientFilter, dateFilter]);

  return (
    <div className="space-y-5">
      <PageHeader title="Meetings" description="Doctor visits by the field team." />
      <Tabs defaultValue="upcoming" className="space-y-3">

        {/* ================= TAB HEADER ================= */}
        <TabsList>
          <TabsTrigger value="upcoming">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* ================= TODAY TAB ================= */}
        <TabsContent value="upcoming" className="space-y-4">
          <div className="flex flex-col xl:flex-row gap-6">
            
            <div className="xl:w-[280px]">
              <EmployeeList
                employees={employees}
                selected={selectedEmployee}
                onSelect={setSelectedEmployee}
              />
            </div>

            <div className="flex-1 border rounded-xl bg-white p-5">
              <EmployeeVisits employee={selectedEmployee} />
            </div>

            <div className="xl:w-[420px]">
              <VisitMapPanel employee={selectedEmployee} />
            </div>

          </div>
        </TabsContent>

        {/* ================= HISTORY TAB ================= */}
        <TabsContent value="history" className="space-y-4">

          <MeetingSearchBar
            type="history"
            search={searchHistory}
            setSearch={setSearchHistory}
            employee={employeeFilter}
            setEmployee={setEmployeeFilter}
            client={clientFilter}
            setClient={setClientFilter}
            date={dateFilter}
            setDate={setDateFilter}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            
            <div className="flex-1">
              <MeetingHistoryTable
                data={filteredHistory}
                onSelect={setSelectedHistory}
              />
            </div>

            <div className="lg:w-[350px]">
              <HistoryMapPanel data={selectedHistory} />
            </div>

          </div>

        </TabsContent>

      </Tabs>
    </div>
  );
}