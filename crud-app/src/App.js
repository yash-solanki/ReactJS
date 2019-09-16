import React from 'react';
import './App.css';
import ProductItem from "./productItem";
import AddItem from "./AddItem";

const products = [
  {
    id: 1,
    name: 'iphone',
    price: 699
  },
  {
    id: 2,
    name: 'ipad',
    price: 200
  }
];
localStorage.setItem(products, JSON.stringify(products));

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      product: JSON.parse(localStorage.getItem(products))
    };
    this.AddItem = this.AddItem.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentDidMount() {
    const product = this.getProducts();
    this.setState({product});
  }

  getProducts() {
    return this.state.product;
  }

  deleteProduct(pId) {
    const product = [...this.state.product];
    product.splice(pId, 1);
    this.setState({product});
  }

    onEditSubmit(name, price, pId) {
        let product = this.getProducts();
        product.map(prod => {
          if (prod.id === pId) {
            prod.name = name;
            prod.price = price;
          }
          return prod;
        });
        this.setState({ product });
    }

  editProduct(pId) {
    console.log('yash edit', pId);
    // pId ? {...this.state.product} : '';
    // this.isEdit = true;
    // const product = [...this.state.product];
    // this.setState({product});
  }

  AddItem(name, price) {
    const product = [...this.state.product];
    product.push({ id: this.state.product.length + 1, name: name, price: price });
    this.setState({ product: product });
  }

  render() {
    return (
        <div className="App">
          <h1>Product List</h1>
          <AddItem
              AddItem = {this.AddItem}
              {...this.state.product}
          />
          <ul>
          {this.state.product.map((prod, i) => {
            return (
                <ProductItem
                key={prod.name}
                {...prod}
                index = {i}
                deleteProduct = {() => this.deleteProduct(i)}
                onEditSubmit = {this.onEditSubmit}
                />
            )
          })}
          </ul>

        </div>
    );
  }
}

export default App;
