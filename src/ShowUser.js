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
    width: 100%;
    margin: 15px auto;
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
        font-family: serif, Ink Free, cursive;
    }
    input {
        height: 80%;       
        font-family: serif; 
    }

    label {
        font-family: serif;
        font-size: 1em;
        padding: 0;
        margin: 0;
    }

    select {
        height: 80%;
        font-family: serif;
    }
`;

const AccountButton = styled.button`
    color: black;
    font-family: serif;
    font-size: 0.8em;
    margin: 5px auto;
    padding: 2px;
    border-radius: 2px;
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

        if ( this.state.loggedIn ) {
            // try to load full profile and pic
            try {
                this.loadProfilePic();
                this.loadProfile();
            } catch (err) {
                // error fetching here is different
                // would likely indicated corrupted data or bug
                this.setState({error: "Error in loadProfile", errorMessage: err})
            }
        }

        // as good as it gets
        this.setState ( {isLoading: false} );        

    }

    componentDidUpdate(prevProps, prevState) {

        // Error display handling
        if ( !prevState.error && !!this.state.error || 
             ( !!prevState.error && prevState.error !== this.state.error) ) {
            // an error happened
            console.log("ERROR", this.state.error, this.state.errorMessage);
        }
        
    }

    /**
     * Load the user's basic data.
     *
     */
    async loadUser () {

        let userData;
        try {

            userData = await PortfolioApi.getJson('user');
            PortfolioApi.setToken(userData.tokenValue);     // refreshes token with new expiration
            this.setState({user: userData, loggedIn: true});

        } catch (err) {
            
            // error loading current user
            // a 404 error here is normal for visitors
            this.setState( {loggedIn: false})
        }

    }

    async loadProfile() {
    
        try {
            let userProfileData = await PortfolioApi.getJson('profile');
            this.setState ( {userProfile: userProfileData} );
        } catch (err) {
            throw err;
        }

    }

    async updateProfile( {formData}, e) {
        
        // refactor form to match userprofileDto
        formData.social.forEach( e => {
            formData[e.network] = e.url;
        });
        
        try {
            let userProfileData = await PortfolioApi.putJson('profile',formData);
            this.setState({userProfile: userProfileData});
        } catch (err) {
            // could indicate several problems.
            this.setState({'error': "Error in updateProfile", 'errorMessage': err});
        }   
        
    }

    async loadProfilePic () {

        try {
            let profilePic = await PortfolioApi.getPic('profilePic');
            this.setState( { portfolioImage: URL.createObjectURL(profilePic) } );
        } catch (err) {
            this.setState({error: "Load Profile pic failed", errorMessage: err});
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
     * @param {} form 
     * @param {*} e 
     */
    async registerForm ( form, e ) {
        
        let loginFormData = new FormData();
        loginFormData.append("username", form.formData.name);
        loginFormData.append("password", form.formData.password);
        
        let formType = 'formLogin';
        if ( !!form.formData.confPassword ) {            
            // confPassword exists so this is a registration
            formType = 'newFormUser';
        }

       
        try {

            let responseData = await PortfolioApi.postForm(formType, loginFormData);
            
            if ( !responseData.registration || responseData.registration === 'form') {
                // successful if registration is form (login) or reponse doesn't include registration (new)
                PortfolioApi.setToken(responseData.tokenValue);
                
                this.loadProfile();
                this.loadProfilePic();
                this.setState({loggedIn: true});
            } else throw {"error": "login credential mismatch", errorMessage: "weird lol tampering?"};

        } catch (err) {            
            this.setState({error: err.error === 409 ? "Username Conflict" : "Login Error", 
                errorMessage: err});
        }
    }

    logout () {

        // clear token
        PortfolioApi.logout();

        // clear state
        this.setState ( {loggedIn: false, data: {}});
        
    }

    togglePublish () {

        // send request, no need to see response. UI changes will be sent via websocket
        let formData = new FormData();
        formData.append ("publish", !this.state.user.publish );

        PortfolioApi.putForm('publish', formData);

    }

    render() {
        
        let publishButtonText = !!this.state.user && this.state.user.publish === true ?
            'Unpublish' : 'Publish';
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
                    <FormDiv className={"col-md-7"}>
                        <RegisterForm className={"col"}
                            formData={this.profileToFormData()}
                            onSubmit={(f,e) => this.updateProfile(f,e)} />                            
                    </FormDiv>                    
                </div>
                <div className={"container"}>
                    <div className={"row"} >
                        <div className={"col-md-5"}>
                            
                        </div>
                        <div className={"col-md-7"}>
                            <div className={"container"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <AccountButton onClick={ () => this.togglePublish() }>{publishButtonText}</AccountButton>
                                    </div>
                                    <div className={"col-6"}>
                                        <AccountButton onClick={() => this.logout() }>Logout</AccountButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </UserWrapperDiv>
            
        )
    }
}

export default ShowUser;