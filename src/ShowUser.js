import React from 'react';
import PortfolioImageCrop from './Components/PortfolioImageCrop.js';
import LoginPortfolio from './Components/LoginPortfolio';
import styled from 'styled-components';

const FBGRAPHAPI = 'https://graph.facebook.com';
const FBPICTUREEXT = '/me/picture';

const UserWrapperDiv = styled.div`
    background-color: rgb(134,136,139,.6);
    border-radius: 9px;
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
            <UserWrapperDiv>                                
                <PortfolioImageCrop profileUrl={this.profileUrl} reload={() => this.loadProfilePic()} />
            </UserWrapperDiv>
        )
    }
}

export default ShowUser;