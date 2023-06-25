import { Container, Nav, Navbar } from "react-bootstrap";
import { BsFileEarmarkTextFill, BsGithub } from "react-icons/bs";

import Proof from "./components/Proof";

export default function App() {
  const title = "Guanaco";
  const description = "A Syntactic Proof Guide for Epistemic Logic";
  const links = [
    {
      name: "Documentation",
      href: "https://bhaaksema.github.io/guanaco-doc/",
      icon: <BsFileEarmarkTextFill />,
    },
    {
      name: "GitHub",
      href: "https://github.com/bhaaksema/guanaco",
      icon: <BsGithub />,
    },
  ];

  /**
   * Handle the user clicking a link.
   * @param {Event} event - The click event.
   */
  function handleClick(event) {
    event.preventDefault();
    window.open(event.target.href, "_blank");
    event.target.removeClass("active");
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
                <Nav.Link key={index} href={link.href} onClick={handleClick}>
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
    </>
  );
}
