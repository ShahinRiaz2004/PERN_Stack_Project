/* =======================
  EditTodo.js
======================= */
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

const EditTodo = ({ todo, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const updated = await response.json();
      onUpdate(updated);
      handleClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Button variant="outline-warning" size="sm" onClick={handleShow}>
        <PencilSquare /> Edit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateDescription}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Update description"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditTodo;