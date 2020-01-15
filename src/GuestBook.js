import React from 'react';
import Profile from './Components/Profile';
import styled from 'styled-components';
import ShowUser from './ShowUser';
import PortfolioApi from './lib/PortfolioApi.js';
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
    border-radius: 9px;
    padding: 2px;
    
`;

const SignatureDiv = styled.div`
    font-family: Ink Free, cursive;
    color: white;
    padding: .4em;
`;

const CompanyDiv = styled.div`
    font-family: serif;
    color: #dedede;
    padding: .1em .5em;
    font-size: .7em;

`;

const CenterDiv = styled.div`
    display: block;
    width: 100%;
`;

const portfolioUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:8080/portfolio" : "https://idontchop.com/portfolio";

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

        let guestBookData = await PortfolioApi.getJson('guestBook');

        if ( ! guestBookData.error ) {
            this.setState( {data: guestBookData, isLoading: false } );
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
                    {!!visitor.profile.company ? 
                        <CompanyDiv>{visitor.profile.company}</CompanyDiv> :
                        <CompanyDiv>{" "}</CompanyDiv>
                    }
                </ProfileWrapper>
            )} 
            
            </GuestBookWrapper>

            <ShowUser portfolioUrl={portfolioUrl} />
            
            </CenterDiv>
        );

    }
}

export default GuestBook;