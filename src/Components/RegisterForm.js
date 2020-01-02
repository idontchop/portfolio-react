import React from 'react';

import Form from 'react-jsonschema-form';

const schema = {
    title: "Register",
    type: "object",
    required: ["name", "email"],
    properties: {
        name: { type: "string", title: "Name", default: ""},
        email: {type: "string", title: "Email", format: "email", default: ""},
        company: {type: "string", title: "Company"},
        url: {type: "string", title: "Url", default: "http://", format: "url"},
        social: {type: "array", title: "Social Urls",
                "minItems": 0, "maxItems": 3, uniqueItems: true,
                items: {
                    type: "object",
                    properties: {
                        network: {  type: "string",
                                    title: "network",
                                    default: "facebook",
                                    enum: ["facebook", "github", "linkedin"]},
                        url: {  type: "string",
                                default: "http://",
                                format: "url"}
                    }
                }
        }

    }
    
};

const uiSchema = {
    "ui:options": {
        orderable: false
    }
};

const socialTemplate = (props) => (
    <div>
        <legend>Social Urls</legend>
        {props.items.map(e => <div key={e.index}>{e.children}
            {e.hasRemove && <button type="button" onClick={e.onDropIndexClick(e.index)}>Remove</button>}
        </div> )}
        {props.canAdd && <button type="button" onClick={props.onAddClick}>Add</button>}
        
    </div>
);

const twoColumnTemplate = (props) => {
    const {id, classNames, label, help, required, description, errors, children} = props;
    return (
      <div className={classNames}>
        <label htmlFor={id}>{label}{required ? "*" : null}</label>
        {description}
        {children}
        {errors}
        {help}
      </div>
    );
  }

const ErrorListTemplate = (props) => (<div></div>);

/**
 * Uses jsonschema-form lib:
 * https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/#custom-array-field-buttons
 * 
 * @param {*} props 
 */
const RegisterForm = (props) => (
    <Form schema = {schema}   
            uiSchema={uiSchema}   
            ErrorList={ErrorListTemplate}             
            ArrayFieldTemplate={socialTemplate}
        />
);

export default RegisterForm;
