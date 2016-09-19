import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as productActions from "../../actions/productActions";
import ProductList from "./ProductList";
import {browserHistory} from "react-router";

class ProductsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddProductPage = this.redirectToAddProductPage.bind(this);
  }

  redirectToAddProductPage() {
    browserHistory.push('/product');
  }

  render() {
    const {products}=this.props;
    return (
      <div>
        <p>Product Page</p>
        <input type="submit"
               value="Add Product"
               className="btn btn-primary"
               onClick={this.redirectToAddProductPage}/>
        <ProductList products={products}/>
      </div>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
