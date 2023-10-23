import {getServerSession} from "next-auth";
import {getCollection} from "@/lib/database";
import getWeather from "@/lib/weather";

export async function PUT(request) {
    const data = await request.json();

    if ('content' in data) {
        const content = data['content'].trim();

        if (content.length < 1 || content.length > 1024)
            return Response.json({success: false, message: 'Ошибка в сообщении'});

        const session = await getServerSession();

        if (session) {
            const messages = await getCollection('messages');

            await messages.insertOne({
                author: session.user.name,
                timestamp: Math.floor(Date.now() / 1000),
                content: content
            })

            if (content.startsWith('/weather')) {
                const weather = await getWeather();

                await messages.insertOne({
                    author: 'Gigachat',
                    timestamp: Math.floor(Date.now() / 1000) + 1,
                    content: `🌦️ Текущая погода в ${weather.region}: ${weather.temperature}°, влажность ${weather.humidity}% и ветер ${weather.wind} км/ч`
                })
            }

            return Response.json({success: true});
        }

        return Response.json({success: false, message: 'Не авторизован'});
    } else {
        return Response.json({success: false, message: 'Запрос некорректен'});
    }
}

export async function GET(request) {
    const session = await getServerSession();

    if (session) {
        const collection = await getCollection('messages');

        const {searchParams} = new URL(request.url)

        const filter = {}

        if (searchParams.has('s'))
            filter['$gt'] = Number(searchParams.get('s'))

        if (searchParams.has('t'))
            filter['$lt'] = Number(searchParams.get('t'))

        const messages = []
        for await(const message of collection.find({
            timestamp: filter
        }).sort({timestamp: -1}).limit(50)) {
            messages.push(message)
        }
        return Response.json({success: true, messages: messages.reverse()});
    }

    return Response.json({success: false, message: 'Не авторизован'});
}