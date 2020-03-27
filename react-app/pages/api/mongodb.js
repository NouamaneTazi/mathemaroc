import nextConnect from 'next-connect';
import middleware from '../../lib/database';
var ObjectID = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log("query", req.query)
    let { groupId, auth0id, role, getAllSeances } = req.query
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
        req.db.collection('users').find({ role }).sort({ lastname: 1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                // console.log(result);
                res.json(result);
            }
        });
    } else if (getAllSeances) {
        req.db.collection('users').find({ role:"tutor", auth0id:{$exists:true} }).sort({ last_updated: -1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    }
});

handler.post(async (req, res) => {
    let data = req.body;
    const user = JSON.parse(data);
    // console.log("post", user)
    if ("_id" in user.data) delete user.data._id

    let doc = await req.db.collection('users').updateOne({ _id: ObjectID(user._id) }, { $set: user.data })
    // console.log("UPDATED", doc)
    res.json({ message: 'ok' });
})

export default handler;