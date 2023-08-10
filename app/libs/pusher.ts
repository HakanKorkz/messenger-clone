import PusherServer from "pusher";
import PusherClient from "pusher-js"

const clu: undefined | string = process.env.PUSHER_CLUSTER;
export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: clu || 'eu',
    useTLS: true
});

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        channelAuthorization: {
            endpoint: '/api/pusher/auth',
            transport: "ajax",
        },
        cluster: clu || 'eu'
    }
);