import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Averages extends React.Component {
  render() {
    const getName = (playerId) => {
      return playerId === this.props.playerRed.value ? this.props.playerRed.label : this.props.playerBlue.label
      
    };

    const renderAverages = () => {
      return this.props.averages.map((player) => {
        return (
          <tr style={{}} key={player.id}>
            <td>{getName(player.player_id)}</td>
            <td>{player.games_played}</td>
            <td>{player.min}</td>
            <td>{player.fgm}</td>
            <td>{player.fga}</td>
            <td>{player.fg_pct}</td>
            <td>{player.fg3m}</td>
            <td>{player.fg3a}</td>
            <td>{player.fg3_pct}</td>
            <td>{player.ftm}</td>
            <td>{player.fta}</td>
            <td>{player.ft_pct}</td>
            <td>{player.oreb}</td>
            <td>{player.dreb}</td>
            <td>{player.reb}</td>
            <td>{player.ast}</td>
            <td>{player.stl}</td>
            <td>{player.blk}</td>
            <td>{player.turnover}</td>
            <td>{player.pf}</td>
            <td>{player.pts}</td>
          </tr>
        );
      });
    };

    return (
      <div className="averages card comparison_container">
      <h3 className="comparison_header">Season Averages</h3>
        <table style={{ margin: "20px" }} className="striped responsive-table">
          <thead>
            <tr key="legend">
              <th>2020-2021 SEASON</th>
              <th>GP</th>
              <th>MIN</th>
              <th>FGM</th>
              <th>FGA</th>
              <th>FG%</th>
              <th>3PM</th>
              <th>3PA</th>
              <th>3P%</th>
              <th>FTM</th>
              <th>FTA</th>
              <th>FT%</th>
              <th>OREB</th>
              <th>DREB</th>
              <th>REB</th>
              <th>AST</th>
              <th>STL</th>
              <th>BLK</th>
              <th>TOV</th>
              <th>PF</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>{renderAverages()}</tbody>
        </table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    averages: state.averages,
    selection: state.selection,
    playerRed: state.playerRed,
    playerBlue: state.playerBlue
  };
}

export default connect(mapStateToProps, actions)(Averages);
