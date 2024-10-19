import UsersRow from "./UsersRow";
import useUsers from "../hooks/useUsers";


const UsersPage = () => {
  const { usersList, nextPage, prevPage } = useUsers();

  return (
    <>
      <h3>Usuarios:</h3>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <UsersRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </>
  );
};

export default UsersPage;
