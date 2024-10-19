import { User } from "../interfaces";

interface Props {
  user: User;
}

const UsersRow = ({ user }: Props) => {
  const { id, avatar, first_name, last_name, email } = user;

  return (
    <tr key={id}>
      <td>
        <img style={{ width: "50px" }} src={avatar} alt={first_name} />
      </td>
      <td>
        {first_name} {last_name}
      </td>
      <td>{email}</td>
    </tr>
  );
};

export default UsersRow;
