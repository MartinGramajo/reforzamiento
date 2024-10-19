import axios from "axios";
import { useEffect } from "react";
import { ReqResUserLists } from "../interfaces";

const loadUsers = async () => {
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
  useEffect(() => {
    loadUsers().then( users => console.log(users)
    )
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
          <tr>
            <td>
              <img src="https://example.com/avatar1.jpg" alt="avatar1" />
            </td>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
