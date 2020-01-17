import React from 'react';
import Profile from './Components/Profile';
import styled from 'styled-components';
import ShowUser from './ShowUser';
import PortfolioApi from './lib/PortfolioApi.js';
import PortfolioSocket from './lib/PortfolioSocket';

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
    font-size: .9em;
    color: white;
    padding: .4em;
    max-width: 150px;
    white-space: nowrap;
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

const LoadMoreButton = styled.button`
    display: block;
    width: 150px;
    margin: 5px auto;

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
`;

const portfolioUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:8080/portfolio" : "https://idontchop.com/portfolio";

class GuestBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {isLoading: true };
        
        if (window.innerWidth < 600)
            this.state.displayAmount = 4;    // number of profiles to display
        else this.state.displayAmount = 6;

        this.loadGuestBook();
    }

    componentDidMount () {

        // Register sockets for updates to user profiles and new users
        PortfolioSocket.register ( 
            [{route: '/topic/updateUser', callback: (message) => this.updateGuest(message.body)}
            ]);

    }

    /**
     * Activated by user Load More Profiles button
     * Adjusts the amounttodisplay state
     */
    loadMoreVisitors () {
        this.setState({displayAmount: this.state.displayAmount+6 >= this.state.data.length ?
             this.state.data.length : this.state.displayAmount + 6});
        console.log(this.state.displayAmount);
    }

    /**
     * Initial loading
     */
    async loadGuestBook () {

        try {
            let guestBookData = await PortfolioApi.getJson('guestBook');
            guestBookData.reverse();
            this.setState( {data: guestBookData, isLoading: false } );
        } catch (err) {
            this.setState({error: "Error loading guestbook", errorMessage: err});
            console.log("Error loading guestbook", err);
        }
    }

    /**
     * Fetches/updates a single profile
     * @param {id of profile} id 
     */
    async updateGuest(id) {
        console.log("fetching " + id)
        try {
            let guest = await PortfolioApi.getJson('guestBook', id);
            let i = this.state.data.findIndex ( e => e.id == id );

             this.setState ( prevState => {
                let newGuestBook = [...prevState.data];
                if ( i === -1 ) newGuestBook.unshift(guest);    // new user
                else newGuestBook[i] = guest;                   // update
                console.log(guest, i)
                return {data: newGuestBook};
            });

        } catch ( err ) {
            this.setState ( {error: "Error updating user", errorMessage: err});
        }

    }

    render () {
        console.log (this.state);
        return (
            <CenterDiv>
            <GuestBookWrapper >                
            { this.state.isLoading && <div>Loading...</div>}
            {!this.state.isLoading && this.state.data.slice(0,this.state.displayAmount).map ( ( visitor ) => 
                <ProfileWrapper key={visitor.id} >
                    
                    <Profile {...visitor} portfolioUrl={portfolioUrl} />

                    <SignatureDiv>
                        {visitor.profile.name ? visitor.profile.name : "anonymous"}
                    </SignatureDiv>

                    {!!visitor.profile.company ? 
                        <CompanyDiv>{visitor.profile.company}</CompanyDiv> :
                        <CompanyDiv>{" "}</CompanyDiv>
                    }
                </ProfileWrapper>
            )} 

            { !this.state.isLoading &&
                this.state.data.length != this.state.displayAmount &&
                <LoadMoreButton onClick={() => this.loadMoreVisitors()}>Load More Visitors</LoadMoreButton>}
            
            </GuestBookWrapper>

            

            <ShowUser portfolioUrl={portfolioUrl} />
            
            </CenterDiv>
        );

    }
}

export default GuestBook;