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
            user.createForgotPassword({ id , active: true })
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

exports.resetPassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotPasswordRequest => {
        if(forgotPasswordRequest){
            forgotPasswordRequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatePassword/${id}" method="get">
                                        <label for="newPassword">Enter New password</label>
                                        <input name="newPassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}

exports.updatePassword = async(req, res) => {

    try {
        const { newPassword } = req.query;
        const { resetPasswordId } = req.params;
        const resetPasswordRequest = await Forgotpassword.findOne({ where : { id: resetPasswordId }})
        const user = await User.findOne({where: { id : resetPasswordRequest.userAppId}})
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newPassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash })
                                res.status(201).json({message: 'Successfuly update the new password'})
                        })
                    })
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}