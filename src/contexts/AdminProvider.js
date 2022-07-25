import React from "react";
import { watchesApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {});

  const sendNewWatch = (NewWatch) => {
    fetch(watchesApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewWatch),
    });
  };

  const data = {
    sendNewWatch,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;

  return <div>AdminProvider</div>;
}

export default AdminProvider;
