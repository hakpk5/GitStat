import React, { useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";
const Search = () => {
  const githubContext = React.useContext(GithubContext);
  const alertContext = React.useContext(AlertContext);
  const { setAlert } = alertContext;
  const [text, setText] = useState("");
  const handleChange = (event) => setText(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="text"
          value={text}
          onChange={handleChange}
          placeholder="Search Users..."
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {/* Conditinally rendering the clear button */}
      {githubContext.users.length > 0 ? (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
