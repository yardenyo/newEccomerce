import { useState, useEffect } from "react";
import { User } from "@/types";
import { AxiosError } from "axios";
import Helpers from "@/helpers/app.helpers";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState([]);
  const api = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await api.post("/users", {
          signal: controller.signal,
        });
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
