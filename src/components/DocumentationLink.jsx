import PropTypes from "prop-types";

DocumentationLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function DocumentationLink({ href, children }) {
  // keep section links in the documentation, open others in a new tab
  const external = !href.startsWith("#");

  /**
   * Render the DocumentationLink component.
   * @returns {JSX.Element}
   */
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default DocumentationLink;
