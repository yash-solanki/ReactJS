import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from '../../module/home/index';
import About from "../../module/About/about";
import Users from "../../module/Users/users";
import AddUser from "../../module/Users/addUser";

class Headers extends Component{
    render() {
        return (
            <Router>
                <div className='navDiv'>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/users'>users</NavLink></li>
                        <li><NavLink to='/addusers'>addUsers</NavLink></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/users" component={Users} />
                    <Route path="/addusers" component={AddUser} />
                    <Route path="/editusers/:id" component={AddUser} />
                </div>
            </Router>
    )
    }

}

export default Headers;
