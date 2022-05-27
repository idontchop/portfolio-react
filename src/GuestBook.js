import React from 'react';
import Profile from './Components/Profile';
import styled from 'styled-components';
import ShowUser from './ShowUser';
import PortfolioApi from './lib/PortfolioApi.js';
import PortfolioSocket from './lib/PortfolioSocket';
import Loading from './Components/Loading';

/**
 * stores the number of profiles to display based on screen width
 */
const numToDisplay = [
    [360, 4],
    [600, 4],
    [768, 3],
    [992, 4],
    [1200, 5],
    [1900, 6]
]

const GuestBookWrapper = styled.div`
    display: block;  
    text-align: left;
    position: relative;
    
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
    border-radius: 9px 9px 5px 5px;
    padding: 2px;

`;

const SignatureDiv = styled.div`
    font-family: Ink Free, cursive;
    font-size: .9em;
    color: white;
    padding: .4em;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
`;

const CompanyDiv = styled.div`
    font-family: serif;
    color: #dedede;
    padding: .1em .5em;
    font-size: .7em;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;

`;

const CenterDiv = styled.div`
    display: block;
    width: 100%;
    margin-top: 50px;

    p {
        margin-left: 2em;
    }
`;

const LoadMoreButton = styled.button`
    display: inline-block;
    
    margin: 5px;

    border-radius: 9px;
    padding: 5px 15px;
    color: black;
    background-color: #A68181;
    border: black 1px solid;
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
    "http://localhost:8080/portfolio" : "https://idontchop.com/portfolio-war";

class GuestBook extends React.Component {

    constructor(props) {
        super(props);

        console.log("GuestBook loaded")
        this.state = {isLoading: true };
        
        this.state.displayAmount = 
            numToDisplay.filter ( i => window.innerWidth < i[0])
            .reduce ( (a,b) =>  (a[0] < b[0]) ? a : b  )[1];

            console.log(this.state.displayAmount);
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

    resetVisitors () {
        this.setState({displayAmount: numToDisplay.filter ( i => window.innerWidth < i[0])
            .reduce ( (a,b) =>  (a[0] < b[0]) ? a : b  )[1]})
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
            console.log(this.state.data);
            let i = this.state.data.findIndex ( e => e.id === id );
            console.log(guest,i);

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
        return (
            <CenterDiv>
                <p>If you made it this far, Please take a moment to sign my <b>Guest Book</b>! </p>
            <GuestBookWrapper > 
            { this.state.isLoading && <Loading />}
            {!this.state.isLoading && this.state.data
                .filter ( visitor => visitor.publish )  // publish could have false if user unpublishes
                .slice(0,this.state.displayAmount)
                .map ( ( visitor ) => 
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

            <div style={{textAlign: "center", display: "block"}}>
            { !this.state.isLoading &&
                this.state.data.length !== this.state.displayAmount &&
                <LoadMoreButton onClick={() => this.loadMoreVisitors()}>Show More Visitors</LoadMoreButton>}
            { !this.state.isLoading && this.state.displayAmount > 6 &&
                <LoadMoreButton onClick={() => this.resetVisitors()}>X</LoadMoreButton>}
            </div>

            <ShowUser portfolioUrl={portfolioUrl} />
            
            </GuestBookWrapper>

            </CenterDiv>
        );

    }
}

export default GuestBook;