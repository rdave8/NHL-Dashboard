"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import Image from 'next/image'

export type Team = {
  Logo: string,
  Team: string,
  TeamAbbreviation: string,
  GamesPlayed: number,
  Wins: number,
  Losses: number,
  WinPercentage: number,
  Standing: number,
}

export const columns: ColumnDef<Team>[] = [
  {
    id: "Logo",
    accessorKey: "teamLogo",
    header: "",
    cell: ({ row }) => (
      <Image
        src={row.getValue("Logo")}
        alt=""
        width={90}
        height={90}
      />
    ),
  },
  {
    id: "Team",
    accessorKey: "teamName.default",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team" />
    ),
  },
  {
    id: "Team Abbreviation",
    accessorKey: "teamAbbrev.default",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Abbreviation" />
    ),
  },
  {
    id: "Games Played",
    accessorKey: "gamesPlayed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Games Played" />
    ),
  },
  {
    id: "Wins",
    accessorKey: "wins",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wins" />
    ),
  },
  {
    id: "Losses",
    accessorKey: "losses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Losses" />
    ),
    cell: ({ row }) => {
      const gamesPlayed = parseInt(row.getValue("Games Played"));
      const wins = parseInt(row.getValue("Wins"));
      const losses = gamesPlayed - wins;
      return losses;
    },
  },
  {
    id: "Win Percentage",
    accessorKey: "winPctg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Win Percentage" />
    ),
    cell: ({ row }) => {
      const winPctg = parseFloat(row.getValue("Win Percentage"));
      const roundedWinPctg = Math.round(winPctg * 100) / 100;
      return roundedWinPctg;
    },
  },
  {
    id: "Standing",
    accessorKey: "leagueSequence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Standing" />
    ),
  },
]
