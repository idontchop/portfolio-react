import React, {useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import GithubIcon from '../images/github.svg';
import FacebookIcon from '../images/facebook.svg';
import LinkedinIcon from '../images/linkedin.svg';

const keyFrameFadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

/**
 * Looped through in function linkSm to display the user's url
 */
const smSites = ["facebook", "linkedin", "twitter", "github"];

/**
 * The transparent image for our icon sprite
 */
const timg = "https://idontchop.com/images/img-trans.gif";

const ProfileWrapperDiv = styled.div`
    width: 150px;
    max-width: 150px;
    height: 150px;
    border-radius: 9px;
    background-image: ${props => 
        `url(${props.portfolioUrl}/image/${!!props.media[0] ? props.media[0].id + "?" + props.media[0].created : ""});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 2px 0;
    opacity: .95;
    position: relative;
    `}
`;
const OnHoverDiv = styled.div`
    margin-left: 0px;
    margin-bottom: -1px;
    height: 32px;
    width: 155px;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 11px 12px 0 0;
    opacity: .95;
    
    background-color: rgb(172, 176, 181, 0.55);
    #background-color: rgb(134, 136, 139, 0.65);
`;

const TopDiv = styled.div`
    padding-top: 0px;
    text-align: right;
`;

const TopDivP = styled.span`
    background-color: rgb(172, 176, 181, 0.85);
    padding: 5px 7px 3px 7px;
    font-size: 0.9em;
    color: white;
    text-shadow: #000 1px 1px 0px, #000 1px 1px 0px;
    font-family: "Ink Free", "Kalem", cursive, script;
    border-radius: 0 9px;
    #background-color: rgb(134, 136, 139, 0.85);
`;


const smImg = styled.img`
    width: 30px;
    height: 31px;
    opacity: 1;
    animation: ${keyFrameFadeIn} ${props => props.trans}s ease-in-out;    
    margin: auto;`;

const FacebookImg =  styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -5px -4px;
`;

const LinkedinImg = styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -46px -4px;
`;

const GithubImg = styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -85px -3px;
`;

const TwitterImg = styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -5px -37px;
`;

/**
 * Returns the social site link if user has
 */
const linkSm = (props) => {
    
    // each count returns different transitions,
    // so icons appear to go left to right, top to bottom
    // 0, 2 = opening row
    // 1, 3 = closing row
    if ( typeof linkSm.count == 'undefined' || props === 0) {
        linkSm.count = 0;
    }

    if ( typeof linkSm.remainingSites == 'undefined' || props === 0) {
        linkSm.remainingSites = smSites;
    }

    if (props === 0) return;

    // the image we may need to return
    const switchCase = {
        "facebook": (props) => <FacebookImg src={timg} {...props} />,
        "linkedin": (props) => <LinkedinImg src={timg} {...props} />,
        "github": (props) => <GithubImg src={timg} {...props} />,
        "twitter": (props) => <TwitterImg src={timg} {...props} />
    }

    // reduces the list of social sites until we've used all the user's profile
    linkSm.remainingSites = linkSm.remainingSites.filter ( (v, i) => {
        return !!props.profile[v];
    });

    // break out check. if none of these are true, we will be returning an img component
    if ( linkSm.count > 3 || linkSm.remainingSites.length === 0) {
        return <div></div>
    }

    /* this pops out the first site which is used now 
       Sets transition value for the image.
    */
    let index = linkSm.remainingSites[0];
    linkSm.remainingSites.shift();
    let transValue = linkSm.count * .6;
    linkSm.count++;
    
    // Returns Single Social Icon
    return (
        <a href={props.profile[index]}>
            {switchCase[index]({trans: transValue})}
        </a>        
    );
    
}

const lastVisited = (date) => {

    console.log("date: ", date);
    let sec = Math.floor( (new Date() - new Date(date) ) / 1000 );

    // years
    let interval = sec / 31536000 ;
    if ( interval >= 1 ) {
        return addS(interval, "year");
    }

    // months
    interval = sec / 2592000;
    if ( interval >= 1 ) {
        return addS(interval, "month");
    }

    // days
    interval = sec / 86400;
    if ( interval >= 1 ) {
        return addS(interval, "day");
    }

    // hours
    interval = sec / 3600;
    if ( interval >= 1 ) {
        return addS(interval, "hour");
    }

    // days
    interval = sec / 60;
    return addS(interval, "minute");

}

const addS = (i,s) => {
    return  Math.floor(i) + " " 
    + ( ( Math.floor(i) > 1 ) ? s + 's' : s )
    + " ago";
}



const Profile = (props) => {

    let pwref = React.createRef()

    return (
    <div>
        <ProfileWrapperDiv ref={pwref} {...props}>
            <TopDiv><TopDivP>{lastVisited(props.created)}</TopDivP></TopDiv>
            <ProfileOnHover {...props} />
        </ProfileWrapperDiv>
    </div>
    )
};

const ProfileOnHover = (props) => {

    // if no urls, we don't want to show anything
    if ( smSites.filter ( (v) => {return !!props.profile[v]}).length === 0) return <div></div>

    return (

        <OnHoverDiv className={"container-fluid"}>
            {smPopMenu(props)}
        </OnHoverDiv>

    );
    
};

const smPopMenu = (props) => {
        linkSm(0);
    return (
        <div className={"row no-gutters"}>
            <div className={"col-3"}>
                {linkSm(props)}                
            </div>
            <div className={"col-3"}>
                {linkSm(props)} 
            </div>                    
            <div className={"col-3"}>
                {linkSm(props)} 
            </div>
            <div className={"col-3"}>
                {linkSm(props)} 
            </div>
        </div>
    );
}



export default Profile;

