import React from 'react';

class AddItem extends React.Component{

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.AddItem(this.nameInput.value, this.priceInput.value);
        this.nameInput.value = '';
        this.priceInput.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input placeholder='Product Name' ref={nameInput => this.nameInput = nameInput}/>
                {` | `}
                <input placeholder='Product Price' ref={priceInput => this.priceInput = priceInput}/>
                {` | `}
                <button type='submit'>Add Product</button>
            </form>
        );
    }
}

export default AddItem;
