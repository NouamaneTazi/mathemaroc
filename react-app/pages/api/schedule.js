import nextConnect from 'next-connect';
import middleware from '../../lib/database';
var ObjectID = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log("schedule", req.query)
    res.json({"message":'ok'})
});

export default handler;