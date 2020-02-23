import React from 'react';
import styled from 'styled-components';

const ModalDiv = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(134,136,134,0.6);
    z-index: 99;
`;

const InnerDiv = styled.div`
    margin: auto;
`;

const HeaderDiv = styled.div`
    width: 100%;
    background-color: black;
    text-align: right;
`;

const CloseButton = styled.button`
    border: 2px solid grey;
`;

const withFullScreenModal = (close, Component, constraints) => {

    const onInnerClick = (e) => {
        e.stopPropagation();
        console.log("inner click")
    }
    return <ModalDiv onClick={() => close()}>
            <InnerDiv onClick={(e) => onInnerClick(e)} style={constraints}>
            <HeaderDiv>
                <CloseButton onClick={() => close()}>X</CloseButton>
            </HeaderDiv>
            {Component}
            </InnerDiv>
        </ModalDiv>
}

export default withFullScreenModal;