import React from 'react'
import styled from 'styled-components'

const Outer = styled.div`
    width: 100%;
    height: 100%;
    opacity: 1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.7);
`

const Inner = styled.div`
    width: 90%;
    height: 90%;
    overflow-y: scroll;
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    opacity: 1;
    background-color: rgba(255,255,255,1);

    &::-webkit-scrollbar {
        width: 9px;
    }
      
    &::-webkit-scrollbar-track {
      background: #707070;
      border-radius: 5px;
    }
      
    &::-webkit-scrollbar-thumb {
      background-color: #8fa1bd; 
      border-radius: 20px;
      border: 1px solid black;
    }
`

const CloseButton = styled.button`
    z-index: 101;
    background-color: #8fa1bd;
    position: absolute;
    top: 0; right: 0;
    border-radius: 5px;
    outline: none;
    margin: 5px;
`

const ResumeModal = (props) => {

    return (
        <Outer onClick={() => console.log("click")}>
            <CloseButton onClick={() => props.onClose()}>✗</CloseButton>
            <Inner onClick={(e) => e.stopPropagation()}>
            
                {props?.children && props.children}
            </Inner>
        </Outer>
    )
}

export default ResumeModal