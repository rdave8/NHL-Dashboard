"use client"

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export interface DashboardProps {
    playerData: {
      forwards: Array<{
        id: number;
        headshot: string;
        firstName: { default: string };
        lastName: { default: string };
        sweaterNumber: number;
        positionCode: string;
        shootsCatches: string;
        heightInInches: number;
        weightInPounds: number;
      }>;
      defensemen: Array<{
        id: number;
        headshot: string;
        firstName: { default: string };
        lastName: { default: string };
        sweaterNumber: number;
        positionCode: string;
        shootsCatches: string;
        heightInInches: number;
        weightInPounds: number;
      }>;
      goalies: Array<{
        id: number;
        headshot: string;
        firstName: { default: string };
        lastName: { default: string };
        sweaterNumber: number;
        positionCode: string;
        shootsCatches: string;
        heightInInches: number;
        weightInPounds: number;
      }>;
    };
    teamData: {
      teamName: { default: string };
      seasonId: number;
      wins: number;
      gamesPlayed: number;
      winPctg: number;
      l10Wins: number;
      leagueSequence: number;
      losses: number;
      otLosses: number;
      ties: number;
      shootoutWins: number;
      shootoutLosses: number;
      goalFor: number;
      goalAgainst: number;
      pointPctg: number;
      goalDifferentialPctg: number;
      points: number;
      goalDifferential: number;
      highestGoalDifferential: number;
      lowestGoalDifferential: number;
      divisionName: string;
      divisionSequence: number;
      conferenceName: string;
      conferenceSequence: number;
      homeGamesPlayed: number;
      homePoints: number;
      homeWins: number;
      homeLosses: number;
      homeOtLosses: number;
      homeTies: number;
      homeGoalsFor: number;
      homeGoalsAgainst: number;
      homeGoalDifferential: number;
      roadGamesPlayed: number;
      roadPoints: number;
      roadWins: number;
      roadLosses: number;
      roadOtLosses: number;
      roadTies: number;
      roadGoalsFor: number;
      roadGoalsAgainst: number;
      roadGoalDifferential: number;
    };
  }

