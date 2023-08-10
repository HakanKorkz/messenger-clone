import prisma from "@/app/libs/prismadb";

const getMessages = async (conversationId: string) => {
    try {
        return await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });

    } catch (error: any) {
        console.log(error, "getMessages_error");

        return [];
    }
}

export default getMessages