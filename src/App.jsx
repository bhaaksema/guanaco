import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Proof from "./components/Proof";

export default function App() {
  const maintainer = "https://github.com/bhaaksema";
  const documentation = "https://bhaaksema.github.io/guanaco-doc/";

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Guanaco</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={documentation} target="_blank">
              Documentation
            </Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Maintained by:{" "}
              <a href={maintainer} target="_blank" rel="noreferrer">
                bhaaksema
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center">
        <Card border="dark" className="mt-4">
          <Card.Header>
            <Card.Title as="h3">
              A Syntactic Proof Guide for Epistemic Logic
            </Card.Title>
            <Card.Text>
              The strategy that Guanaco employs is building proofs bottom-up.
              This means that users start with the formula that they wish to
              derive. If this formula can only be derived by a rule, then
              Guanaco exploits the properties of this formula to extract new
              formulas the relevant rule is applied to. If the formula is an
              instantiation of an axiom, no new formulas are extracted. The same
              process is then applied until each formula has a justification and
              no new ones are produced. At that point, the proof is complete.
              Currently, axiom A1 for propositional tautologies is not yet
              validated automatically.
            </Card.Text>
          </Card.Header>
          <Card.Body>
            <Proof />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
