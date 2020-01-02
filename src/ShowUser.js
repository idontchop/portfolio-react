import React from 'react';
import PortfolioImageCrop from './Components/PortfolioImageCrop.js';
import LoginPortfolio from './Components/LoginPortfolio';
import RegisterForm from './Components/RegisterForm';
import styled from 'styled-components';


const FBGRAPHAPI = 'https://graph.facebook.com';
const FBPICTUREEXT = '/me/picture';

const UserWrapperDiv = styled.div`
    background-color: rgb(134,136,139,.6);
    border-radius: 9px;
    width: 99%;
    margin: 5px auto;

    button {
        font-family: Ink Free, cursive;
        color: black;
        background-color: #A68181;
        border: black 1px solid;
        margin: 1px auto;
        display: block;

        :hover {
            color: black;
            background-color: white;
            border: black 1px solid;
        }
    }
`;

const FormDiv = styled.div`
    color: black;    
    font-family: Ink Free, cursive;
    input {
        height: 80%;       
        font-family: serif; 
    }
    label {
        font-size: 1em;
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
        this.loadUser();

        this.profileUrl = `/portfolio/me/image`;

    }

    /**
     * Load the user's data
     */
    async loadUser () {

        let headerArgs = { credentials: 'include' };
        let response = await fetch ( "/portfolio/user", headerArgs ).catch (() => {
            console.log("fetch failed - user not logged in?");
            this.setState ({loggedIn: false, isLoading: false});
        });

        if ( response.status === 200  ) {
            
            console.log(response)
            let responseData = await response.json();

            this.setState({ user: responseData});
            this.setState({ loggedIn: true, isLoading: false});
            console.log(this.state)
            this.loadProfilePic();

        } else {
            this.setState ( {loggedIn: false, isLoading: false} );
        }

    }

    async loadProfilePic () {

        let response = await fetch (this.profileUrl);

        if ( response.status !== 200 ) {
            // user doesn't have a profile pic
            // this is ok, just leave blank
            this.setState({portfolioImage: {}});
        } else {

            let responseData = await response.blob();
            console.log(responseData);
            this.setState( { portfolioImage: URL.createObjectURL(responseData) } );
        }
    }

    render() {

        let cookies = document.cookie;
        console.log(cookies)
        console.log(this.state)
        if ( this.state.isLoading )
            return <div>loading</div>
        else if ( !this.state.loggedIn )
            return <LoginPortfolio />
        else return (
            <UserWrapperDiv className={"row"}>
                    <div className={"col-sm-5"}>
                        <PortfolioImageCrop className={"col"}
                            profileUrl={this.profileUrl} reload={() => this.loadProfilePic()} />
                    </div>
                    <FormDiv className={"col-sm-6"}>
                        <RegisterForm className={"col"} />
                    </FormDiv>
            </UserWrapperDiv>
        )
    }
}

export default ShowUser;