import React from "react";

import { Dispatcher, Constants } from "../../../flux";

class NavbarToggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={this.handleClick} className="item-left nav-link nav-link-icon toggle-sidebar d-sm-inline-block d-md-none d-lg-none text-left ">
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    )
  }
}

export default NavbarToggle;
