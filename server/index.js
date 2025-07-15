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
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo =  await pool.query("SELECT * from todo WHERE todo_id = $1", [
            id
        ]);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get all todo 
app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * from todo");
        res.json(allTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//Update a todo

app.put("/todos/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const { description } = req.body;
       const updatedTodo =   await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo Update successfully!");
    } catch (err) {
        console.error(err.message);
    }
})


//Delete a todo 

app.delete("/todos/:id", async(req, res) => {

    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
            id
        ]);

        if(deletedTodo.rowCount === 0 ) {
            return res.status(404).json("Todo not found")
        }
        res.json("Todo deleted successfully");
        
    } catch (err) {
        console.error(err.message);
        
        
    }
})


app.listen(5000, () => {

    console.log("Server running on port 5000");

});