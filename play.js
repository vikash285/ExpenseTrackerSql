const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const User = require('./models/user')
const cors = require('cors');

const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.post('/user/add-user', async(req, res, next) => {
   try {

    if(!req.body.phonenumber) {
        throw new Error('Phonenumber is mandatory!')
    }
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const data = await User.create({ name: name, email: email, phonenumber: phonenumber })
    res.status(201).json({ newUserDetail: data })
   } catch (err) {
    res.status(500).json({
        error: err
    })
   }
})

app.get('/user/get-users', async(req, res, next) => {
    const users = await User.findAll()
    res.status(200).json({ allUsers: users })
})

app.delete('/user/delete-user/:id', async(req, res, next) => {
    const uId = req.params.id
    await User.destroy({ where: { id: uId }})
    res.sendStatus(200)
})

app.use(errorController.get404);

sequelize.sync()
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err))