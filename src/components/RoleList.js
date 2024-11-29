import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const RoleList = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] },
  ]);

  const [show, setShow] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editMode, setEditMode] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRole = () => {
    setRoles([...roles, { id: roles.length + 1, ...newRole }]);
    handleClose();
  };

  const editRole = (role) => {
    setEditMode(true);
    setCurrentRoleId(role.id);
    setNewRole(role);
    handleShow();
  };

  const updateRole = () => {
    setRoles(roles.map(role => (role.id === currentRoleId ? newRole : role)));
    setEditMode(false);
    handleClose();
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleSubmit = () => {
    if (editMode) {
      updateRole();
    } else {
      addRole();
    }
  };

  return (
    <div>
      <Button variant="primary" className="mb-3" onClick={() => { setEditMode(false); handleShow(); }}>Add Role</Button>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <Button variant="warning" onClick={() => editRole(role)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => deleteRole(role.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Role' : 'Add Role'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoleName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control type="text" placeholder="Enter role name" value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formRolePermissions">
              <Form.Label>Permissions</Form.Label>
              <Form.Control as="select" multiple value={newRole.permissions}
                onChange={(e) => setNewRole({ ...newRole, permissions: Array.from(e.target.selectedOptions, option => option.value) })}>
                <option>Read</option>
                <option>Write</option>
                <option>Delete</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>{editMode ? 'Update Role' : 'Add Role'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleList;