export function Dashboard({
  playerData,
  teamData,
}: DashboardProps) {
    return (
      <div className="flex min-h-screen w-full flex-col sm:gap-4 sm:py-4 sm:px-14">
        <div className="h-20 mb-2 pt-2 text-center bg-background border-0">
          <CardTitle className="text-4xl">{teamData.teamName.default} {`${teamData.seasonId.toString().slice(0, 4)}-${teamData.seasonId.toString().slice(6)}`} Season Stats</CardTitle>
        </div>
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-2">
                  <CardDescription>Standing</CardDescription>
                  <CardTitle className="text-4xl">{teamData.leagueSequence}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    With {teamData.points} points
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={(33-teamData.leagueSequence)/32*100} />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Season Wins</CardDescription>
                  <CardTitle className="text-4xl">{teamData.wins}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Out of {teamData.gamesPlayed} games
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={teamData.winPctg*100} />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Last 10 Game Wins</CardDescription>
                  <CardTitle className="text-4xl">{teamData.l10Wins}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    And {10-teamData.l10Wins} losses
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={teamData.l10Wins/10*100}/>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="pb-2">
                  <CardDescription>Goal Differential</CardDescription>
                  <CardTitle className="text-4xl">{teamData.goalDifferential > 0 ? `+${teamData.goalDifferential}` : teamData.goalDifferential}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {teamData.goalFor} goals scored
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={(teamData.goalDifferential-teamData.lowestGoalDifferential)/(teamData.highestGoalDifferential-teamData.lowestGoalDifferential)*100} />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="Forwards">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Forwards">Forwards</TabsTrigger>
                  <TabsTrigger value="Defensemen">Defensemen</TabsTrigger>
                  <TabsTrigger value="Goalies">Goalies</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="Forwards">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Roster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Number
                          </TableHead>
                          <TableHead>
                            Position
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Handedness
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Height
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Weight
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerData.forwards.map((player) => (
                            <TableRow key={player.id} className="bg-accent">
                            <TableCell>
                                <Image
                                src={player.headshot}
                                alt={""}
                                width={65}
                                height={65}
                                />
                            </TableCell>
                            <TableCell>{`${player.firstName.default} ${player.lastName.default}`}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.sweaterNumber}
                            </TableCell>
                            <TableCell>
                                {player.positionCode}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.shootsCatches}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.heightInInches}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.weightInPounds}
                            </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="Defensemen">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Roster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Number
                          </TableHead>
                          <TableHead>
                            Position
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Handedness
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Height
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Weight
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerData.defensemen.map((player) => (
                            <TableRow key={player.id} className="bg-accent">
                            <TableCell>
                                <Image
                                src={player.headshot}
                                alt={""}
                                width={65}
                                height={65}
                                />
                            </TableCell>
                            <TableCell>{`${player.firstName.default} ${player.lastName.default}`}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.sweaterNumber}
                            </TableCell>
                            <TableCell>
                                {player.positionCode}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.shootsCatches}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.heightInInches}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.weightInPounds}
                            </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="Goalies">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Roster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Number
                          </TableHead>
                          <TableHead>
                            Position
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Handedness
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Height
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Weight
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerData.goalies.map((player) => (
                            <TableRow key={player.id} className="bg-accent">
                            <TableCell>
                                <Image
                                src={player.headshot}
                                alt={""}
                                width={65}
                                height={65}
                                />
                            </TableCell>
                            <TableCell>{`${player.firstName.default} ${player.lastName.default}`}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.sweaterNumber}
                            </TableCell>
                            <TableCell>
                                {player.positionCode}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.shootsCatches}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.heightInInches}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                {player.weightInPounds}
                            </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <CardTitle>Season Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Overall Stats</div>
                  <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Standing
                    </span>
                    <span>
                      {teamData.leagueSequence}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Games Played
                    </span>
                    <span>
                      {teamData.gamesPlayed}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Points
                    </span>
                    <span>
                      {teamData.points}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Point Percentage
                    </span>
                    <span>
                    {parseFloat(teamData.pointPctg.toString()).toFixed(2)}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Win Percentage
                    </span>
                    <span>
                    {parseFloat(teamData.winPctg.toString()).toFixed(2)}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Wins
                    </span>
                    <span>
                      {teamData.wins}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Losses
                    </span>
                    <span>
                      {teamData.losses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Overtime Losses
                    </span>
                    <span>
                      {teamData.otLosses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ties
                    </span>
                    <span>
                      {teamData.ties}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Shootout Wins
                    </span>
                    <span>
                      {teamData.shootoutWins}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Shootout Losses
                    </span>
                    <span>
                      {teamData.shootoutLosses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goals For
                    </span>
                    <span>
                      {teamData.goalFor}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goals Against
                    </span>
                    <span>
                      {teamData.goalAgainst}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goal Differential
                    </span>
                    <span>
                      {teamData.goalDifferential}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goal Differential Percentage
                    </span>
                    <span>
                      {parseFloat(teamData.goalDifferentialPctg.toString()).toFixed(2)}
                      </span>
                  </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Division Stats</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Division
                      </span>
                      <span>
                        {teamData.divisionName}
                        </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Standing
                      </span>
                      <span>
                        {teamData.divisionSequence}
                        </span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Conference Stats</div>
                  <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Conference
                    </span>
                    <span>
                      {teamData.conferenceName}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Standing
                    </span>
                    <span>
                      {teamData.conferenceSequence}
                      </span>
                  </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Home Stats</div>
                  <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Games Played
                    </span>
                    <span>
                      {teamData.homeGamesPlayed}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Points
                    </span>
                    <span>
                      {teamData.homePoints}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Wins
                    </span>
                    <span>
                      {teamData.homeWins}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Losses
                    </span>
                    <span>
                      {teamData.homeLosses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Overtime Losses
                    </span>
                    <span>
                      {teamData.homeOtLosses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ties
                    </span>
                    <span>
                      {teamData.homeTies}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goals For
                    </span>
                    <span>
                      {teamData.homeGoalsFor}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goals Against
                    </span>
                    <span>
                      {teamData.homeGoalsAgainst}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goal Differential
                    </span>
                    <span>
                      {teamData.homeGoalDifferential}
                      </span>
                  </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Road Stats</div>
                  <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Games Played
                    </span>
                    <span>
                      {teamData.roadGamesPlayed}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Points
                    </span>
                    <span>
                      {teamData.roadPoints}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Wins
                    </span>
                    <span>
                      {teamData.roadWins}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Losses
                    </span>
                    <span>
                      {teamData.roadLosses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Overtime Losses
                    </span>
                    <span>
                      {teamData.roadOtLosses}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ties
                    </span>
                    <span>
                      {teamData.roadTies}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goals For
                    </span>
                    <span>
                      {teamData.roadGoalsFor}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goals Against
                    </span>
                    <span>
                      {teamData.roadGoalsAgainst}
                      </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Goal Differential
                    </span>
                    <span>
                      {teamData.roadGoalDifferential}
                      </span>
                  </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
}