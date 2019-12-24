import React from 'react';

import axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons: [],
        name: ''
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            name: this.state.name
        };

        // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         const name = [...this.state.persons.name];
        //         name.push(res.data.user.name);
        //         this.setState({
        //             persons: name
        //         })
        //     })

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            console.log('res', res);
            console.log(res.data);
            // const name = [...this.state.persons.name];
            // name.push(res.data.user.name);
            // this.setState({
            //     persons: name
            // })
        });
    };

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                console.log("res====>",res.data);
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                    { this.state.persons.map(person => <li>{person.name}</li>)}
                </ul>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        Person Name:
                        <input type="text" name="name" onChange={this.handleChange} />
                        </label>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
