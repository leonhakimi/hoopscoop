import { format } from "date-fns";
import axios from "axios";
import {
  FETCH_USER,
  UPDATE_DEFAULT,
  UPDATE_STATS,
  UPDATE_DATE,
  UPDATE_AVERAGES,
  UPDATE_CATEGORY, 
  UPDATE_COMPARISON
} from "./types";

const calculatePoints = ({
  pts,
  reb,
  ast,
  blk,
  stl,
  turnover,
  fga,
  fgm,
  fg3m,
  ftm,
  fta,
}) => {
  return (
    pts +
    fg3m -
    fga +
    2 * fgm -
    fta +
    ftm +
    reb +
    2 * ast +
    4 * stl +
    4 * blk -
    2 * turnover
  );
};

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateDefault = (players) => {
  return {
    type: UPDATE_DEFAULT,
    payload: players,
  };
};

// export const updateDate = (date, players) => async (dispatch) => {
//   const playerQuery = players
//     .map((player) => `&player_ids[]=${player.value}`)
//     .join("");

//   const startDate = "?start_date=" + format(date[0], "yyyy-MM-dd");

//   const endDate = "&end_date=" + format(date[1], "yyyy-MM-dd");

//   const { data } = await axios.get(
//     "https://www.balldontlie.io/api/v1/stats" +
//       startDate +
//       endDate +
//       playerQuery + "&per_page=100"
//   );

//   const stats = data.data.map((gamelog) => {
//     return {
//       id: gamelog.id,
//       name: `${gamelog.player.first_name} ${gamelog.player.last_name}`,
//       playerId: gamelog.player.id,
//       fp: calculatePoints(gamelog),
//       date: gamelog.game.date,
//       pts: gamelog.pts,
//       ast: gamelog.ast,
//       reb:  gamelog.reb,
//       blk: gamelog.blk,
//       stl: gamelog.stl,
//       tov: gamelog.turnover
//     };
//   });

//   dispatch({
//     type: UPDATE_STATS,
//     payload: stats,
//   });

//   dispatch({
//     type: UPDATE_DATE,
//     payload: date,
//   });

//    const averages = await axios.get(
//      "https://www.balldontlie.io/api/v1/season_averages?season=2020" +
//        playerQuery
//    );

//   dispatch({
//     type: UPDATE_AVERAGES,
//     payload: averages.data.data
//   })
// };

const categories = ['pts', 'reb', 'ast', 'stl', 'blk', 'tov', 'fgm', 'fga', 'fta', 'ftm', 'fg3a', 'fg3m', 'oreb', 'dreb']

const getTotals = (totals, performance, player) => {
  categories.forEach(category => {
    totals[category][player] = totals[category][player] + performance[category]
  });
  if (performance.min != '') {
    totals.gp[player]++
  }
  return totals
}

export const updateStats = (date, playerA, playerB) => async (dispatch) => {
  const playerQuery = `&player_ids[]=${playerA.value}&player_ids[]=${playerB.value}`
    

  const startDate = "?start_date=" + format(date[0], "yyyy-MM-dd");

  const endDate = "&end_date=" + format(date[1], "yyyy-MM-dd");

  const { data } = await axios.get(
    "https://www.balldontlie.io/api/v1/stats" +
      startDate +
      endDate +
      playerQuery +
      "&per_page=100"
  );

  const stats = data.data.map((gamelog) => {
    return {
      id: gamelog.id,
      name: `${gamelog.player.first_name} ${gamelog.player.last_name}`,
      playerId: gamelog.player.id,
      fp: calculatePoints(gamelog),
      date: gamelog.game.date,
      pts: gamelog.pts,
      ast: gamelog.ast,
      reb: gamelog.reb,
      blk: gamelog.blk,
      stl: gamelog.stl,
      tov: gamelog.turnover,
      fga: gamelog.fga,
      fgm: gamelog.fgm,
      ftm: gamelog.ftm,
      fta: gamelog.fta,
      fg3a: gamelog.fg3a,
      fg3m: gamelog.fg3m,
      oreb: gamelog.oreb,
      dreb: gamelog.dreb,
      min: gamelog.min

    };
  });

  const totals = stats.reduce(
    (total, performance) => {
      if (performance.playerId === playerA.value) {
        getTotals(total, performance, "A");
      } else if (performance.playerId === playerB.value) {
        getTotals(total, performance, "B");
      }
      return total;
    },
    {
      pts: { A: 0, B: 0 },
      reb: { A: 0, B: 0 },
      ast: { A: 0, B: 0 },
      blk: { A: 0, B: 0 },
      stl: { A: 0, B: 0 },
      tov: { A: 0, B: 0 },
      fga: { A: 0, B: 0 },
      fgm: { A: 0, B: 0 },
      fg3a: { A: 0, B: 0 },
      fg3m: { A: 0, B: 0 },
      fta: { A: 0, B: 0 },
      ftm: { A: 0, B: 0 },
      oreb: { A: 0, B: 0 },
      dreb: { A: 0, B: 0 },
      gp: {A: 0, B: 0}
    }
  );

  console.log(totals)
  dispatch({
    type: UPDATE_COMPARISON,
    payload: totals
  })

  dispatch({
    type: UPDATE_STATS,
    payload: stats,
  });

  dispatch({
    type: UPDATE_DATE,
    payload: date,
  });

  const averages = await axios.get(
    "https://www.balldontlie.io/api/v1/season_averages?season=2020" +
      playerQuery
  );

  dispatch({
    type: UPDATE_AVERAGES,
    payload: averages.data.data,
  });
};

export const updateCategory = (category) => {
  return  {
    type: UPDATE_CATEGORY,
    payload: category
  }
}

export const saveTeam = (players) => async (dispatch) => {
  await axios.post("/api/save", players);
  dispatch({ type: FETCH_USER, payload: null });
};

export const updatePlayers = (player, color) => async (dispatch) => {
  
  dispatch({
    type: `UPDATE_${color.toUpperCase()}`,
    payload: player,
  });
};
