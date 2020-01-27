import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingImg = 'https://idontchop.com/images/Spinning_React.gif';

const wiggle = keyframes`

   
    10% {
        transform: translateX(-50px);
    }

    30% {
        transform: translateX(50px);
    }

    50% {
        transform: translateX(-25px);
    }

    70% {
        transform: translateX(15px);
    }

    90% {
        transform: translateX(10px);
    }
`;
const LoadingImg = styled.img`
    width: ${props => props.size === 'small' ? '80px' : '200px'};
    height: ${props => props.size === 'small' ? '80px' : '200px'};
    content: url(${loadingImg});
    animation: ${wiggle} 2s infinite ease-in-out;
`;

const LoadingDiv = styled.div`
    margin: 10px auto;
    width: ${props => props.size === 'small' ? '80px' : '200px'};
    height: ${props => props.size === 'small' ? '80px' : '200px'};
`;

const Loading = (props) => {

    return (
        <LoadingDiv {...props}>
            <LoadingImg {...props} />
        </LoadingDiv>
    )
}

export default Loading;