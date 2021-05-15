import React, { Component } from "react";
import UserItem from "./UserItem";
class Users extends Component {
  state = {
    users: [
      {
        id: 1,
        login: "mojombo",
        html_url: "https://github.com/mojombo",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      },
      {
        id: 2,
        login: "defunkt",
        html_url: "https://github.com/defunkt",
        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
      },
      {
        id: 3,
        login: "pjhyett",
        html_url: "https://github.com/pjhyett",
        avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
      },
    ],
  };
  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
