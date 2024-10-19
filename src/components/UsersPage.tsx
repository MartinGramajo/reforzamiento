import axios from "axios";
import { useEffect, useState } from "react";
import type { ReqResUserLists, User } from "../interfaces";
import UsersRow from "./UsersRow";

const loadUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<ReqResUserLists>(
      "https://reqres.in/api/users"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UsersPage = () => {
  const [usersList, setUserslist] = useState<User[]>([]);

  useEffect(() => {
    // Cargamos los usuarios al cargar la página
    // loadUsers().then((users) => setUserslist(users));

    // Cargamos lo que retorna loadUsers() directamente en el state
    loadUsers().then(setUserslist);
  }, []);

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
            <UsersRow user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
