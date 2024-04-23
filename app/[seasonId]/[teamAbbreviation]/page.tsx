"use server"

import { Dashboard } from "../../../components/team-dashboard/dashboard"
    
async function getPlayerData(seasonId: string, teamAbbreviation: string): Promise<any> {
    const response = await fetch(`https://api-web.nhle.com/v1/roster/${teamAbbreviation}/${seasonId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function getTeamData(seasonId: string, teamAbbreviation: string): Promise<any> {
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

    const teamData = standingsData.standings.find((team: any) => team.teamAbbrev.default === teamAbbreviation);

    let highestGoalDifferential = standingsData.standings.reduce((max: any, team: any) => Math.max(max, team.goalDifferential), -Infinity);
    teamData.highestGoalDifferential = highestGoalDifferential;

    let lowestGoalDifferential = standingsData.standings.reduce((min: any, team: any) => Math.min(min, team.goalDifferential), Infinity);
    teamData.lowestGoalDifferential = lowestGoalDifferential;
    return teamData;
}

export default async function Team({params}: {params: {teamAbbreviation: string, seasonId: string}}) {
    const playerData = await getPlayerData(params.seasonId, params.teamAbbreviation);
    const teamData = await getTeamData(params.seasonId, params.teamAbbreviation);

    return (
    <main className="pt-32">
        <Dashboard playerData={playerData} teamData={teamData}/>
    </main>
    );
}
