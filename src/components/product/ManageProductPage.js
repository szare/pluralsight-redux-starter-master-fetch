import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as productActions from "../../actions/productActions";
import ProductForm from "./ProductForm";
import toastr from "toastr";

class ManageProductPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      product: Object.assign({}, this.props.product),
      errors: {},
      saving: false,
      deleting:false
    };
    this.updateProductState = this.updateProductState.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.product.ID != nextProps.product.ID) {
      // Necessary to populate form when existing product is loaded directly.
      this.setState({product: Object.assign({}, nextProps.product)});
    }
  }


  updateProductState(event) {
    const field = event.target.name;
    let product = this.state.product;
    product[field] = event.target.value;
    return this.setState({product: product});
  }


  /* productFormIsValid() {
   let formIsValid = true;
   let errors = {};

   if (this.state.product.ShortName.length < 5) {
   errors.title = 'ShortName must be at least 5 characters.';
   formIsValid = false;
   }

   this.setState({errors: errors});
   return formIsValid;
   }*/

  saveProduct(event) {
    event.preventDefault();

    /*if (!this.productFormIsValid()) {
     return;
     }*/
    this.setState({saving: true});
    this.props.actions.saveProduct(this.state.product)
      .then(()=>this.redirect())
      .catch(error=> {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    //this.props.actions.loadProductsSuccess(this.state.products);
    this.setState({saving: false});
    toastr.success('Product saved');
    this.context.router.push('/products');
  }



  deleteProduct(event) {
    event.preventDefault();
    this.setState({deleting: true});

    this.props.actions.deleteProduct(this.state.product.ID)
      .then(() => this.redirectDeleting())
      .catch(error=>{
        toastr.error(error);
        this.setState({deleting: false});
      });
  }


  redirectDeleting() {
    this.setState({deleting: false});
    toastr.success('Product deleted');
    this.context.router.push('/Products');
  }

  render() {
    return (
      <ProductForm
        product={this.state.product}
        onChange={this.updateProductState}
        onSave={this.saveProduct}
        errors={this.state.errors}
        saving={this.state.saving}
        onDelete={this.deleteProduct}
        deleting={this.state.deleting}

      />
    );
  }
}

ManageProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageProductPage.contextTypes = {
  router: PropTypes.object
};

function getProductByID(products, id) {
  const product = products.filter(product => product.ID == id);
  if (product.length) return product[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.params.ID; // from the path `/product/:id`
  let product = {
    ID: 0,
    ShortName: '',
    Description: '',
    FullName: '',
    Price: ''
  };

  if (productId && state.products.length > 0) {
    product = getProductByID(state.products, productId);
  }


  return {
    product: product
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductPage);
