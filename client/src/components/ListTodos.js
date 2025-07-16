import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Card, Spinner } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/todos');
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter((t) => t.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = (updated) => {
    setTodos((prev) => prev.map((t) => (t.todo_id === updated.todo_id ? updated : t)));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 text-center">My Todos</Card.Title>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table striped hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, idx) => (
                  <tr key={todo.todo_id}>
                    <td>{idx + 1}</td>
                    <td>{todo.description}</td>
                    <td>
                      <EditTodo todo={todo} onUpdate={handleUpdate} />
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteTodo(todo.todo_id)}
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ListTodos;
