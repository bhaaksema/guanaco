import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

DocumentationTable.propTypes = {
  children: PropTypes.node,
};

function DocumentationTable({ children }) {
  /**
   * Render the DocumentationTable component.
   * @returns {JSX.Element}
   */
  return (
    <Table size="sm" bordered responsive>
      {children}
    </Table>
  );
}

export default DocumentationTable;
