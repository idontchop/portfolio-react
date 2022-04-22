import React from 'react'
import LoveMireBackDrop from '../images/LoveMireBackDrop.png'
import styled from 'styled-components'

import LoveMire1 from '../images/lovemire-1.png'
import LoveMire2 from '../images/lovemire-2.png'

const Slide = styled.div`
    width: 100%;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255,0.5);

    img {
        display: block;
        max-height: 80%;
        width: auto;
        -webkit-box-shadow: 0px 0px 14px 9px #707070; 
        box-shadow: 0px 0px 14px 9px #707070;  
    }

    div {
        height: 100%;

        div {
            height: auto;
        }
    }
`

const Bubbble = styled.div`
    padding: 2px 10px;
    height: auto;
    display: inline-block;
    background-color: white;
    border-radius: 10px;
    border: 2px rgb(202, 181, 181) solid;
    margin: auto;
`

const LoveMire = (props) => {


    return <>
        {!props.slide && <Slide>{props.children}</Slide>}
        {props?.slide === "1" && <Slide>
            <div className="sectionBody d-flex justify-content-center align-items-stretch flex-column">
                <h1>Project: Lovemire</h1><h4>Production name: Flirvy</h4>
            </div>
            </Slide>}
        {props?.slide === "2" && <Slide>
            <div className="sectionBodyInsert d-flex flex-grow-1 align-items-center justify-content-center"><img className="img-fluid" src={LoveMire1} /></div>
            <div className="sectionBodyInsert d-flex flex-grow-1 ">
                <Bubbble>
                <h3>Free to Browse</h3>
                <h3>Pay to Win</h3>
                <p>Incentives to:</p>
                <ul>
                    <li>Post Media Regularly</li>
                    <li>Reply to contacts</li>
                    <li>Browse multiple geographic areas</li>
                </ul>
                </Bubbble>
            </div>
            
            </Slide>}    
        {props?.slide === "3" && <Slide>
        <div className="sectionBodyInsert d-flex flex-grow-1 ">
                <Bubbble>
                <h3>Media Interactions</h3>
                <ul>
                    <li>Like</li>
                    <li>Admire</li>
                    <li>Gift</li>
                </ul>
                </Bubbble>
            </div>
            <div className="sectionBodyInsert d-flex flex-grow-1 align-items-center justify-content-center"><img className="img-fluid" src={LoveMire2} /></div>
            </Slide>}    
        {props?.slide === "4" && <Slide>
            <div className="sectionBody d-flex justify-content-center align-items-stretch flex-column">
                <h1>Seeking: </h1>
                <h4>at <a href="https://lovemire.com">LoveMire.com</a></h4>
                <p style={{textAlign: "center"}}>Contributors, Investors, Testers</p>
            </div>
            </Slide>}                              
    </>
}

export default LoveMire