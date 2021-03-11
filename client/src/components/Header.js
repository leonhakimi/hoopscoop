import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";


class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <div>
            <li onClick={() => {this.props.saveTeam(this.props.stats)}}>Save Selection</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="navbar-fixed logofont">
        <nav className="black">
          <div className="nav-wrapper">
            <Link
              to="/"
              className="center brand-logo"
              style={{ fontFamily: "Press Start 2P" }}
            >
              Hoop Scoop
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth, stats }) {
  return { auth, stats };
}

export default connect(mapStateToProps, actions)(Header);
