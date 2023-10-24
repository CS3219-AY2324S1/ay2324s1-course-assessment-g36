import { MatchCriteria, MatchResult } from "@/interfaces"
// const MATCHING_API = 'http://localhost:3001/match'

export async function getMatch(criteria: MatchCriteria): Promise<MatchResult> {
    // const response = await fetch(MATCHING_API);
    // const data = await response.json();
    // return data.res;
    await new Promise(f => setTimeout(f, 2_000));
    return {
        user_id: 100,
        username: 'john appleseed'
    }
}
