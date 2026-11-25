"use client";

import { useMemo, useState } from "react";
import DoctorsHeader from "./DoctorsHeader";
import DoctorsTable from "./DoctorsTable";
import DoctorsSheet from "./DoctorsSheet";

/* ---------------- MOCK DATA ---------------- */

const initialDoctors = [
    {
      id: 1,
      name: "Dr. Amit Sharma",
      specialization: "Cardiologist",
      clinicName: "Heart Care Clinic",
      phone: "9876543210",
      email: "amit.sharma@heartcare.com",
      address: "12 MG Road",
      area: "Andheri East",
      pincode: "400069",
  
      experience: "12 Years",
      qualification: "MBBS, MD (Cardiology)",
  
      isActive: true,
      notes: "Available for emergency consultations.",
      createdAt: "2025-01-10T10:30:00Z",
      updatedAt: "2025-02-15T12:00:00Z",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      specialization: "Dermatologist",
      clinicName: "Skin Glow Center",
      phone: "9823456789",
      email: "priya.mehta@skinglow.com",
      address: "45 Linking Road",
      area: "Bandra West",
      pincode: "400050",
  
      experience: "8 Years",
      qualification: "MBBS, MD (Dermatology)",
  
      isActive: true,
      notes: "Specialist in cosmetic dermatology.",
      createdAt: "2024-12-01T09:15:00Z",
      updatedAt: "2025-02-20T11:45:00Z",
    },
    {
      id: 3,
      name: "Dr. Rahul Verma",
      specialization: "Orthopedic Surgeon",
      clinicName: "Bone & Joint Clinic",
      phone: "9812345678",
      email: "rahul.verma@boneclinic.com",
      address: "78 SV Road",
      area: "Malad West",
      pincode: "400064",
      experience: "15 Years",
      qualification: "MBBS, MS (Orthopedics)",
      isActive: false,
      notes: "Currently on leave till next month.",
      createdAt: "2024-08-22T14:00:00Z",
      updatedAt: "2025-01-18T10:20:00Z",
    },
  ];

export default function Doctors() {
  const [doctors, setDoctors] = useState<any[]>(initialDoctors);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [specialization, setSpecialization] = useState("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "view">("add");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d: any) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "all" || d.isActive === (status === "active" ? true : false);
      const matchSpecialization = specialization === "all" || d.specialization === specialization;
      return matchSearch && matchStatus && matchSpecialization;
    });
  }, [doctors, search, status, specialization]);

  const handleAddDoctor = () => {
    if (!form.name) return;

    setDoctors((p: any) => [
      ...p,
      { ...form, isActive: true },
    ]);

    setForm({});
    setSheetOpen(false);
  };

  return (
    <div className="space-y-5">

      <DoctorsHeader
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        specialization={specialization}
        setSpecialization={setSpecialization}
        onAdd={() => {
          setMode("add");
          setSelectedDoctor(null);
          setSheetOpen(true);
        }}
      />

      <DoctorsTable
        doctors={filteredDoctors}
        onView={(doctor) => {
          setSelectedDoctor(doctor);
          setMode("view");
          setSheetOpen(true);
        }}
        onDelete={(name) =>
          setDoctors((p) =>
            p.filter((x: any) => x.name !== name),
          )
        }
      />

      <DoctorsSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        mode={mode}
        selectedDoctor={selectedDoctor}
        form={form}
        setForm={setForm}
        onCreate={handleAddDoctor}
      />
    </div>
  );
}