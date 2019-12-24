import React from 'react';
import PortfolioImageCrop from './Components/PortfolioImageCrop.js';
import portfoliotestimage from './images/response.jpeg';
import LoginPortfolio from './Components/LoginPortfolio';

const FBGRAPHAPI = 'https://graph.facebook.com';
const FBPICTUREEXT = '/me/picture';

class ShowUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true, loggedIn: false };
        this.loadUser();
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
        } else {
            this.setState ( {loggedIn: false, isLoading: false} );
        }
        

    }

    async loadFacebookProfilePic () {


        let testUrl = `http://www.25hourclock.com/response.jpeg`;

        let response = await fetch (testUrl);
        console.log(response);
        let responseData = await response.blob();
        console.log(responseData);
        /* disabled in testing CORS
        let fbUrl = `${FBGRAPHAPI + FBPICTUREEXT}`
        let headers = {
            'Authorization': 'Bearer ' + this.state.user.principal.oUserRequest.accessToken.tokenValue,
            
        }

        console.log(headers);

        let response = await fetch(fbUrl, headers);
        console.log(response);
        let responseData = await response.blob();
        console.log(responseData);
        */
    }


    render() {

        let cookies = document.cookie;
        console.log(cookies)
        if ( this.state.isLoading )
            return <div>loading</div>
        else if ( !this.state.loggedIn )
            return <LoginPortfolio />
        else return (
            <div>
                {this.state.user.tokenValue}
                {cookies}
                <PortfolioImageCrop src={portfoliotestimage} />
            </div>
        )
    }
}

export default ShowUser;