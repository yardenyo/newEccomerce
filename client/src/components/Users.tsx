import { useGetUsersQuery } from "@/features/users/usersApiSlice";
import { User } from "@/types";
import Helpers from "@/helpers/app.helpers";
import { AxiosError } from "axios";

const Users = () => {
  const { data: response } = useGetUsersQuery({});
  let data;

  try {
    const { data: responseData } = Helpers.handleAxiosSuccess(response);
    data = responseData;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      Helpers.handleAxiosError(e);
    } else {
      console.log(e);
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map((user: User) => (
          <li key={user._id}>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
