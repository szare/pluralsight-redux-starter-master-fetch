import React, {PropTypes} from "react";
import {Link} from "react-router";

const ProductListRow = ({product}) => {
  return (
    <tr>
      <td><Link to={'/product/' + product.ID}>{product.ShortName}</Link></td>
      <td>{product.Description}</td>
      <td>{product.FullName}</td>
      <td>{product.Price}</td>
    </tr>
  );
};

ProductListRow.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListRow;
