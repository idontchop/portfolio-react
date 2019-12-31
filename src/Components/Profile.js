import React from 'react';
import styled from 'styled-components';

const ProfileWrapperDiv = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 9px;
    background-image: ${props => `url(/portfolio/image/${props.media[0].id});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 2px;
    opacity: .8;
    `}
`;

const Profile = (props) => (
    <div>
        <ProfileWrapperDiv {...props}>
            {props.id} - {props.profile.name} - {props.media[0].id}
        </ProfileWrapperDiv>
    </div>
);

export default Profile;

