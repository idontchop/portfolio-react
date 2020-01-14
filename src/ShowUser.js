import React from 'react';
import PortfolioImageCrop from './Components/PortfolioImageCrop.js';
import LoginPortfolio from './Components/LoginPortfolio';
import RegisterForm from './Components/RegisterForm';
import styled from 'styled-components';
import PortfolioApi from './lib/PortfolioApi.js';

const UserWrapperDiv = styled.div`
    background-color: rgb(134,136,139,.6);
    padding: 0px 5px;
    border-radius: 9px;
    width: 95%;
    margin: 5px auto;
    display: block;

    button {
        
        color: black;
        background-color: #A68181;
        border: black 1px solid;
        margin: 3px auto;
        display: block;
        -webkit-box-shadow: 0px 0px 5px 5px rgba(219,219,219,0.7); 
        box-shadow: 0px 0px 5px 5px rgba(219,219,219,0.7);

        :hover {
            color: black;
            background-color: #f2f2f2;
            border: black 1px solid;
            transition: background-color 0.5s ease;
        }
    }
`;

const FormDiv = styled.div`
    color: black;    
    font-family: Ink Free, cursive;
    margin: 5px auto;

    button {
        font-family: Ink Free, cursive;
    }
    input {
        height: 80%;       
        font-family: serif; 
    }

    label {
        font-size: 1em;
        padding: 0;
        margin: 0;
    }

    select {
        height: 80%;
        font-family: serif;
    }
`;

/**
 * Handles API calls for the user control panel below the guestbook
 */
class ShowUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true, loggedIn: false };
        this.profilePicUrl = this.props.portfolioUrl +  `/me/image`;
        this.profileUrl = this.props.portfolioUrl + `/me/profile`;
        this.userUrl = this.props.portfolioUrl + `/user`;
        this.formLoginUrl = this.props.portfolioUrl + `/login`;
        this.newFormUserUrl = this.props.portfolioUrl + `/newFormUser`;

}

    async componentDidMount () {

        if ( this.state.isLoading ) {

            await this.loadUser();
        }

        // loadUser must have failed
        // set interval for retry
        if ( this.state.isLoading ) {

        }
    }

    /**
     * Load the user's data
     */
    async loadUser () {

        let userData = await PortfolioApi.getJson('user');

        if ( !userData.error ) {
            // something went wrong with fetch, set not logged in
            this.setState ( {loggedIn: false} );

        } else {
            // we are good, we have a user

            this.setState({user: userData, loggedIn: true});

            // try to load full profile and pic
            this.loadProfilePic();
            this.loadProfile();
        }

        // as good as it gets
        this.setState ( {isLoading: false} );

    }

    async loadProfile() {
        
        let userProfileData = await PortfolioApi.getJson('profile');
        
        if ( !userProfileData.error ) {
            this.setState ( {userProfile: userProfileData} );            
        }        

        this.setState ( {isLoading: false} );
    }

    async updateProfile( {formData}, e) {
        
        // refactor form to match userprofileDto

        formData.social.forEach( e => {
            formData[e.network] = e.url;
        });

        let response = await fetch ( this.profileUrl, 
            { credentials: 'include', method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(formData)});

        if ( response.status === 200 ) {
            console.log("successful update")
            let responseData = await response.json();
            this.setState({userProfile: responseData});
        } else {
            console.log("unsuccessful update", JSON.stringify(formData));
        }
        
    }

    async loadProfilePic () {

        let response = await fetch (this.profilePicUrl, {credentials: 'include'});

        if ( response.status !== 200 ) {
            // user doesn't have a profile pic
            // this is ok, just leave blank
            this.setState({portfolioImage: {}});
        } else {

            let responseData = await response.blob();
            console.log(this.profilePicUrl)
            console.log(responseData);
            this.setState( { portfolioImage: URL.createObjectURL(responseData) } );
        }
    }

    profileToFormData () {

        console.log("profiletoformdata")
        let socialNetworks = ['facebook', 'twitter', 'github', 'linkedin'];
        let dataChecks = ['email', 'company', 'url'];       // checks for falsy values
        if (!!this.state.userProfile ) {
            let formData = {
                name: this.state.userProfile.name,
                social: []
            };

            dataChecks.forEach ( e => {
                if ( !! this.state.userProfile[e]) {                    
                    formData[e] = this.state.userProfile[e];
                }
            });

            socialNetworks.forEach( e => {
                if ( !! this.state.userProfile[e]) {
                    formData.social.push({ network: e, url: this.state.userProfile[e]});
                }
            });
            
            console.log("formdata: ");
            console.log(formData);
            return formData;

        } else return {};
    }

    /**
     * Handles submission from the username & password register form
     * 
     * TODO: handle username already exists on server. Probably wrap the 
     * validate function in the registerform module.
     * @param {} form 
     * @param {*} e 
     */
    async registerForm ( form, e ) {
        
        let loginFormData = new FormData();
        loginFormData.append("username", form.formData.name);
        loginFormData.append("password", form.formData.password);

        let formUserHeaders = {method: 'POST', credentials: 'include', body: loginFormData};

        if ( !!form.formData.confPassword ) {
            // confPassword exists so this is a registration

            let response = await fetch ( this.newFormUserUrl,
                {method: 'POST', body: loginFormData});

            if ( response.status === 409 ) {
                console.log ("Error: username conflict");
                // TODO
            } else if ( response.status === 200 ) {
                // we are good
                this.setState({loggedIn: true})
                this.loadProfile();
                this.loadProfilePic();
            } else {
                // different error (server broken)
                console.log("Unable to create user", response);
            }

        } else {
            // continue as if we are trying to log in

            let response = await fetch (this.formLoginUrl, 
                formUserHeaders);

            let cookies = document.cookie;
            console.log(cookies);

            let responseData = await response.json().catch ( () => {
                // if json error, login unsuccessful
                console.log ("Unsuccessful login: server responded bad credentials.");
                console.log( "Register Form un/pw", form, e);
            });
            
            if ( responseData && responseData.registration === 'form' ) {
                // successful form log in
                this.setState({loggedIn: true});
                this.loadProfile();
                this.loadProfilePic();
                console.log(responseData);
            }
        }
    }
    render() {

        
        console.log(this.state)
        if ( this.state.isLoading ) // loading
            return <div>loading</div>
        else if ( !this.state.loggedIn )  // not logged in
            return (
                <UserWrapperDiv >
                    <div className={"row"}>
                        <FormDiv>
                            <LoginPortfolio portfolioUrl={this.props.portfolioUrl} registerForm = {(f,e) => this.registerForm(f,e)}/>
                        </FormDiv>
                    </div>
                </UserWrapperDiv>
            );
        else return ( // logged in
            
            <UserWrapperDiv >
                <div className={"row"}>
                    <FormDiv className={"col-md-5"}>
                        <PortfolioImageCrop className={"col"}
                            portfolioUrl={this.props.portfolioUrl}
                            profilePicUrl={this.profilePicUrl} 
                            reload={ () => this.loadProfilePic() } />
                    </FormDiv>
                    <FormDiv className={"col-md-6"}>
                        <RegisterForm className={"col"}
                            formData={this.profileToFormData()}
                            onSubmit={(f,e) => this.updateProfile(f,e)} />
                    </FormDiv>
                </div>
                <div className={"row"} >
                    <div className={"col"}>
                        <a href={this.props.portfolioUrl + "/logout"}><p className={"text-center"}>Logout</p></a>
                    </div>
                </div>

            </UserWrapperDiv>
            
        )
    }
}

export default ShowUser;