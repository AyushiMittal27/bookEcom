const express= require('express');
require('dotenv').config()
const mongoose= require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
//import routes
const authRoute = require('./routes/auth');
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category');
const ProductRoutes = require('./routes/product');
const brainTreeRoutes = require('./routes/braintree');
const orderRoutes= require('./routes/order')

//app
const app= express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> console.log("database connected"))
.catch((err)=> console.log(err))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(expressValidator());
app.use(cors());


//routes middleware

app.use('/api',authRoute);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api', ProductRoutes);
app.use('/api' , brainTreeRoutes);
app.use('/api', orderRoutes)

const port = process.env.PORT || 8000
app.listen(port , ()=> console.log(`Server started on ${port}`));