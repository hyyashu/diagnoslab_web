"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  mode: "add" | "view";
  selectedDoctor: any;
  form: any;
  setForm: any;
  onCreate: () => void;
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 sm:w-[48%]">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium wrap-break-word">{value || "—"}</p>
  </div>
);

export default function DoctorsSheet({
  open,
  setOpen,
  mode,
  selectedDoctor,
  form,
  setForm,
  onCreate,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-[420px] sm:max-w-2xl h-full flex flex-col p-0">

        {/* ================= HEADER ================= */}
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            {mode === "add" ? "Add Doctor" : "Doctor Details"}
          </SheetTitle>
        </SheetHeader>

        {/* ================= BODY ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm">

          {/* ================= ADD MODE ================= */}
          {mode === "add" ? (
            <>
              {/* Basic Information */}
              <div className="border rounded-lg p-5 bg-muted/40 flex flex-col gap-4">
                <h3 className="font-semibold">Basic Information</h3>

                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Input
                    className="sm:w-[48%]"
                    placeholder="Doctor Name"
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Specialization"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        specialization: e.target.value,
                      })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Clinic Name"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        clinicName: e.target.value,
                      })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Phone"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="border rounded-lg p-5 flex flex-col gap-4">
                <h3 className="font-semibold">Address Details</h3>

                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Input
                    className="sm:w-[48%]"
                    placeholder="Address"
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Area"
                    onChange={(e) =>
                      setForm({ ...form, area: e.target.value })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Pincode"
                    onChange={(e) =>
                      setForm({ ...form, pincode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Professional Details */}
              <div className="border rounded-lg p-5 bg-muted/40 flex flex-col gap-4">
                <h3 className="font-semibold">
                  Professional Details
                </h3>

                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                  <Input
                    className="sm:w-[48%]"
                    placeholder="Years of Experience"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        experience: e.target.value,
                      })
                    }
                  />

                  <Input
                    className="sm:w-[48%]"
                    placeholder="Qualification"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        qualification: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            /* ================= VIEW MODE ================= */
            selectedDoctor && (
              <>
                {/* Basic Info */}
                <div className="border rounded-lg p-5 bg-muted/40 flex flex-col gap-4">
                  <h3 className="font-semibold">
                    Basic Information
                  </h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Info label="Name" value={selectedDoctor.name} />
                    <Info
                      label="Specialization"
                      value={selectedDoctor.specialization}
                    />
                    <Info
                      label="Clinic Name"
                      value={selectedDoctor.clinicName}
                    />
                    <Info label="Phone" value={selectedDoctor.phone} />
                    <Info label="Email" value={selectedDoctor.email} />
                  </div>
                </div>

                {/* Address */}
                <div className="border rounded-lg p-5 flex flex-col gap-4">
                  <h3 className="font-semibold">
                    Address Details
                  </h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Info label="Address" value={selectedDoctor.address} />
                    <Info label="Area" value={selectedDoctor.area} />
                    <Info label="Pincode" value={selectedDoctor.pincode} />
                  </div>
                </div>

                {/* Professional */}
                <div className="border rounded-lg p-5 bg-muted/40 flex flex-col gap-4">
                  <h3 className="font-semibold">
                    Professional Details
                  </h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Info
                      label="Experience"
                      value={selectedDoctor.experience}
                    />
                    <Info
                      label="Qualification"
                      value={selectedDoctor.qualification}
                    />
                  </div>
                </div>

                {/* System Info */}
                <div className="border rounded-lg p-5 flex flex-col gap-4">
                  <h3 className="font-semibold">
                    System Information
                  </h3>

                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Info
                      label="Active Status"
                      value={
                        selectedDoctor.isActive
                          ? "Active"
                          : "Inactive"
                      }
                    />
                    <Info label="Notes" value={selectedDoctor.notes} />
                    <Info label="Created At" value={selectedDoctor.createdAt} />
                    <Info label="Updated At" value={selectedDoctor.updatedAt} />
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {/* ================= FOOTER ================= */}
        <SheetFooter className="border-t px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>

          {mode === "add" && (
            <Button
              onClick={onCreate}
              className="w-full sm:w-auto"
            >
              Create Doctor
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}