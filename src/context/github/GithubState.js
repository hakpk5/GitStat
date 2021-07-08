import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

// this includes all the actions related to github we do like fetching users, user, repos etc.
let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV != "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  // Search Github Users
  const searchUsers = async (text) => {
    try {
      setLoading();
      const response = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      dispatch({
        type: SEARCH_USERS,
        payload: response.data.items,
      });

      // console.log(response.data.items) needs to be checked.
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };
  // Get user
  const getUser = async (username) => {
    try {
      setLoading();
      const response = await axios.get(
        `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };
  // Get Repos
  const getUserRepos = async (username) => {
    try {
      setLoading();
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=6&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
      dispatch({
        type: GET_REPOS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error Occured: ", error);
    }
  };
  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
