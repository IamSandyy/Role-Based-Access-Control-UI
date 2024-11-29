import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import UserList from './components/UserList';
import RoleList from './components/RoleList';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">RBAC Admin Panel</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#roles">Roles</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h1 className="text-center my-4">RBAC User Interface</h1>
        <Row>
          <Col md={6} id="users">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4>User Management</h4>
              </div>
              <div className="card-body">
                <UserList />
              </div>
            </div>
          </Col>
          <Col md={6} id="roles">
            <div className="card shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h4>Role Management</h4>
              </div>
              <div className="card-body">
                <RoleList />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
