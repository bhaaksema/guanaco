import { Container, Nav, Navbar } from "react-bootstrap";

import Proof from "./components/Proof";

export default function App() {
  const maintainer = "https://github.com/bhaaksema";
  const documentation = "https://bhaaksema.github.io/guanaco-doc/";

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="sm">
        <Container>
          <Navbar.Brand>Guanaco</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href={documentation} target="_blank">
                Documentation
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Navbar.Text>Maintained by:</Navbar.Text>
              <Nav.Link href={maintainer} target="_blank">
                <u>bhaaksema</u>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center">
        <Proof />
      </Container>
    </>
  );
}
