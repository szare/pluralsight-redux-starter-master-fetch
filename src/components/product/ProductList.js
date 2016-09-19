import React, {PropTypes} from "react";
import ProductListRow from "./ProductListRow";

const ProductList = ({products}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>ShortName</th>
        <th>Description</th>
        <th>FullName</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      {products.map(product =>
        <ProductListRow key={product.ID} product={product}/>
      )}
      </tbody>
    </table>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
