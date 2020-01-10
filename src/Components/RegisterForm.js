import React from 'react';

import Form from 'react-jsonschema-form';

// default register schema, if schema is passed in props, this is not used
const schema = {
    title: "Sign Guest Book!",
    type: "object",
    required: ["name", "email"],
    properties: {
        name: { type: "string", title: "Name", default: ""},
        email: {type: "string", title: "Email", format: "email", default: ""},
        company: {type: "string", title: "Company"},
        url: {type: "string", title: "Url", default: "http://", format: "url"},
        social: {type: "array", title: "Social Urls",
                "minItems": 0, "maxItems": 4, uniqueItems: true,
                items: {
                    type: "object",
                    properties: {
                        network: {  type: "string",
                                    title: "network",
                                    default: "facebook",
                                    enum: ["facebook", "github", "linkedin", "twitter"]},
                        url: {  type: "string",                                
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

const HorizontalFieldTemplate = ({ TitleField, properties, title, description }) => {
    return (
      <div>
        <TitleField title={title} />
        <div className="row">
          {properties.map(prop => (
            <div
              className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              key={prop.content.key}>
              {prop.content}
            </div>
          ))}
        </div>
        {description}
      </div>
    );
  }

const validate = (formData, errors) => {
    if (  !!formData.confPassword &&
          formData.confPassword.length > 0 && 
          formData.password !== formData.confPassword ) {
        errors.confPassword.addError("Passwords don't match.");
    }
    return errors;
}  
const ErrorListTemplate = (props) => (<div></div>);

/**
 * Uses jsonschema-form lib:
 * https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/#custom-array-field-buttons
 * 
 * Live Validation issue:
 * https://github.com/rjsf-team/react-jsonschema-form/issues/512
 * Happens because we pass a formData
 * Can be fixed in the validate function?
 * 
 * @param {*} props 
 */
const RegisterForm = (props) => (
    <Form schema = { !!props.schema ? props.schema : schema}   
            onSubmit={ !!props.onSubmit && props.onSubmit }
            uiSchema={ !!props.uiSchema ? props.uiSchema : uiSchema}   
            ErrorList={ErrorListTemplate}             
            ArrayFieldTemplate={socialTemplate}
            ObjectFieldTemplate={ !!props.horizontal ? HorizontalFieldTemplate : null}
            formData={!!props.formData ? props.formData : false }
            validate={validate}
            liveValidate={true}
        />
);

export default RegisterForm;
