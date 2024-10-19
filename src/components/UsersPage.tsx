import axios from "axios";
import { useEffect } from "react";

export interface User {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        Datum[];
    support:     Support;
}

export interface Datum {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}




const UsersPage = () => {
  useEffect(() => {

    axios.get('https://reqres.in/api/users?page=2')
    .then( resp => console.log(resp.data) );
    

    // fetch("https://reqres.in/api/users?page=2")
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data));
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
