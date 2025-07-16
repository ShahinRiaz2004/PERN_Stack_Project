
import React, { useState } from 'react';
import { Container, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

const InputTodo = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const newTodo = await response.json();
      onAdd(newTodo);
      setDescription('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <Form onSubmit={onSubmitForm} className="d-flex align-items-center">
          <InputGroup>
            <Form.Control
              placeholder="What do you need to do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button type="submit" variant="success">
              <PlusCircle /> Add Todo
            </Button>
          </InputGroup>
        </Form>
      </Card>
    </Container>
  );
};

export default InputTodo;
