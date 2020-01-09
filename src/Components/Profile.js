import React from 'react';
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

const ProfileWrapperDiv = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 9px;
    background-image: ${props => `url(${props.portfolioUrl}/image/${props.media[0] && props.media[0].id});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 2px;
    opacity: .7;
    `}
`;

const OnHoverWrapperDiv = styled.div`
    margin-left: -4px;
    padding: 18px;
    height: 150px;
    width: 155px;
    
    background-color: rgb(134, 136, 139, 0.5);
`;

const smImg = styled.img`
    width: 50px;
    height: 50px;
    opacity: 1;
    animation: ${keyFrameFadeIn} 1s ease-in-out;
    margin: auto;`;

const FacebookImg = styled(smImg)`
    background: url("http://idontchop.com/images/portfolio-circles-export.png") -10px -7px;
`;

const LinkedinImg = styled(smImg)`
    background: url("http://idontchop.com/images/portfolio-circles-export.png") -77px -7px;
`;

const GithubImg = styled(smImg)`
    background: url("http://idontchop.com/images/portfolio-circles-export.png") -143px -7px;
`;

const TwitterImg = styled(smImg)`
    background: url("http://idontchop.com/images/portfolio-circles-export.png") -10px -62px;
`;




const Profile = (props) => (
    <div>
        <ProfileWrapperDiv {...props}>
            <ProfileOnHover {...props} />
        </ProfileWrapperDiv>
    </div>
);

const ProfileOnHover = (props) => (
    <OnHoverWrapperDiv>
        <div className={"row"} style={{paddingBottom: "7px"}}>
            <div className={"col-6"}>
                <FacebookImg src={"http://idontchop.com/images/img-trans.gif"} />
            </div>
            <div className={"col-6"}>
                <LinkedinImg src={"http://idontchop.com/images/img-trans.gif"} />
            </div>                    
        </div>
        <div className={"row"}>
            <div className={"col-6"}>
                <GithubImg src={"http://idontchop.com/images/img-trans.gif"} />
            </div>
            <div className={"col-6"}>
                <TwitterImg src={"http://idontchop.com/images/img-trans.gif"} />
            </div>
        </div>
        <div className={"row"}>
            <div className={"col-12"}>
                
            </div>
        </div>
    </OnHoverWrapperDiv>
);



export default Profile;

