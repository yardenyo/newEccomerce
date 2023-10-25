import { useState, useEffect } from "react";
import usersApi from "@/api/users.api";
import { User } from "@/types";
import { AxiosError } from "axios";
import Helpers from "@/helpers/app.helpers";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await usersApi.getUsers({}, controller.signal);
        const { data } = response.data;
        isMounted && setUsers(data);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          Helpers.handleAxiosError(e);
        } else {
          console.log(e);
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
