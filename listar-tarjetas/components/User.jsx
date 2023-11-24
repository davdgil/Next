"use client"
import Link from "next/link"

async function UserCard ({user}){
    return <div className="user">
        {
            <Link href={`/users/user.id`}></Link>
        }


    </div>
}