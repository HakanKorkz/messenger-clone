import React from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";

export default async function ConversationsLayout({children}:{
    children:React.ReactNode
}) {
    const conversations= await getConversations();

    return (
        <Sidebar>
            <div className={"h-full"}>
                <ConversationsList
                    initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )
};