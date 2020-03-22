// https://www.youtube.com/watch?v=zY4w4_W30aQ
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('tutorat');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;