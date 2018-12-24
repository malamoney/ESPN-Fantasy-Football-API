import ApiModel from '../api-model/api-model.js';

/**
 * Represents a fantasy football league. Due to ESPN's API routing, most information comes from the
 * league request. It's what we got ¯\\\_(ツ)_/¯.
 * @extends ApiModel
 */
class League extends ApiModel {
  /**
   * @typedef {object} LeagueModel
   *
   * On the ESPN API:
   *
   * `matchupPeriod` refers to an entire match-up, including if the match-up lasts
   * multiple weeks (not rare in playoff settings for smaller leagues).
   *
   * `scoringPeriod` refers to a single NFL week. Since most match-ups are 1 week long, this will
   * match up with the `matchupPeriod`. However, for multi-week match-ups, this allows one to get
   * information about a specific week in the match-up (useful in multi-week playoff match-up).
   *
   * @property {number} leagueId
   * @property {string} seasonId The season (year) of the league data.
   * @property {string} name The league's name.
   * @property {number} numTeams The number of teams in the league.
   * @property {number} numPlayoffTeams The number of teams that make the playoffs.
   * @property {number} scoringDecimalPlaces The number of decimals used in scoring.
   * @property {number} numRegularSeasonMatchups The number of regular season match-ups. If the
   *                                             league's regular season match-up length is 1, then
   *                                             this is also the number of weeks in the regular
   *                                             season.
   * @property {number} playoffMatchupLength The length of each match-up in the playoffs. This is
   *                                         typically 1 (week) or 2 (weeks).
   * @property {number} firstMatchupId The id of the first match-up period. Almost always 1.
   * @property {number} firstWeekId The first NFL week on which a match-up occurs. Almost always 1.
   * @property {number} lastMatchupId The id of the last match-up. Is a function of weeks played and
   *                                  playoff match-up period. If `playoffMatchupLength` is 1 and
   *                                  the last week played is 16, then `lastMatchupId` will be 16.
   *                                  If `playoffMatchupLength` is 2, the first week of the playoffs
   *                                  is 14, and the last week played is 17, then `lastMatchupId` is
   *                                  15.
   * @property {number} lastWeekId The id of the last NFL week played.
   */

  /**
    * @type {LeagueModel}
    */
  static responseMap = {
    leagueId: 'leaguesettings.id',
    seasonId: 'metadata.seasonId',
    name: 'leaguesettings.name',
    // divisions: 'divisions' TODO: Division class?
    // teams: 'teams' TODO: Add support for defining models on map

    numTeams: 'leaguesettings.size',
    numPlayoffTeams: 'leaguesettings.playoffTeamCount',
    scoringDecimalPlaces: 'leaguesettings.scoringDecimalPlaces',

    numRegularSeasonMatchups: 'leaguesettings.regularSeasonMatchupPeriodCount',
    playoffMatchupLength: 'leaguesettings.playoffMatchupLength',
    firstMatchupId: 'leaguesettings.firstMatchupPeriodId',
    firstWeekId: 'leaguesettings.firstScoringPeriodId',
    lastMatchupId: 'leaguesettings.finalMatchupPeriodId',
    lastWeekId: 'leaguesettings.finalScoringPeriodId'
  };

  static displayName = 'League';

  static idName = 'leagueId';

  static route = 'leagueSettings';
}

export default League;