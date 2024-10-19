import axios from "axios";
import type { ReqResUserLists, User } from "../interfaces";
import { useEffect, useRef, useState } from "react";

const loadUsers = async (page: number = 1): Promise<User[]> => {
  try {
    const { data } = await axios.get<ReqResUserLists>(
      "https://reqres.in/api/users",
      {
        params: { page: page }
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const useUsers = () => {
  const [usersList, setUserslist] = useState<User[]>([]);

  const currentPageRef = useRef(1);

  useEffect(() => {
    loadUsers(currentPageRef.current).then(setUserslist);
  }, []);

  const nextPage = async () => {
    currentPageRef.current++;
    const users = await loadUsers(currentPageRef.current);
    if (users.length > 0) {
      setUserslist(users);
    } else {
      currentPageRef.current--;
    }
  };

  const prevPage = async () => {
    if (currentPageRef.current < 1) return;
    currentPageRef.current--;
    const users = await loadUsers(currentPageRef.current);
    setUserslist(users);
  };

  return {
    // properties
    usersList,

    // methods
    nextPage,
    prevPage
  };
};

export default useUsers;
