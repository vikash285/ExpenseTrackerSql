const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const Product = require('./models/product')
const udemyUser = require('./models/udemyUser')

const User = require('./models/user')
const cors = require('cors');

const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    udemyUser.findByPk(13)
    .then(user => {
        req.udemyUser = user
        next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/user', userRoutes)

app.use(errorController.get404);

Product.belongsTo(udemyUser, { constraints: true, onDelete: 'CASCADE'})
udemyUser.hasMany(Product)

sequelize
// .sync({ force: true })
.sync()
.then(result => {
    return udemyUser.findByPk(13)
})
.then(user => {
    if (!user) {
        return udemyUser.create({ name: 'Max', email: 'test@test.com' })
    }
    return user
})
.then(user => {
    // console.log(user);
    app.listen(3000);
})
.catch(err => console.log(err))