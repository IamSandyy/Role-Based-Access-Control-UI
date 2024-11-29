import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
  ]);

  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '', status: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    handleClose();
  };

  const editUser = (user) => {
    setEditMode(true);
    setCurrentUserId(user.id);
    setNewUser(user);
    handleShow();
  };

  const updateUser = () => {
    setUsers(users.map(user => (user.id === currentUserId ? newUser : user)));
    setEditMode(false);
    handleClose();
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSubmit = () => {
    if (editMode) {
      updateUser();
    } else {
      addUser();
    }
  };

  return (
    <div>
      <Button variant="primary" className="mb-3" onClick={() => { setEditMode(false); handleShow(); }}>Add User</Button>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <Button variant="warning" onClick={() => editUser(user)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formUserRole">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter role" value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formUserStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>{editMode ? 'Update User' : 'Add User'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
