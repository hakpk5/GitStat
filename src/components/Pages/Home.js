import React, { Fragment } from "react";
import Search from "../Users/Search";
import Users from "../Users/Users";

export const Home = () => (
  <Fragment>
    <Search />
    <Users />
  </Fragment>
);

export default Home;
