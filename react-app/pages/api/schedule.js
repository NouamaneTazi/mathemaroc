import nextConnect from 'next-connect';
import middleware from '../../lib/database';
var ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
const handler = nextConnect();
handler.use(middleware);

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'edna77@ethereal.email',
//         pass: '16wkHpXB6hDPGP5KmF'
//     }
// });

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mathemaroc.contact@gmail.com',
        pass: 'Mathemaroc1'
    }
});

const html_avec_eleves = `
<div class="aweber_message_body"><center>
<div align="center">
<div class="containerbox" style="width: 100%; font-family: Helvetica, Arial, sans-serif; background-color: #ffffff;">
<div align="center">
<table class="aw-bgc" style="width: 100%; font-family: Helvetica, Arial, sans-serif; border-spacing: 0px; border-collapse: collapse; border-width: medium; border-style: none; background-color: #f7f7f7;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="border-spacing: 0px;">
<td style="border-spacing: 0px;">
<table style="width: 100%; font-family: Helvetica, Arial, sans-serif; max-width: 600px !important; border-spacing: 0px; border-collapse: collapse; border-width: medium; border-style: none;" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr style="border-spacing: 0px;">
<td style="border-spacing: 0px;">
<div class="mains" style="text-align: left;">
<div class="region">
<div>
<table class="row aw-stack" style="width: 100%; border-spacing: 0px; border-collapse: collapse; border-width: medium; border-style: none; font-family: Helvetica, Arial, sans-serif;" role="presentation">
<tbody>
<tr style="border-spacing: 0px;">
<td class="container" style="padding: 0px; width: 100%; border-spacing: 0px;" valign="top" bgcolor="#E7E3D7" width="100%">
<div class="definition-parent">
<table class="floated-none" style="float: none; text-align: center; border-spacing: 0px; border-collapse: collapse; border-width: medium; border-style: none; font-family: Helvetica, Arial, sans-serif;" role="presentation" width="100%" align="center">
<tbody>
<tr style="border-spacing: 0px;">
<td style="padding: 0px; border-spacing: 0px;"><a class="aw-image-link" style="color: #3498db;" href="https://www.chrisvqz.com" rel="nofollow"> <img class="model" style="object-position: top; object-fit: cover; display: block; margin: auto; width: 100%; height: 278px; border-width: 0px; border-style: none; line-height: 100%; max-width: 100%; outline-width: medium; outline-style: none; text-decoration: none; transform: trans;" src="https://i.imgur.com/hnNqs5o.jpg" alt="Image" width="600" height="290" /> </a></td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
<table class="row aw-stack" style="width: 100%; border-spacing: 0px; border-collapse: collapse; border-width: medium; border-style: none; font-family: Helvetica, Arial, sans-serif;" role="presentation">
<tbody>
<tr style="border-spacing: 0px;">
<td class="container" style="padding: 10px 25px 30px; width: 100%; border-spacing: 0px; background-color: #b3e5ff; border: solid 5px #028ed7; border-top: transparent;">
<div class="definition-parent">
<div class="paragraph" style="color: #393939; font-family: Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5em; padding: 0px; margin: 0px;">
<div>
<div><span style="color: #3e404f;"><span style="font-size: 36px;"><span style="font-family: Lora,Times,serif;"><strong style="font-weight: bold;">Bonjour,</strong></span></span></span></div>
<div> </div>
<div><span style="color: #3e404f;">J'espère que vous et votre famille vous portez bien en cette période de confinement. </span></div>
<div> </div>
<div><span style="color: #3e404f;">Nous avons remarqué que vous vous êtes récemment connecté sur la plateforme de Math&amp;Maroc pour donner des cours en ligne en tant que bénévole. Tout d'abord je vous en remercie, cela fait toujours plaisir de voir des personnes donner de leur temps pour leur pays et leurs compatriotes en cette période particulièrement difficile.</span></div>
<div> </div>
<div><span style="color: #3e404f;">Cependant, même si vous avez choisi des élèves à encadrer dans la liste proposée, vous n'avez à cette date renseigné aucune séance sur la dite plateforme. Ainsi, pour garder le contact, nous voulions savoir si cela était par oubli; dans ce cas, nous vous prions d'aller remplir au moins une première séance de rencontre avec les élèves sur <a style="color: #3498db;" href="https://mathemaroc.now.sh/profile" rel="nofollow">votre profil</a>; ou parce que vos occupations ne vous permettent plus de vous engager avec nos futurs bacheliers.</span></div>
<div> </div>
<div><span style="color: #3e404f;">Dans l'attente de votre réponse.</span></div>
<div> </div>
<div><span style="color: #3e404f;">Bien cordialement,</span><br />  </div>
<div>- L'équipe Math&amp;Maroc</div>
</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
<table class="row aw-stack" style="width: 100%; border-spacing: 0px; border-collapse: collapse; border-width: medium; border-style: none; font-family: Helvetica, Arial, sans-serif;" role="presentation">
<tbody>
<tr style="border-spacing: 0px;">
<td class="container" style="padding: 50px 0px 0px; width: 100%; border-spacing: 0px;" valign="top" width="100%"> </td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</center></div>
`

var message = {
    from: 'mathemaroc.contact@gmail.com',
    subject: 'Relance tutorat Math&Maroc',
    html: html_avec_eleves
};

handler.get(async (req, res) => {
    console.log("schedule", req.query)
    req.db.collection('users').find({fullname:{$in:['Omar Bennouna', 'Nouamane Tazi', 'Meryem Jaaidan', 'Mohammed-younes Gueddari']}}).toArray(function (err, result) {
        if (err) res.json({ err: true })
        else {
            message.bcc = result.map(tutor=>tutor.mail ? tutor.mail : tutor.email ? tutor.email : !tutor.nickname.includes(' ') ? tutor.nickname + "@gmail.com" : null).filter(x=>x).join()
            console.log(message.bcc)
            transporter.sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                    res.send(message.bcc);
                }
            });
        }
    })
})

export default handler;