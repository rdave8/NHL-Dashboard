// This page is not accessible; The user will be redirected to the 2023-2024 season page.

"use server"

import { Team, columns } from "../components/teams-table/columns"
import { DataTable } from "../components/teams-table/data-table"

async function getData(): Promise<Team[]> {
  const response = await fetch(`https://api-web.nhle.com/v1/standings/now`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.standings;
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-32">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
