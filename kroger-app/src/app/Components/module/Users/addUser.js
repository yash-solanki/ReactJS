import React, { Component } from 'react';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Error from './error';
import { Redirect, Link } from 'react-router-dom'

// const ValidationSchema = Yup.object().shape({
//     name: Yup.string()
//         .min(1, "Too Short!")
//         .max(255, "Too Long!")
//         .required("Required"),
//     country: Yup.string()
//         .min(1, "Too Short!")
//         .max(255, "Too Long!")
//         .required("Required"),
//     email: Yup.string()
//         .email("Must be an email address")
//         .max(255, "Too Long!")
//         .required("Required")
// });

class AddUser extends Component {

    state = {
        user : []
    };

    isEdit = false;

    headers = {
        headers: {
            Authorization: 'Bearer d40e029af72beb4aaa434816eee414f43f744098',
            SessionToken: 'uZFQVcNHk4wWZdf4QqaAOoUo7JgBqyd9gBfC4KJ8Cq9BOuXogCdIlUsPvObv',
            'content-type': 'application/json'
        }
    };

    componentDidMount() {
        console.log("this.props====>",this.props.match.params.id);
        if (this.props.match.params.id) {
            this.isEdit = true;
            console.log('yes', typeof this.props.match.params.id);
            const id = this.props.match.params.id;
            axios.get(`http://localhost:9002/v1/admin/users/${id}`, this.headers)
                .then(res => {
                    console.log("res====>", res.data.Data.user);
                    const user = res.data.Data.user;
                    this.setState({ user });
                })
        }
    }

    // componentDidMount() {
    //     axios.get(`http://localhost:9002/v1/admin/users`, this.headers)
    //         .then(res => {
    //             console.log("res====>", res.data.Data.data);
    //             const persons = res.data.Data.data;
    //             this.setState({ persons });
    //         })
    // }

    render() {
        return (
            <Formik
                enableReinitialize = {true}
                initialValues={{
                    FirstName: this.state.user.FirstName,
                    LastName: this.state.user.LastName,
                    Email: this.state.user.Email,
                    userType: '',
                    IsSuperAdmin: true,
                    Roles: ["59846ae6b0e2e3bc2698d642"]
                }}
                // validationSchema={ValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("this.headers====>", values);
                    setSubmitting(true);
                    if (!this.isEdit) {
                        axios.post(`http://localhost:9002/v1/admin/users`, values, this.headers)
                            .then(res => {
                                console.log("res====>", res.data.Data.data);
                                const persons = res.data.Data.data;
                                this.setState({persons});
                            });
                    } else {
                        axios.put(`http://localhost:9002/v1/admin/users/${this.state.user._id}`, values, this.headers)
                            .then(res => {
                                console.log("res====>", res.data.Data.data);
                                const persons = res.data.Data.data;
                                this.setState({persons});
                            });
                    }

                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false);
                        {/*<Redirect to='/user'/>*/}
                    }, 500);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>A Great Form</h2>

                        <div className="input-row">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="FirstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.FirstName}
                                className={touched.FirstName && errors.FirstName ? "has-error" : null}
                            />
                            <Error touched={touched.FirstName} message={errors.FirstName} />
                        </div>

                        <div className="input-row">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="LastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.LastName}
                                className={touched.LastName && errors.LastName ? "has-error" : null}
                            />
                            <Error touched={touched.LastName} message={errors.LastName} />
                        </div>

                        <div className="input-row">
                            <label>Email</label>
                            <input
                                type="text"
                                name="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Email}
                                className={touched.Email && errors.Email ? "has-error" : null}
                            />
                            <Error touched={touched.Email} message={errors.Email} />
                        </div>

                        <select
                            name="userType"
                            value={values.userType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input-row"
                        >
                            <option value='' label='Select' />
                            <option value='AdminUser' label='Admin User' />
                            <option value='DivisonUser' label='Divison User' />
                        </select>

                        <div className="input-row">
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>

                        {JSON.stringify(values)}
                    </form>
                )}
            </Formik>
        );
    }
}

export default AddUser;
