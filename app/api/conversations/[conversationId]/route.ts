import {NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import {pusherServer} from "@/app/libs/pusher";

interface IParams {
    conversationId?: string;
}

export async function DELETE(request: Request, {params}: { params: IParams }) {
    try {
        const {conversationId}=params;
        const currentUser=await getCurrentUser();
        if (!currentUser?.id) {
            return new NextResponse("Yetkisiz",{status:401})
        }
        const existingConversation=await prisma.conversation.findUnique({
           where:{
               id:conversationId
           },
            include:{
               users:true
            }
        });

        if (!existingConversation) {
            return new NextResponse("Geçersiz kimlik",{status:400})
        }

        const deleteConversation=await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        });

        existingConversation.users.forEach((user)=>{
            if (user.email) {
                pusherServer.trigger(user.email,"conversation:remove",existingConversation);
            }
        })

        return NextResponse.json(deleteConversation);

    } catch (e: any) {
        console.log(e, "error_conversation_delete");
        return new NextResponse("İç hata", {status: 500})
    }
}