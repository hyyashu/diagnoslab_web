import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/common/StatusBadge";

export default function EmployeeVisits({ employee }: any) {
  if (!employee)
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-6 text-center">
        Select employee
      </div>
    );

  const completed = employee.visits.filter(
    (v: any) => v.status === "completed"
  ).length;

  const getStatusBadge = (status: string) => {
    return (
      <StatusBadge
        status={status as "attending" | "completed" | "pending"}
      />
    );
  };

  return (
    <div className="flex-1 min-w-0 space-y-6 p-4 overflow-x-hidden">
      
      {/* HEADER */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold break-words">
          {employee.name}
        </h2>
        <div className="text-sm text-muted-foreground break-words">
          {employee.role}
        </div>
      </div>

      {/* STATS (FLEX VERSION) */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">
            Total Visits
          </div>
          <div className="text-2xl font-semibold">
            {employee.visits.length}
          </div>
        </Card>

        <Card className="flex-1 p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">
            Completed
          </div>
          <div className="text-2xl font-semibold text-green-600">
            {completed}
          </div>
        </Card>
      </div>

      {/* VISITS */}
      <div className="space-y-3">
        {employee.visits.map((v: any) => (
          <Card
            key={v.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md transition"
          >
            <div className="min-w-0">
              <div className="font-medium truncate">
                {v.client}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {v.time}
              </div>
            </div>

            <div className="self-start sm:self-auto">
              {getStatusBadge(v.status)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}