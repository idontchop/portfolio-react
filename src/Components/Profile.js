import React from 'react';
import styled from 'styled-components';

const ProfileWrapperDiv = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 9px;
    background-image: ${props => `url(${props.portfolioUrl}/image/${props.media[0].id});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 2px;
    opacity: .9;
    `}
`;

const Profile = (props) => (
    <div>
        <ProfileWrapperDiv {...props}>
            
        </ProfileWrapperDiv>
    </div>
);

export default Profile;

