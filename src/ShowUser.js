import React from 'react';
import PortfolioImageCrop from './Components/PortfolioImageCrop.js';
import LoginPortfolio from './Components/LoginPortfolio';
import RegisterForm from './Components/RegisterForm';
import styled from 'styled-components';

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

class ShowUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true, loggedIn: false };
        this.profilePicUrl = this.props.portfolioUrl +  `/me/image`;
        this.profileUrl = this.props.portfolioUrl + `/me/profile`;
        this.userUrl = this.props.portfolioUrl + `/user`;


        this.loadUser();

    }

    /**
     * Load the user's data
     */
    async loadUser () {

        let headerArgs = { credentials: 'include' };

        let response = await fetch ( this.userUrl, headerArgs ).catch (() => {
            console.log("fetch failed - user not logged in?");
            this.setState ({loggedIn: false, isLoading: false});
        });

        if ( response.status === 200  ) {
        
            let responseData = await response.json().catch ( () => {
                console.log("json fail");
                
            });

            this.setState({ user: responseData});
            this.setState({ loggedIn: true, isLoading: false});
            console.log(this.state)

            // successful login so load user info
            this.loadProfilePic();
            this.loadProfile();

        } else {
            this.setState ( {loggedIn: false, isLoading: false} );
        }

    }

    async loadProfile() {
        
        let response = await fetch (this.profileUrl, {credentials: 'include', cache: 'no-cache'} ).catch ( () => {
            console.log (" fetch profile failed");            
        });

        if ( response.status === 200 ) {

            let responseData = await response.json();

            console.log("profile fetch:")
            this.setState ( {userProfile: responseData} );
            console.log(this.state.userProfile)
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
    render() {

        let cookies = document.cookie;
        console.log(cookies)
        console.log(this.state)
        if ( this.state.isLoading ) // loading
            return <div>loading</div>
        else if ( !this.state.loggedIn )  // not logged in
            return (
                <UserWrapperDiv >
                    <div className={"row"}>
                        <FormDiv>
                            <LoginPortfolio />
                        </FormDiv>
                    </div>
                </UserWrapperDiv>
            );
        else return ( // logged in
            
            <UserWrapperDiv >
                <div className={"row"}>
                    <FormDiv className={"col-sm-5"}>
                        <PortfolioImageCrop className={"col"}
                            portfolioUrl={this.props.portfolioUrl}
                            profilePicUrl={this.profilePicUrl} 
                            reload={ () => this.loadProfilePic() } />
                    </FormDiv>
                    <FormDiv className={"col-sm-6"}>
                        <RegisterForm className={"col"}
                            formData={this.profileToFormData()}
                            onSubmit={(f,e) => this.updateProfile(f,e)} />
                    </FormDiv>
                </div>
                <div className={"row"} >
                    <div className={"col"}>
                        <a href="http://localhost:8080/portfolio/logout"><p className={"text-center"}>Logout</p></a>
                    </div>
                </div>

            </UserWrapperDiv>
            
        )
    }
}

export default ShowUser;