const nodemailer = require("nodemailer");
const sendMail = async(req,res)=>{
    const id = req.params.id;
    console.log({id})
    console.log(req.body);
    let testAccount = await nodemailer.createTestAccount();
    // console.log(testAccount)

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'chopade.sahil02@gmail.com',
            pass: 'xAE6b83rMCUvkK5R'
        }
    });
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'korey.leuschke76@ethereal.email',
    //         pass: 'ptvweE1yRpkAsPeyuu'
    //     }
    // });
    let info = await transporter.sendMail({
        from: `"Sahil Chopade 👻" <${testAccount.user}>`, // sender address
        to: `${req.body.receiversMail}`, // list of receivers
        subject: "Hello Sahil, Here is the download link of ", // Subject line
        text: "Hello world?", // plain text body
        html: `Here is your link:<br> <a href="${req.body.url}">${req.body.url}</a>`, // html body
      });
      console.log(info);
    res.redirect(`/upload/${id}`);
}

module.exports = sendMail;