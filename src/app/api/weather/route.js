import {getServerSession} from "next-auth";
import getWeather from "@/lib/weather";

export async function GET() {
    const session = await getServerSession();

    if (session) {
        return Response.json({
            success: true, weather: getWeather()
        });
    } else {
        return Response.json({success: false, message: 'Не авторизован'});
    }
}