import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/Pages/About";
import User from "./components/Users/User";
import Home from "./components/Pages/Home";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import NotFound from "./components/Pages/NotFound";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                {/* exact path="/user/:login" is here, because we need to know which user is passed a prop, and then we can use it to map the url based on that login, and finally render. */}
                <Route
                  exact
                  // An object containing properties mapped to the named route parameters, ex: if the route is /user/:name, then the name property is available as req.params.name
                  // This is a dynamic parameter that recieves it's value from the <User />, and will change the url dynamically.
                  path="/user/:login"
                  component={User}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};
export default App;
