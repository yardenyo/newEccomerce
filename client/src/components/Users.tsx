import { useGetUsersQuery } from "@/features/users/usersApiSlice";
import { User } from "@/types";

const Users = () => {
  const { data: response } = useGetUsersQuery({});
  const users: User[] = response?.data || [];

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>
              <strong>Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
