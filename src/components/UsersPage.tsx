import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { ReqResUserLists, User } from "../interfaces";
import UsersRow from "./UsersRow";

const loadUsers = async (page:number = 1  ): Promise<User[]> => {
  try {
    const { data } = await axios.get<ReqResUserLists>(
      "https://reqres.in/api/users",{
        params: { page: page }, 
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UsersPage = () => {
  const [usersList, setUserslist] = useState<User[]>([]);

  const currentPageRef  = useRef(1)

  useEffect(() => {
    // Cargamos los usuarios al cargar la página
    // loadUsers().then((users) => setUserslist(users));

    // Cargamos lo que retorna loadUsers() directamente en el state
    loadUsers(currentPageRef.current).then(setUserslist);
    
  }, []);

  const  nextPage = async ()=>{
    currentPageRef.current++;
    const users = await loadUsers(currentPageRef.current);
    if(users.length > 0){
      setUserslist(users);
    } else {
      currentPageRef.current--;
    }
  }

  const  prevPage = async () =>{
    if(currentPageRef.current < 1) return;
    currentPageRef.current--;
    const users = await loadUsers(currentPageRef.current);
    setUserslist(users);
  }

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
        <button onClick={prevPage } >Prev</button>
        <button onClick={nextPage }>Next</button>
      </div>
    </>
  );
};

export default UsersPage;
