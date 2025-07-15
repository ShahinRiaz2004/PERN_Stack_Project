const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db")


//Middleware
app.use(cors());
app.use(express.json());

//Route

//Create a todo
app.post("/todos", async (req, res) => {

    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//Get a todo 
app.get("/todos/:id",  (req, res) => {
    try {    
        const { id } = req.params;
        const todo =   pool.query("SELECT * from todo WHERE todo_id = $1", [
            id
        ]);
          res.json(todo.rows);
    }catch (err) {
        console.error(err.message);
    }
} )

//Get all todo 
app.get("/todos", async(req, res) => {
    try {
        const allTodo  = await pool.query("SELECT * from todo");
           res.json(allTodo.rows);
    }catch (err) {
        console.error(err.message);
     }
   });


//Update a todo


//Delete a todo 


app.listen(5000, () => {

    console.log("Server running on port 5000");

});