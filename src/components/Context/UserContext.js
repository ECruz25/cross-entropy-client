import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchData() {
      const email = await Cookie.get("user");
      const userResponse = await fetch("/api/v1/get-user", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const userdata = await userResponse.json();
      setUser(userdata);
    }
    fetchData();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
