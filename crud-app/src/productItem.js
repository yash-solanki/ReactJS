import React from 'react';

class ProductItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    onEdit() {
        this.setState({ 
            isEdit: true
        })
    }

    onEditSubmit(event) {
        event.preventDefault();
        this.props.onEditSubmit(this.nameInput.value, this.priceInput.value, this.props.id);
        this.setState({
            isEdit : false
        })
    }

    render() {
        const {name, price, deleteProduct} = this.props;
        return (
            <div key={Math.random()}>
                {
                    this.state.isEdit ?
                        (
                            <form onSubmit={this.onEditSubmit}>
                                <input placeholder='Product Name' ref={nameInput => this.nameInput = nameInput}
                                defaultValue={name}/>
                                {` | `}
                                <input placeholder='Product Price' ref={priceInput => this.priceInput = priceInput}
                                defaultValue={price}/>
                                {` | `}
                                <button type='submit'>Submit</button>
                            </form>
                        ) :
                        (
                            <span>{name} | {price} |
                                <button onClick={this.onEdit}>Edit Product</button>
                                {` | `}
                                <button onClick={deleteProduct}>Delete Product</button>
                                </span>
                        )
                }
            </div>
        );
    }
}

export default ProductItem;
