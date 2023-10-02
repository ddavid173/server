import { MongoClient } from "mongodb";
import Crypto from "crypto";

const uri = process.env.URI || process.env.MONGO_URL;
const client = new MongoClient(String(uri))

interface session {
  id: string;
  created: number;
  ip: string;
}

interface sessionDetails {
  id: string;
  created: number;
  lastUsed: number;
  ip: string;
}

async function listDatabases(client: any) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db: any) => console.log(` - ${db.name}`));
}

// export async function mango() {
//   try {
//     await client.connect();
//     await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

export async function makeKey(email: string): Promise<string> {
  let key = "There was an error";
  try {
    let doc = await client.db(process.env.ENV).collection(`keys`).findOne({email: email});
    if (doc === null) {
      key = Crypto.randomBytes(64).toString('hex').slice(0, 64);
      await client.db(process.env.ENV).collection(`keys`).insertOne({email: email, key: key});
    } else {
      key = "Key already exists for this email";
    }
  } catch (e) {
    console.error(e);
  } finally {
    return key;
  }
}

export async function createSession(ip: string): Promise<session>{
  let session = {id : "", created: 0, ip: ip}
  session.id = Crypto.randomBytes(64).toString('hex').slice(0, 64);
  session.created = Date.now();
  await client.db(process.env.ENV).collection(`sessions`).insertOne(session);
  return session;
}

export async function getSession(id: string): Promise<sessionDetails> {
  // TODO: Check if session is valid
  return {id: "", created: 0, lastUsed: 0, ip: ""};
}
