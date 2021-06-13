import React, { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/Users/Users";
import Search from "./components/Users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import User from "./components/Users/User";
import axios from "axios";
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users.
  const searchUsers = async (text) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(response.data.items);
      setLoading(false);
      // console.log(response.data.items) needs to be checked.
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };
  // Search single github user.
  const getUser = async (username) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };

  const getUserRepos = async (username) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setLoading(false);
      setRepos(response.data);
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  };
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            {/* exact path="/user/:login" is here, because we need to know which user is passed a prop, and then we can use it to map the url based on that login, and finally render. */}
            <Route
              exact
              // An object containing properties mapped to the named route parameters, ex: if the route is /user/:name, then the name property is available as req.params.name
              // This is a dynamic parameter that recieves it's value from the <User />, and will change the url dynamically.
              path="/user/:login"
              render={(props) => (
                <User
                  // render={props => <User {...props}>} .
                  // This is equivalent to:  render={props => <User history={props.history} location={props.location}> match={props.match}}
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;
