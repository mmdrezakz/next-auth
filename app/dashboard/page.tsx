"use client"
import { useEffect, useState } from "react";

interface User {
    id:number;
    createdAt:string;
    email:string;
    name:string;
}

export default function page() {
    const [users, setUsers] = useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        fetchUsers();
    },[])

  const fetchUsers = async () => {
    try{
        setLoading(true);
        const res = await fetch('/api/users', { cache: 'no-store' });
        const data = await res.json();
        setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }finally{
        setLoading(false);
    }
  }


  if(loading){
    return <div>Loading...</div>
  }
    return (
    <main>
        <h1>Dashboard</h1>
        <ul>
            {users.map((user:User) => (
                <li key={user.id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    </main>
  )
}
