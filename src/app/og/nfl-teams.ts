export type TeamColors = { primary: string; secondary: string }

export const NFL_TEAMS: Record<string, TeamColors> = {
  "Arizona Cardinals": { primary: "#97233F", secondary: "#000000" },
  "Atlanta Falcons": { primary: "#A71930", secondary: "#000000" },
  "Baltimore Ravens": { primary: "#241773", secondary: "#000000" },
  "Buffalo Bills": { primary: "#00338D", secondary: "#C60C30" },
  "Carolina Panthers": { primary: "#0085CA", secondary: "#101820" },
  "Chicago Bears": { primary: "#0B162A", secondary: "#C83803" },
  "Cincinnati Bengals": { primary: "#FB4F14", secondary: "#000000" },
  "Cleveland Browns": { primary: "#311D00", secondary: "#FF3C00" },
  "Dallas Cowboys": { primary: "#003594", secondary: "#041E42" },
  "Denver Broncos": { primary: "#FB4F14", secondary: "#002244" },
  "Detroit Lions": { primary: "#0076B6", secondary: "#B0B7BC" },
  "Green Bay Packers": { primary: "#203731", secondary: "#FFB612" },
  "Houston Texans": { primary: "#03202F", secondary: "#A71930" },
  "Indianapolis Colts": { primary: "#002C5F", secondary: "#A2AAAD" },
  "Jacksonville Jaguars": { primary: "#006778", secondary: "#D7A22A" },
  "Kansas City Chiefs": { primary: "#E31837", secondary: "#FFB612" },
  "Las Vegas Raiders": { primary: "#000000", secondary: "#A5ACAF" },
  "Los Angeles Chargers": { primary: "#002A5E", secondary: "#FFC20E" },
  "Los Angeles Rams": { primary: "#003594", secondary: "#FFA300" },
  "Miami Dolphins": { primary: "#008E97", secondary: "#FC4C02" },
  "Minnesota Vikings": { primary: "#4F2683", secondary: "#FFC62F" },
  "New England Patriots": { primary: "#002244", secondary: "#C60C30" },
  "New Orleans Saints": { primary: "#D3BC8D", secondary: "#101820" },
  "New York Giants": { primary: "#0B2265", secondary: "#A71930" },
  "New York Jets": { primary: "#125740", secondary: "#000000" },
  "Philadelphia Eagles": { primary: "#004C54", secondary: "#A5ACAF" },
  "Pittsburgh Steelers": { primary: "#FFB612", secondary: "#101820" },
  "San Francisco 49ers": { primary: "#AA0000", secondary: "#B3995D" },
  "Seattle Seahawks": { primary: "#002244", secondary: "#69BE28" },
  "Tampa Bay Buccaneers": { primary: "#D50A0A", secondary: "#34302B" },
  "Tennessee Titans": { primary: "#0C2340", secondary: "#418FDE" },
  "Washington Football Team": { primary: "#773141", secondary: "#FFB612" },
  "Washington Commanders": { primary: "#773141", secondary: "#FFB612" }
}

export const NFL_TEAM_NAMES = Object.keys(NFL_TEAMS).sort()

export function colorsFor(team?: string): TeamColors | null {
  if (!team) return null
  return NFL_TEAMS[team] ?? null
}
