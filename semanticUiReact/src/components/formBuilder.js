import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import {connect} from "react-redux";

const renderCheckbox = ({input, label, meta: {error, touched}}) => {
    return (
        <Fragment>
        <Form.Checkbox
            checked={!!input.value}
            name={input.name}
            label={label}
            onChange={(e, { checked }) => input.onChange(checked)}
        />
        <div>
            {touched && ((error && <span>{error}</span>))}
        </div>
        </Fragment>
    )
};

const renderTextArea = ({input, label, placeholder, meta: {error, touched}}) => {
    return (
        <Fragment>
        <Form.TextArea
            {...input}
            label={label}
            placeholder={placeholder}
        />
        <div>
            {touched && ((error && <span>{error}</span>))}
        </div>
        </Fragment>
    )
};

const renderTextField = ({input, label, placeholder, meta: {error, touched}}) => {
    return (
        <Fragment>
            < Form.Input
            {...input}
            label={label}
            placeholder={placeholder}
            onChange={input.onChange}/>
            <div>
                {touched && ((error && <span>{error}</span>))}
            </div>
        </Fragment>
    )
};

const renderSelect = ({label, input, options, placeholder, meta: {error, touched}}) => {
    return (
        <Fragment>
            <Form.Select
            label={label}
            name={input.name}
            onChange={(e, { value }) => input.onChange(value)}
            options={options}
            placeholder={placeholder}
            value={input.value}/>
        <div>
        {touched && ((error && <span>{error}</span>))}
        </div>
        </Fragment>
    )
};

const renderRadio = ({input, label, radioValue, meta: {error, touched}}) => {
    console.log("radioValue====>",input);
    return (
        <Fragment>
        <Form.Radio
            // TODO: this needs to check
            checked={input.value === radioValue}
            // value={radioValue}
            label={label}
            name={input.name}
            onChange={(e, { checked }) => input.onChange(radioValue)}
        />
        <div>
            {touched && ((error && <span>{error}</span>))}
        </div>
        </Fragment>
    )
};

class FormBuilder extends React.Component{
    // sampleFunction() {
    //     console.log("const getFormElementData");
    // };
    render() {
        const { handleSubmit, reset, datas, onSubmit } = this.props;
        return (
            <Fragment>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {datas.map((data, i) => {
                        let compType = '';
                        switch (data.type) {
                            case 'checkbox':
                                compType = renderCheckbox;
                                break;
                            case 'text':
                                compType = renderTextField;
                                break;
                            case 'textField':
                                compType = renderTextArea;
                                break;
                            case 'select':
                                compType = renderSelect;
                                break;
                            case 'radio':
                                compType = renderRadio;
                                break;
                            default:
                                compType = '';
                                break;
                        }
                        return <Field
                            key = {i}
                            component={ compType }
                            {...data}
                        />
                    })}
                    <Form.Button primary>Submit</Form.Button>
                    <Form.Button onClick={reset}>Reset</Form.Button>
                </Form>
            </Fragment>
        )
    }
}


/*const FormBuilder = (props) => {
    // useImperativeHandle(ref, () => {
        // const sampleFunction = () => {
        //     console.log("const getFormElementData");
        // };
        function getAlert() {
            alert("getAlert from Child");
        }
    // });
    const { handleSubmit, reset, datas, onSubmit } = props;
    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {datas.map((data, i) => {
                    let error;
                    if (data.validation && data.validation.errorType === 'required') {
                        error = required;
                    } else if (data.validation && data.validation.errorType === 'number') {
                        error = number;
                    } else if (data.validation && data.validation.errorType === 'email') {
                        error = email;
                    }
                    let compType = '';
                    switch (data.type) {
                        case 'checkbox':
                            compType = renderCheckbox;
                            break;
                        case 'text':
                            compType = renderTextField;
                            break;
                        case 'textField':
                            compType = renderTextArea;
                            break;
                        case 'select':
                            compType = renderSelect;
                            break;
                        case 'radio':
                            compType = renderRadio;
                            break;
                        default:
                            compType = '';
                            break;
                    }
                    return <Field
                        Key = {i}
                        component={ compType }
                        {...data}
                        // needs to check for dynamic error message
                        // validate={ [ () => error(data.validation && data.validation.errorMessage) ] }
                        validate={ error || '' }
                    />
                })}
                <Form.Button primary>Submit</Form.Button>
                <Form.Button onClick={reset}>Reset</Form.Button>
            </Form>
        </Fragment>
    )
};*/

const FormBuilderWrap =  reduxForm({
    form: "profile"
})(FormBuilder);

const mapStateToProps = state => {
    // console.log("state.form.profile.values====>",state.form.profile && state.form.profile.values);
    return state.form.profile
        ? {
            values: state.form.profile.values,
            submitSucceeded: state.form.profile.submitSucceeded
        }
        : {};
};

export default connect(mapStateToProps)(FormBuilderWrap);