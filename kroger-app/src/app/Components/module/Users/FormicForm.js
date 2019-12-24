import React from "react";
import Autosuggest from "react-autosuggest";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./error";

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long!")
        .required("Required"),
    country: Yup.string()
        .min(1, "Too Short!")
        .max(255, "Too Long!")
        .required("Required"),
    email: Yup.string()
        .email("Must be an email address")
        .max(255, "Too Long!")
        .required("Required")
});

function isValidPostalCode(postalCode, country) {
    let postalCodeRegex;

    switch (country) {
        case "United States of America":
            postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            break;
        case "Canada":
            postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
            break;
        default:
            return true;
    }
    return postalCodeRegex.test(postalCode);
}

function postalCodeLabel(country) {
    const postalCodeLabels = {
        "United States of America": "Zip Code",
        Canada: "Postal Code"
    };
    return postalCodeLabels[country] || "Postal Code";
}

function showPostalCode(country) {
    return ["United States of America", "Canada"].includes(country);
}

export default function FormikForm() {
    const [country, setCountry] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                country: "",
                postalCode: ""
            }}
            validationSchema={ValidationSchema}
            validate={values => {
                let errors = {};

                // Validate the Postal Code conditionally based on the chosen Country
                if (!isValidPostalCode(values.postalCode, values.country)) {
                    errors.postalCode = `${postalCodeLabel(values.country)} invalid`;
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setCountry("");
                    setSubmitting(false);
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
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className={touched.name && errors.name ? "has-error" : null}
                        />
                        <Error touched={touched.name} message={errors.name} />
                    </div>

                    <div className="input-row">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={touched.email && errors.email ? "has-error" : null}
                        />
                        <Error touched={touched.email} message={errors.email} />
                    </div>

                    <div className="input-row">
                        <label>Country</label>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={async ({ value }) => {
                                if (!value) {
                                    setSuggestions([]);
                                    return;
                                }

                                try {
                                    const response = await axios.get(
                                        `https://restcountries.eu/rest/v2/name/${value}`
                                    );

                                    setSuggestions(
                                        response.data.map(row => ({
                                            name: row.name,
                                            flag: row.flag
                                        }))
                                    );
                                } catch (e) {
                                    setSuggestions([]);
                                }
                            }}
                            onSuggestionsClearRequested={() => {
                                setSuggestions([]);
                            }}
                            getSuggestionValue={suggestion => suggestion.name}
                            renderSuggestion={suggestion => (
                                <div>
                                    <img
                                        src={suggestion.flag}
                                        alt={suggestion.name}
                                        style={{ width: "25px" }}
                                    />
                                    {suggestion.name}
                                </div>
                            )}
                            onSuggestionSelected={(event, { suggestion, method }) => {
                                if (method === "enter") {
                                    event.preventDefault();
                                }
                                setCountry(suggestion.name);
                                setFieldValue("country", suggestion.name);
                            }}
                            inputProps={{
                                placeholder: "Search for your country",
                                autoComplete: "abcd",
                                value: country,
                                name: "country",
                                onChange: (_event, { newValue }) => {
                                    setCountry(newValue);
                                },
                                className:
                                    touched.country && errors.country ? "has-error" : null
                            }}
                        />
                        <Error touched={touched.country} message={errors.country} />
                    </div>

                    {showPostalCode(values.country) ? (
                        <div className="input-row">
                            <label>{postalCodeLabel(values.country)}</label>
                            <input
                                type="text"
                                name="postalCode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postalCode}
                                className={
                                    touched.postalCode && errors.postalCode ? "has-error" : null
                                }
                            />
                            <Error touched={touched.postalCode} message={errors.postalCode} />
                        </div>
                    ) : null}

                    <div className="input-row">
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
}
