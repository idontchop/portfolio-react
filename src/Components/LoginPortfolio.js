import React from 'react';
import RegisterForm from './RegisterForm';
import styled from 'styled-components';
import GithubIcon from '../images/github.svg';
import FacebookIcon from '../images/facebook.svg';
import LinkedinIcon from '../images/linkedin.svg';


const oauth2Ext = "/oauth2/authorization/"

const LoginWrapperDiv = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 20px;

    button {
        font-family: serif;
        color: white;
    }
`;

const SocialButton = styled.button`
    height: 50px;
    width: 230px;
    border-radius: 6px;
    padding: 0;

    p {
        padding: 10px 35px 0 0;
        font-size: 1.2em;
    }
    
`;

const RegisterFormDiv = styled.div`
    margin: 15px auto;
`;

// customizes the register / login form
const schema = {
    title: "or directly...",
    type: "object",
    required: ["name", "password" ],
    properties: {
        name: { type: "string", title: "Name", default: ""},
        password: {type: "string", title: "Password", format: "password" },
        confPassword: {type: "string", title: "Repeat Password (for signup)", format: "password"}
    }
    
};

const uiSchema = {

    password: {
        "ui:widget": "password"
    },
    confPassword: {
        "ui:widget": "password"
    },
    "ui:options": {
        orderable: false
    }
};


const LoginPortfolio = (props) => (
    <LoginWrapperDiv>
        <legend>Login / Sign Guestbook with: </legend>
        <div className={"row"}>
            <div className={"col-lg-4"}>
            <a href={props.portfolioUrl + oauth2Ext + "facebook"}>
                <SocialButton>
                <div className={"row"}>
                        <div className={"col-3"}>
                            <img src={FacebookIcon} style={{ height: "50px", width: "auto"}} />
                        </div>
                        <div className={"col-9"}>
                            <p>Facebook</p>        
                        </div>
                    </div>
                </SocialButton>
            </a>
            </div>
            <div className={"col-lg-4"}>
            <a href={props.portfolioUrl + oauth2Ext + "linkedin"}>
                <SocialButton>
                <div className={"row"}>
                        <div className={"col-3"}>
                            <img src={LinkedinIcon} style={{ height: "50px", width: "auto"}} />
                        </div>
                        <div className={"col-9"}>
                            <p>LinkedIn</p>        
                        </div>
                    </div>
                </SocialButton>
            </a>
            </div>
            <div className={"col-lg-4"}>
            <a href={props.portfolioUrl + oauth2Ext + "github"}>
                <SocialButton>
                    <div className={"row"}>
                        <div className={"col-3"}>
                            <img src={GithubIcon} style={{ height: "50px", width: "auto"}} />
                        </div>
                        <div className={"col-9"}>
                            <p>Github</p>        
                        </div>
                    </div>
                </SocialButton>
            </a>
            </div>
        </div>
        <RegisterFormDiv >
            <RegisterForm 
                schema={schema}
                uiSchema={uiSchema}
                onSubmit={!!props.registerForm && props.registerForm}
                horizontal={true} />
        </RegisterFormDiv>

    </LoginWrapperDiv>
)

export default LoginPortfolio;