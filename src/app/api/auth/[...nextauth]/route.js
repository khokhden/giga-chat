import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {getCollection} from "@/lib/database";

const handler = NextAuth({
    theme: {
        logo: "/chat.png"
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {label: "Логин", type: "text"},
                password: {label: "Пароль", type: "password"}
            },
            async authorize(credentials, req) {
                const collection = await getCollection('users');

                const user = await collection.findOne({
                    username: credentials.username
                });
                if (user) {
                    if (bcrypt.compareSync(credentials.password, user.password)) {
                        return {id: user._id, name: user.username};
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        async redirect({baseUrl}) {
            return `${baseUrl}/chat`;
        }
    },
})

export {
    handler as GET,
    handler as POST
};