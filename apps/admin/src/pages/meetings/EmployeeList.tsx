import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import StatusBadge from "@/components/common/StatusBadge";

export default function EmployeeList({
  employees,
  selected,
  onSelect,
}: any) {
  const [search, setSearch] = useState("");

  const filtered = employees.filter((e: any) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const getEmployeeStatus = (emp: any) => {
    if (!emp.visits?.length) return "pending";

    if (emp.visits.some((v: any) => v.status === "attending"))
      return "attending";

    if (emp.visits.every((v: any) => v.status === "completed"))
      return "completed";

    return "pending";
  };

  const renderBadge = (status: string) => {
    return <StatusBadge status={status} />;
  };

  return (
    <div className="w-full min-w-0 flex flex-col border rounded-xl bg-background h-full">
      
      {/* HEADER */}
      <div className="p-3 md:p-4 border-b">
        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10"
        />
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
        {filtered.map((emp: any) => {
          const status = getEmployeeStatus(emp);

          return (
            <Card
              key={emp.id}
              onClick={() => onSelect(emp)}
              className={`
                p-3 md:p-4 
                cursor-pointer 
                transition-all 
                duration-200
                hover:shadow-md 
                active:scale-[0.98]
                ${
                  selected?.id === emp.id
                    ? "border-primary bg-muted"
                    : ""
                }
              `}
            >
              <div className="flex items-center justify-between gap-2">

                {/* LEFT */}
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-9 w-9 md:h-10 md:w-10">
                    <AvatarFallback>
                      {emp.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <div className="font-medium truncate">
                      {emp.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {emp.role}
                    </div>
                  </div>
                </div>

                {/* RIGHT STATUS */}
                <div className="shrink-0">
                  {renderBadge(status)}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}