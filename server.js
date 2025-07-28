import express from 'express'
import cors from 'cors'
import tasksRouter from "./routes/tasks.js";
import mysql from "mysql2";
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    database: 'todo',

})
db.connect((err) => {
    if(!err){

        console.log('success connected')


    }else {
        console.log('error connecting')
    }

})
// Add this middleware before your routes
app.use((req, res, next) => {
    req.db = db; // Attach db to every request
    next();
});

//body parser middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data

app.use(cors()); //


app.use("/api/tasks",tasksRouter);


app.listen(5000, () => console.log("running") ) ;

