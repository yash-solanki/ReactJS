import React, { createRef, Component } from "react";
import { Container, Divider, Header, Message, Form } from "semantic-ui-react";
import store from '../store';
import FormBuilder from './formBuilder';

const required = value => {
    return value ? undefined : 'Required'
};
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;


const requireFields = [
    {
        type: 'checkbox',
        label: 'T&C',
        name: 'T&C'
    },
    {
        type: 'text',
        label: 'FirstName',
        name: 'firstName',
        placeholder: 'first name',
        validate: required,
        onChange: (event) => {
            // console.log("event.target.value====>", event.target.value);
        }
    },
    {
        type: 'text',
        label: 'LastName',
        name: 'lastName',
        placeholder: 'last name'
    },
    {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'email',
        validate: email,
    },
    {
        type: 'text',
        label: 'Age',
        name: 'age',
        placeholder: 'age',
        validation: {
            errorType: 'number'
        },
        validate: number
    },
    {
        type: 'textField',
        label: 'address',
        name: 'address',
        placeholder: 'placeholder'
    },
    {
        type: 'radio',
        label: 'One',
        name: 'quantity',
        // value: 1,
        radioValue:1
    },
    {
        type: 'radio',
        label: 'Two',
        name: 'quantity',
        // value: 2,
        radioValue:2
    },
    {
        type: 'select',
        label: 'Gender',
        name: 'gender',
        placeholder: 'gender',
        options: [{ key: "m", text: "Male", value: "male" },
                { key: "f", text: "Female", value: "female" }]
    }
];

const handleFormSubmit = (formValues) => {
    console.log("formValues====>", formValues);
};

const getFormValue = (fieldName) => {
  return fieldName && store.getState().form.profile.values ?
      store.getState().form.profile.values[fieldName] : store.getState().form.profile.values
};

const ShowFormData = () => {
    return (
    <Message>
        <Message.Header>Form data:</Message.Header>
        <pre>{JSON.stringify(store.getState().form.profile, null, 2)}</pre>
    </Message>
)};

class App extends Component {
    constructor(props) {
        super(props);
        this.xyz = createRef();
    }
    render() {
        return (
            <Container>
                <Divider hidden />
                <Header as="h1" dividing>
                    A sample form with Semantic UI React and Redux Form
                </Header>
                <FormBuilder
                    onSubmit={handleFormSubmit}
                    datas={requireFields}
                    ref={this.xyz}
                />
                {/*<button onClick={() => console.log('xyz-->', this.xyz.current.context.store.getState('FirstName').form.profile.registeredFields.firstName)}>Test</button>*/}
                <Form.Button primary onClick={() => console.log('xyz-->', getFormValue('firstName'))}> Get Value </Form.Button>
                <ShowFormData />
            </Container>
        )
    }
}

// const App = props => {
// };

export default App;