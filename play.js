const path = require('path');
const fs = require('fs')

const express = require('express');
const bodyParser = require('body-parser');
// const helmet = require('helmet')
// // const compression = require('compression')
// const morgan = require('morgan')


const dotenv = require('dotenv')

dotenv.config()

const sequelizeApp = require('./util/databaseApp')

const UserApp = require('./models/userApp')
const ExpensesApp = require('./models/expensesApp')
const Order = require('./models/orders')
const cors = require('cors')
const Forgotpassword = require('./models/forgotPassword')
const FileUrl = require('./models/fileUrls')



const userAppRoutes = require('./routes/userApp')
const expensesAppRoutes = require('./routes/expensesApp')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeature')
const resetPasswordRoutes = require('./routes/resetPassword')


const app = express();

app.use(cors())

// app.use(express.json())

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'),
//     { flags: 'a' }
// )

// app.use(helmet())
// // app.use(compression())
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));

app.use('/userApp', userAppRoutes)
app.use('/expense', expensesAppRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes)

app.use((req, res) => {
    console.log('url', req.url)
    res.sendFile(path.join(__dirname, `Public/${req.url}`))
})

UserApp.hasMany(ExpensesApp)
ExpensesApp.belongsTo(UserApp)

UserApp.hasMany(Order)
Order.belongsTo(UserApp)

UserApp.hasMany(Forgotpassword)
Forgotpassword.belongsTo(UserApp)

UserApp.hasMany(FileUrl)
FileUrl.belongsTo(UserApp)

sequelizeApp
.sync({ force: true })
.sync()
.then(() => {
    app.listen(3000);
})
.catch(err => console.log(err))
