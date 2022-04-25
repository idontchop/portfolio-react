import React from 'react'
import styled from 'styled-components'
import Donkey from '../images/Donkey.png'
import Gear from '../images/geargraphic.png'

const Slide = styled.div`
width: 100%;
height: 33vh;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(255, 255, 255,0.5);

img {
    display: block;
    max-height: 80%;
    width: auto;

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
    border: 2px #5e3d22 solid;
    margin: auto 5px;
`

const Idc = (props) => {

    return <>
        {!props.slide && <Slide>{props.children}</Slide>}
        {props?.slide === "1" && <Slide>
        <div className="sectionBody d-flex justify-content-center align-items-stretch flex-column">
                <h1><a href="https://idontchop.com">I Don't Chop.com</a></h1>
                <h4>Provides Strategies and Math Tools to Poker Players.</h4>
            </div>           
            </Slide>}   
        {props?.slide === "2" && <Slide>
        <div className="sectionBodyInsert d-flex flex-grow-1 align-items-center justify-content-center"><img className="img-fluid" src={Donkey} /></div>
            <div className="sectionBodyInsert d-flex flex-grow-1 ">
                <Bubbble>
                <h3>Free Poker Tools</h3>
                <ul>
                    <li><p>ICM Tournament Chop Calculation</p></li>
                    <li><p>Hand Range Matchup Equity Evaluations (EV)</p></li>
                    <li><p>Progressive Web App</p></li>
                    <li><p>Beta: <a href="https://beta.idontchop.com">beta.idontchop.com</a></p></li>
                </ul>
                </Bubbble>
            </div>
            
            </Slide>}
        {props?.slide === "3" && <Slide>
            <div className="sectionBodyInsert d-flex flex-grow-1 ">
                <Bubbble>
                <h3>Poker Gear</h3>
                <p>Sponsor IDontChop by wearing poker gear available on Amazon.</p>
                </Bubbble>
            </div>
            <div style={{padding: "20px"}} className="sectionBodyInsert d-flex flex-grow-1 align-items-center justify-content-center">
                <img className="img-fluid" src={Gear} />
            </div>
            
            </Slide>}                      
    </>
}

export default Idc