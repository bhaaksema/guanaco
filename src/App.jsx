import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BsFileEarmarkTextFill, BsGithub } from "react-icons/bs";

import Documentation from "./components/Documentation";
import Proof from "./components/Proof";

export default function App() {
  const title = "Guanaco";
  const description = "A Syntactic Proof Guide for Epistemic Logic";
  const [showDocumentation, setShowDocumentation] = useState(false);
  const links = [
    {
      name: "Documentation",
      href: "#documentation",
      icon: <BsFileEarmarkTextFill />,
      onClick: (event) => {
        event.preventDefault();
        setShowDocumentation(true);
      },
    },
    {
      name: "GitHub",
      href: "https://github.com/bhaaksema/guanaco",
      icon: <BsGithub />,
      onClick: handleClick,
    },
  ];

  /**
   * Handle the user clicking a link.
   * @param {Event} event - The click event.
   */
  function handleClick(event) {
    event.preventDefault();
    window.open(event.currentTarget.href, "_blank");
    event.currentTarget.classList.remove("active");
  }

  /**
   * Render the App component.
   * @returns {JSX.Element}
   */
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand>{title}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Text className="text-muted">{description}</Navbar.Text>
            <Nav className="me-auto"></Nav>
            <Nav className="justify-content-end">
              {links.map((link, index) => (
                <Nav.Link key={index} href={link.href} onClick={link.onClick}>
                  {link.icon}&nbsp;{link.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Proof />
      </Container>
      <Documentation
        show={showDocumentation}
        onHide={() => setShowDocumentation(false)}
      />
    </>
  );
}
