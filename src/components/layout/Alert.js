import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    alert !== null && (
      <div
        className={`alert alert-${alert.type}`}
        style={{
          padding: "0.7rem",
          margin: "1rem 0",
          opacity: "0.7",
          background: "rgb(136, 217, 209) none repeat scroll 0% 0%",
          color: "black",
        }}
      >
        <i className="fas fa-info-cirle" />
        {alert.message}
      </div>
    )
  );
};

export default Alert;
