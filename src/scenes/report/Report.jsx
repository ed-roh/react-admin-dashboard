import { useEffect, useState } from 'react';
import axios from 'axios';
import UserData from '../data/UserData';

const API = 'https://jsonplaceholder.typicode.com/users';

const Report = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.length > 0) {
        setUsers(data);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <UserData users={users} />
        </tbody>
      </table>
    </>
  );
};

export default Report;
