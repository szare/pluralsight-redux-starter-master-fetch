let products = [];

let result = fetch('http://localhost:64985/api/products', {
  method: 'GET',
  credentials: "same-origin",
  mode: "cors",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

class ProductApi {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      resolve(Object.assign(
        result.then(function (response) {
          return response.text();
        }).then(function (text) {
          return JSON.parse(text);
        }).catch(function (ex) {
        })
      ), products);
    });
  }


  static saveProduct(product) {
    product = Object.assign({}, product); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (product.ID) {
        fetch(`http://localhost:64985/api/products/${product.ID}`, {
          method: 'PUT',
          credentials: "same-origin",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });
      } else {
        fetch('http://localhost:64985/api/products', {
          method: 'POST',
          credentials: "same-origin",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });
      }
      resolve(product);
    });
  }


  static deleteProduct(productId) {  //courseId
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:64985/api/products/${productId}`, {
        method: 'DELETE',
        credentials: "same-origin",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productId)
      });
      resolve();
    });
  }
}

export default ProductApi;
