import { MongoClient } from "mongodb";
import Crypto from "crypto";

const uri = "mongodb://mongo:XDZdafr7BguDPJ3t0Xx2@containers-us-west-45.railway.app:7570"
const client = new MongoClient(uri)

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
      key = Crypto.randomBytes(64).toString('base64').slice(0, 64);
      await client.db('Dev').collection(`keys`).insertOne({email: email, key: key});
    } else {
      key = "Key already exists for this email";
    }
  } catch (e) {
    console.error(e);
  } finally {
    return key;
  }
}
