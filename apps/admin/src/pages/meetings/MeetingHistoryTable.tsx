"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface Props {
  data: any[];
  onSelect: (data: any) => void;
}

export default function MeetingHistoryTable({
  data,
  onSelect,
}: Props) {
  return (
    <div className="border rounded-xl bg-white p-3 md:p-6 overflow-x-auto">
      <Table className="min-w-[800px] md:min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Remark</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-10 text-muted-foreground"
              >
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onSelect(item)}
                className="cursor-pointer hover:bg-slate-50 transition"
              >
                <TableCell className="font-medium whitespace-nowrap">
                  {item.agent}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {item.client}
                </TableCell>

                <TableCell className="max-w-[200px] truncate">
                  {item.remark}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {item.checkIn}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {item.checkOut}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {item.location}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}