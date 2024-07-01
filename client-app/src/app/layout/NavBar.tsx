import React, { useState } from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const {
    userStore: { user, logout },
  } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    history.push(`/search?query=${searchQuery}`);
  };

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          Union-App
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <div className="ui action input">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={NavLink}
                  to={`/profiles/${user.username}`}
                  text="My Profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
