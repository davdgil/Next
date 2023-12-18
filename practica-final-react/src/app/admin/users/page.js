"use client"
import UserList from "@/app/components/Admin/userList";
import SearchBar from "@/app/components/searchBar";
import { useState, useEffect } from "react";

const getUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    console.log(data.users);
    return data.users;
};


export default function UserListShow() {

    const [users, setUsers] = useState([])
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        const fetchUsersData = async () => {
            const userData = await getUsers();
            setUsers(userData);
            console.log(userData)
        };

        fetchUsersData();
    }, []);
    

    const handleSearch = (text) => {
        setFilterText(text)
    }

    const filtrada = users.filter((filtered) =>
        filtered.email.toLowerCase().includes(filterText.toLowerCase())

    );

    return (
        <div>
            {console.log(" filtrada : ", filtrada)}
            <UserList userFilter ={filtrada}/>
            <SearchBar onSearch={handleSearch}/>
        </div>
    )

}