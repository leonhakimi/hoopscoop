import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class MyTeam extends React.Component {
  renderOptions() {
    return this.props.auth.teams.map((team) => {
      return (
        <div key={team._id} className="col s12 m7">
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>
                  Team
                </p>
              </div>
              <div className="card-action">
                <Link
                  onClick={() => {
                    this.props.updateDefault(team.players);
                    this.props.updatePlayers(team.players);
                  }}
                  to={`/myteams/${team._id}`}
                >
                  {team._id}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.props.auth ? this.renderOptions() : ""}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(MyTeam);
