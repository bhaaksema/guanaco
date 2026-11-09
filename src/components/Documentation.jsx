import PropTypes from "prop-types";
import { Offcanvas } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

import content from "../../docs/index.md?raw";
import DocumentationLink from "./DocumentationLink";
import DocumentationTable from "./DocumentationTable";

Documentation.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

function Documentation({ show, onHide }) {
  /** @type {CSSProperties} */
  const offcanvasStyle = {
    width: "min(100vw, max(55vw, 40rem))",
  };

  /**
   * Render the Documentation component.
   * @returns {JSX.Element}
   */
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      style={offcanvasStyle}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Documentation</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeSlug, rehypeKatex]}
          components={{ a: DocumentationLink, table: DocumentationTable }}
        >
          {content}
        </ReactMarkdown>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Documentation;
