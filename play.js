const path = require('path');
const fs = require('fs')

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
// const compression = require('compression')
const morgan = require('morgan')

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const sequelizeApp = require('./util/databaseApp')

// const User = require('./models/user')
const Expense = require('./models/expense')
const UserApp = require('./models/userApp')
const ExpensesApp = require('./models/expensesApp')
const Order = require('./models/orders')
const cors = require('cors')
const Forgotpassword = require('./models/forgotPassword')
const FileUrl = require('./models/fileUrls')

const app = express();
const dotenv = require('dotenv')

dotenv.config()
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense')
const userAppRoutes = require('./routes/userApp')
const expensesAppRoutes = require('./routes/expensesApp')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeature')
const resetPasswordRoutes = require('./routes/resetPassword')

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
)

app.use(helmet())
// app.use(compression())
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)
app.use('/userApp', userAppRoutes)
app.use('/expense', expensesAppRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes)

app.use(errorController.get404);

UserApp.hasMany(ExpensesApp)
ExpensesApp.belongsTo(UserApp)

UserApp.hasMany(Order)
Order.belongsTo(UserApp)

UserApp.hasMany(Forgotpassword)
Forgotpassword.belongsTo(UserApp)

UserApp.hasMany(FileUrl)
FileUrl.belongsTo(UserApp)

sequelizeApp
// .sync({ force: true })
.sync()
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err))