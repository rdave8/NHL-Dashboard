"use server"

import { Team, columns } from "../../components/teams-table/columns"
import { DataTable } from "../../components/teams-table/data-table"

async function getData(seasonId: string): Promise<Team[]> {
    const seasonResponse = await fetch(`https://api-web.nhle.com/v1/standings-season`);
    if (!seasonResponse.ok) {
      throw new Error(`HTTP error! status: ${seasonResponse.status}`);
    }
    const seasonData = await seasonResponse.json();
  
    const season = seasonData.seasons.find((season: any) => season.id.toString() === seasonId);
    const date = season.standingsEnd;
  
    const standingsResponse = await fetch(`https://api-web.nhle.com/v1/standings/${date}`);
    if (!standingsResponse.ok) {
      throw new Error(`HTTP error! status: ${standingsResponse.status}`);
    }
    const standingsData = await standingsResponse.json();
  
    return standingsData.standings;
}

export default async function Home({params}: {params: {seasonId: string}}) {
  const data = await getData(params.seasonId)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-32">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
