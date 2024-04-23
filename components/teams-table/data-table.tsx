"use client"

import * as React from "react"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableViewOptions } from "./data-table-view-options"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const router = useRouter();
  const pathname = usePathname()
  const seasonId = pathname.split('/')[1];

  const pushToTeamPage = (teamAbbreviation: string) => {
    router.push(`${pathname}/${teamAbbreviation}`);
  };

  const pushToSeasonPage = (season: string) => {
    router.push(season);
  };

  const startYear = 1917;
  const endYear = 2023;

  const seasons = Array(endYear - startYear + 1).fill(0).map((_, i) => {
    const seasonStart = startYear + i;
    const seasonEnd = seasonStart + 1;
    return `${seasonStart}${seasonEnd}`;
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
            placeholder="Search teams"
            value={(table.getColumn("Team")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Team")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[250px] mr-4"
        />
        <Select onValueChange={(value) => pushToSeasonPage(value)} defaultValue={seasonId}>
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue placeholder="Select a season" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {seasons.map((season) => (
                <SelectItem 
                  key={season} 
                  value={season}
                >
                  {`${season.slice(0, 4)}-${season.slice(4, 8)}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.id === 'Team Abbreviation') {
                    return null;
                  }

                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow onClick={() => pushToTeamPage(row.getValue("Team Abbreviation"))}
                  key={row.id}
                  className="h-24"
                >
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === "Team Abbreviation") {
                      return null;
                    }

                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
