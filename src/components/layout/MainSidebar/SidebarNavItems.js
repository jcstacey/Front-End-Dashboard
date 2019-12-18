import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Dispatcher, Constants, Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);

    this.state = {
      navItems: Store.getSidebarItems()
      
    };

    this.onChange = this.onChange.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }
  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav onClick={this.handleToggleSidebar} className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem  key={idx} item={item} />
            
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
