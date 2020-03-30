import nextConnect from 'next-connect';
import middleware from '../../lib/database';
var ObjectID = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log("query", req.query)
    let { groupId, auth0id, role, getAllSeances, getAllReports, getDemandesDeleves,  getAwaitingStudents, getAwaitingTutors, getAllReportsFromStudents } = req.query
    if (groupId) {
        req.db.collection('users').find({ groupId: parseInt(groupId) }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                // console.log(result);
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
        req.db.collection('users').find({ role: "tutor", seances: { $exists: true } }).sort({ last_updated: -1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (getAllReports) {
        req.db.collection('users').find({ role: "tutor", reports: { $exists: true } }).sort({ "reports.time": -1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (getDemandesDeleves) {
        req.db.collection('users').find({ role: "tutor", asked_more_students: { $exists: true } }).sort({ "asked_more_students.time": -1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (getAwaitingStudents) {
        req.db.collection('users').find({ role: "student" }).sort({ lastname: 1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (getAwaitingTutors) {
        req.db.collection('users').find({ role: "tutor", groupId: { $exists: false } }).sort({ lastname: 1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (getAllReportsFromStudents) {
        req.db.collection('users').find({ reported: true, groupId: { $ne: -1 } }).sort({ "report.tutor.name": 1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        })
    }
});

handler.post(async (req, res) => {
    let data = req.body;
    const user = JSON.parse(data);
    ['_id', 'needsSetup', 'isSetup', 'sub'].map(key => key in user.data ? delete user.data.key : null)
    console.log("query", req.query)
    console.log("user", user)
    let { unset } = req.query
    if (unset) {
        let doc = await req.db.collection('users').updateOne({ _id: ObjectID(user._id) }, { $unset: user.data})
    } else {
        let doc = await req.db.collection('users').updateOne({ _id: ObjectID(user._id) }, { $set: user.data})
    }
    res.json({ message: 'ok' });
})

export default handler;