import React from 'react';
import Profile from './Components/Profile';
import styled from 'styled-components';
import ShowUser from './ShowUser';
import RegisterForm from './Components/RegisterForm';

const GuestBookWrapper = styled.div`
    display: block;  
    text-align: left;
    
    margin: 1px auto;
 
    @media only screen and (max-width: 600px) {
        width: 340px;
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
    margin: .4em;
    display: inline-block;
    background-color: #86888B;
    opacity: 0.8;
    border-radius: 9px;
    
    
`;

const SignatureDiv = styled.div`
    font-family: Ink Free, cursive;
    color: white;
    padding: .4em;
`;

const CenterDiv = styled.div`
    display: block;
    width: 100%;
`;

const portfolioUrl = "http://localhost:8080/portfolio";


class GuestBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true };

        this.restUrl = portfolioUrl + '/guestBook';
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
            <CenterDiv>
            <GuestBookWrapper >
            { this.state.isLoading && <div>Loading...</div>}
            {!this.state.isLoading && this.state.data.map ( ( visitor ) => 
                <ProfileWrapper key={visitor.id} >
                    
                    <Profile {...visitor} portfolioUrl={portfolioUrl} />
                    <SignatureDiv>{visitor.profile.name ? visitor.profile.name : "anonymous"}</SignatureDiv>
                    
                </ProfileWrapper>
            )} 
            
            </GuestBookWrapper>

            <ShowUser portfolioUrl={portfolioUrl} />
            
            </CenterDiv>
        );

    }
}

export default GuestBook;