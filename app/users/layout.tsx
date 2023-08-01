import React from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "@/app/actions/GetUsers";
import UserList from "@/app/users/components/UserList";

export default async function UserLayout({children}: {
    children: React.ReactNode
}) {
    const users=await getUsers();


    return (
        <Sidebar>
            <div className={"h-full"}>
                <UserList
                    // @ts-ignore
                     items={users} />
                {children}
            </div>
        </Sidebar>
    )

}