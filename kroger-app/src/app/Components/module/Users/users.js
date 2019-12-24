import React, { Component } from 'react';
import axios from 'axios';
import AddUser from "./addUser";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


class Users extends Component {

    state = {
        persons: [],
        isEdit: false,
    };

    deleteProduct(i) {
        axios.delete(`http://localhost:9002/v1/admin/users/${i}`, this.headers)
            .then(res => {
                axios.get(`http://localhost:9002/v1/admin/users`, this.headers)
                    .then(res => {
                        const persons = res.data.Data.data;
                        this.setState({ persons });
                    })
            })
    }
    headers = {
        headers: {
            Authorization: 'Bearer d40e029af72beb4aaa434816eee414f43f744098',
            // Division: 'KROG065',
            SessionToken: 'uZFQVcNHk4wWZdf4QqaAOoUo7JgBqyd9gBfC4KJ8Cq9BOuXogCdIlUsPvObv',
            'content-type': 'application/json'
        }
    };
    componentDidMount() {
        axios.get(`http://localhost:9002/v1/admin/users`, this.headers)
            .then(res => {
                const persons = res.data.Data.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <div className="Home">
                <h2>Users page</h2>
                <table className="zui-table">
                    <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>Email</th>
                        <th>IsSuperAdmin</th>
                        <th>LastName</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.state.persons.map(person =>
                            (<tr>
                            <td>{person.FirstName}</td>
                            <td>{person.Email}</td>
                            <td>{person.IsSuperAdmin ? 'true' : 'false'}</td>
                            <td>{person.LastName}</td>
                            {/*<td><button onClick={this.onEdit}>Edit</button></td>*/}
                            <td><Link to={"/editusers/" + person._id} className="btn btn-primary">Edit</Link></td>
                            <td><button onClick={() => this.deleteProduct(person._id)}>Delete</button></td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispachToProps = dispach => {
    return {
        updateA: b => dispach({ type: "UPDATE_A", b: b }),
        updateB: a => dispach({ type: "UPDATE_B", a: a })
    };
};

const mapStateToProps = state => {
    return {
        a: state.rA.a,
        b: state.rB.b
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Users);

