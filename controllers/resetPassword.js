const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

const User = require('../models/userApp');
const Forgotpassword = require('../models/forgotPassword');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

            sgMail.setApiKey(process.env.SENGRID_API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'vikashdhaka285@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:3000/password/resetPassword/${id}">Reset Password</a>`,
            }

            const response = await sgMail.send(msg)
                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}