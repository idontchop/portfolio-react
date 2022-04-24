import React from 'react'
import profile_pic from '../images/profile_pic.jpg'
import appdist_pic from '../images/data.png'
import architecture_pic from '../images/backend.png'
import react_pic from '../images/react.png'
import styled from 'styled-components'
import { PresentationContext } from 'react-scroll-presentation'

const ResumeButton = styled.div`
  font-family: "Ink Free", Arial, Helvetica, sans-serif;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 2px 6px;
  background-color: #8fa1bd;
  cursor: pointer;
`

export const Welcome = (props) => {

  const context = React.useContext(PresentationContext)

return <div className="pageSection2">
<div className="sectionBody container">
    <div 
        style={{left: '50%', transform: 'translateX(-50%)',
              position: 'absolute', bottom: '10px',
              cursor: 'pointer'}}
        onClick={() => context.setScrollToSlide('lovemire')}>
      <h5 className="inkfree" 
        style={{display: "inline-block", 
              margin: "0 25px"}}>Current Projects</h5>
      <div className="scroll-down"></div>
      
    </div>
    <div className="row">
      {/*<div className="col-md-6">
        <div className="videoContainer">
          <video width="100%" height="100%" controls> 
            <source src="https://idontchop.com/videos/opening.mp4" type="video/mp4" />
            Video Alt Display </video>
        </div>
      </div>*/}
      <div className="col-md-6 text-center leftSlideIn06s d-flex justify-content-center align-items-center flex-column"> 
        <img src={profile_pic} className="imgProfile" />
        <h4><b>Nathan Dunn</b></h4>
        <h4>Full Stack Developer/Architect</h4>
        <h4>Las Vegas, USA</h4>
        <ResumeButton onClick={() => props.showResume()}>Resume</ResumeButton>
        
      </div>
      <div className="col-md-6 sectionBodyInsert p-0 rightSlideIn08s d-flex justify-content-center align-items-center flex-column"> 
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-6">
              <img src={architecture_pic} className="imgHighlight" />
            </div>
            <div className="col-6">
              <h4>Back End</h4><p>Cloud/Service Design & Development</p>
            </div>    
          </div>
        </div>        
        <div className="container-fluid p-0 rightSlideIn1s">
          <div className="row no-gutters">
            <div className="col-6">
              <img src={react_pic} className="imgHighlight" />
            </div>
            <div className="col-6">
              <h4>Front End</h4><p>Progressive Web App Design & Development</p>
            </div>    
          </div>
        </div>  
        <div className="container-fluid p-0 rightSlideIn12s">
          <div className="row no-gutters">
            <div className="col-6">
              <img src={appdist_pic} className="imgHighlight" />
            </div>
            <div className="col-6">
              <h4>Data Analysis</h4><p>Data Research / Analysis</p>
            </div>    
          </div>
        </div>              
      </div>
  </div>
</div>
</div>
}