import {MongoClient} from "mongodb";

export default async function getMongo() {
    if (!global.client) {
        global.client = new MongoClient(process.env.MONGO);
        await global.client.connect();
    }

    return global.client;
}

export async function getCollection(name) {
    return (await getMongo()).db(process.env.DATABASE).collection(name);
}
