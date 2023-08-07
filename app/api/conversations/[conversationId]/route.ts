import {NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

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

        return NextResponse.json(deleteConversation);

    } catch (e: any) {
        console.log(e, "error_conversation_delete");
        return new NextResponse("İç hata", {status: 500})
    }
}