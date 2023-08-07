import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            console.log(session?.user?.email,"currentUser_error_session");

            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            console.log(currentUser,"currentUser_error_null");

            return null;
        }

        return currentUser;

    } catch (error: any) {
        console.log(error,"currentUser_error");
        return null;
    }
}

export default getCurrentUser;