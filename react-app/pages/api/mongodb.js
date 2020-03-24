import nextConnect from 'next-connect';
import middleware from '../../lib/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    // console.log(req.query)
    let { groupId, id } = req.query
    if (groupId) {
        req.db.collection('users').find({ groupId: parseInt(groupId) }).toArray(function (err, result) {
            if (err || !result) res.json({ err });
            else {
                // console.log(result);
                res.json(result);
            }
        });
    } else {
        req.db.collection('users').findOne({ id }, function (err, result) {
            if (err || !result) res.json({ err:true });
            else {
                // console.log(result);
                res.json(result);
            }

        });
    }
});

export default handler;