import nextConnect from 'next-connect';
import middleware from '../../lib/database';
var ObjectID = require('mongodb').ObjectID;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    console.log("query", req.query)
    let { groupId, auth0id, role, getAllSeances, getAllReports, getDemandesDeleves, getAwaitingStudents, getAwaitingTutors, getAllReportsFromStudents } = req.query
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
                // console.log(result);
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
    } else if (req.query.getCatalogueLogs) {
        req.db.collection('users').find({ catalogue_logs: { $exists: true } }).sort({ "catalogue_logs.time": -1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (req.query.getTutorsSignUps) {
        req.db.collection('users').aggregate([
            { $match: { groupId: { $gte: 4000, $lte: 5000 } } },
            { $sort: { updated_at: -1 } },
            { $group: { _id: "$groupId", users:{ $push: "$$ROOT" } } }
        ]).toArray(function (err, result) {
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
    } else if (getAwaitingStudents && req.query.limit) {
        req.db.collection('users').find({ role: "student", groupId: { "$exists": false }, firstname: { "$ne": '--' } }).sort({ timestamp: 1, lastname: 1 }).toArray(function (err, result) {
            if (err) res.json({ err: true })
            else {
                res.json(result);
            }
        });
    } else if (getAwaitingStudents) {
        req.db.collection('users').find({ role: "student", groupId: { "$exists": false } }).sort({ lastname: 1 }).toArray(function (err, result) {
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
    } else if (req.query.getUsersByGroupId) {
        req.db.collection('users').find({ groupId: parseInt(req.query.getUsersByGroupId)}).toArray(function (err, result) {
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
    ['_id', 'needsSetup', 'isSetup', 'sub', 'notYetSetUp'].map(key => key in user.data ? delete user.data[key] : null)
    console.log("query", req.query)
    console.log("user", user)
    if (req.query.insert) {
        if (user.data.role === "tutor") {
            const ret = await req.db.collection('counters').findOneAndUpdate({ _id: 'groupId' }, { $inc: { seq: 1 } })
            user.data.groupId = ret.value.seq
        } else if (user.data.role === "student") {
            user.data.timestamp = new Date(Date.now())
        }
        await req.db.collection('users').insertOne(user.data)
    } else if (req.query.unset) {
        await req.db.collection('users').updateOne({ _id: ObjectID(user._id) }, { $unset: user.data })
    } else {
        await req.db.collection('users').updateOne({ _id: ObjectID(user._id) }, { $set: user.data })
    }
    res.json({ message: 'ok' });
})

export default handler;