import React from 'react';
import PortfolioImageCrop from './Components/PortfolioImageCrop.js';
import LoginPortfolio from './Components/LoginPortfolio';
import Profile from './Components/Profile';
import styled from 'styled-components';

const GuestBookWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;    
    margin: 1em auto;

    
    @media only screen and (max-width: 600px) {
        width: 525px;
    }

    @media only screen and (min-width: 600px) {
        width: 525px;
    }

    @media only screen and (min-width: 768px) {
        width: 675px;
    }

    @media only screen and (min-width: 992px) {
        width: 885px;
    }

    @media only screen and (min-width: 1200px) {
        width: 1025px;
    }
`;

const ProfileWrapper = styled.div`
    display: flex;
    flex: 1;
    margin: .4em;
    justify-content: center;
`;


class GuestBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true };

        this.restUrl = '/portfolio/guestBook';
        this.headerArgs = { credentials: 'include' };
        this.postHeaderArgs = { method: 'post', credentials: 'include' };

        this.loadGuestBook();
    }

    async loadGuestBook () {

        let response = await fetch ( this.restUrl, this.headerArgs );

        if ( response.status === 200 ) {
            let responseData = await response.json();

            this.setState( {data: responseData, isLoading: false } );
        }

    }

    render () {
        console.log (this.state);
        return (
            <GuestBookWrapper>
            {!this.state.isLoading && this.state.data.map ( ( visitor ) => 
                <ProfileWrapper key={visitor.id} >
                    <Profile {...visitor} />
                </ProfileWrapper>
            )}
            </GuestBookWrapper>
        );

    }
}

export default GuestBook;