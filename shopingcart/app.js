
import  express  from 'express'
import session from 'express-session';
const app=express();
const port=process.env.PORT || '3000';
import router from './routes/web.js';
import {join} from 'path';
const database_url=process.env.DATABASE_URL || "mongodb://127.0.0.1:27017"
import dbconnection from './db/dbconnection.js';

app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
}));
// this is built in middleware function in express . it parses incoming requests with urlencoded payloads and is based on body-parser. if it is not put middleware  in main express.js file this show error 
// Cannot destructure property 'name' of 'req.body' as it is undefined.
app.use(express.urlencoded({extended:true}))

// setup static file
app.use(express.static(join(process.cwd(),'public')))

// setup template engine
app.set("view engine","ejs")

// database connection call
dbconnection(database_url)

app.use('/',router)
app.listen(port,()=>{
    console.log("connection successfully");
})
