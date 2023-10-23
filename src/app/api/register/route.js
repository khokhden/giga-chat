import {getCollection} from "@/lib/database";
import bcrypt from "bcrypt";

export async function PUT(request) {
    const data = await request.json();

    if ('username' in data && 'password' in data) {
        const username = data['username'];

        if (username === 'Gigachat') {
            return Response.json({success: false})
        }

        const password = data['password'];

        const collection = await getCollection('users');

        const possibleCollision = await collection.findOne({
            username: username
        });

        if (possibleCollision) {
            return Response.json({success: false, message: 'Пользователь уже зарегистрирован'});
        } else {
            await collection.insertOne({
                username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10, 'a')),
                joined: Math.floor(Date.now() / 1000)
            });
            return Response.json({success: true});
        }
    } else {
        return Response.json({success: false, message: 'Запрос некорректен'});
    }
}