import React, { useEffect, useState } from "react";
import Table from "../Controls/Table";

export default function Users({ companyUser }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const usersResponse = await fetch("/api/v1/get-users", {
        method: "POST",
        body: JSON.stringify({ id: companyUser.id }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const usersData = await usersResponse.json();
      setUsers(usersData);
    }
    fetchUsers();
  }, [companyUser.id]);
  return <Table columns={["email", "type"]} data={users}></Table>;
}
