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
    opacity: .7;
    `}
`;



const OnHoverDiv = styled.div`
    margin-left: -4px;
    padding: 18px;
    height: 150px;
    width: 155px;
    display: block;
    
    background-color: rgb(134, 136, 139, 0.5);
`;

const smImg = styled.img`
    width: 50px;
    height: 50px;
    opacity: 1;
    animation: ${keyFrameFadeIn} ${props => props.trans}s ease-in-out;    
    margin: auto;`;

const FacebookImg =  styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -10px -7px;
`;

const LinkedinImg = styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -77px -7px;
`;

const GithubImg = styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -143px -7px;
`;

const TwitterImg = styled(smImg)`
    background: url("https://idontchop.com/images/portfolio-circles-export.png") -10px -62px;
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

    //console.log(linkSm.count, linkSm.remainingSites.length)
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
    return (
        <a href={props.profile[index]}>
            {switchCase[index]({trans: transValue})}
        </a>
        
    );
    
}




const Profile = (props) => {

    let pwref = React.createRef()

    const [hover, setHover] = useState(false);

    // Fuck this, gonna need a workaround that puts the ProfileOnHover in a popup
 
    // necessary to stop touch bubbling on touch devices
    return (
    <div>
        <ProfileWrapperDiv ref={pwref} {...props} 
            
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {hover && <ProfileOnHover {...props} /> }
        </ProfileWrapperDiv>
    </div>
    )
};

const ProfileOnHover = (props) => {

    // if no urls, we don't want to show anything
    if ( smSites.filter ( (v) => {return !!props.profile[v]}).length === 0) return <div></div>
    return (
        <OnHoverDiv>
            {linkSm(0) /* resets static counters: new profile */ }
            <div className={"row"} style={{paddingBottom: "7px"}}>
                <div className={"col-6"}>
                    {linkSm(props)}                
                </div>
                <div className={"col-6"}>
                    {linkSm(props)} 
                </div>                    
            </div>
            <div className={"row"}>
                <div className={"col-6"}>
                    {linkSm(props)} 
                </div>
                <div className={"col-6"}>
                    {linkSm(props)} 
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-12"}>
                    
                </div>
            </div>
        </OnHoverDiv>
    );
};



export default Profile;

