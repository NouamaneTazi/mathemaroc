import nextConnect from 'next-connect';
import middleware from '../../lib/database';
var ObjectID = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log("query", req.query)
    let { groupId, auth0id, role } = req.query
    if (groupId) {
        req.db.collection('users').find({ groupId: parseInt(groupId) }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                console.log(result);
                res.json(result);
            }
        });
    } else if (auth0id) {
        req.db.collection('users').findOne({ auth0id }, function (err, result) {
            if (err) res.json({ err: true })
            else if (!result) {
                console.log("Not Yet Setup")
                res.json({ notYetSetUp: true })
            }
            else {
                console.log(result);
                res.json(result);
            }
        });
    } else if (role) {
        req.db.collection('users').find({ role }).sort( { lastname: 1 } ).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                // console.log(result);
                res.json(result);
            }
        });
    }
});

handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);
    // console.log(data)
    delete data.user._id
    let doc = await req.db.collection('users').updateOne({ _id: ObjectID(data._id) }, { $set: data.user})
    // console.log("UPDATED", doc)
    res.json({ message: 'ok' });
})

export default handler;