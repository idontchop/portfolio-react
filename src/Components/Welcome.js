import React from 'react'
import profile_pic from '../images/profile_pic.jpg'
import appdist_pic from '../images/appdist.png'
import architecture_pic from '../images/architecture-03.jpg'
import react_pic from '../images/react.jpg'

export const Welcome = () => {

return <div className="pageSection2">
<div className="sectionBody">
  <div className="container-fluid">
    <div className="row">
      {/*<div className="col-md-6">
        <div className="videoContainer">
          <video width="100%" height="100%" controls> 
            <source src="https://idontchop.com/videos/opening.mp4" type="video/mp4" />
            Video Alt Display </video>
        </div>
      </div>*/}
      <div className="col-sm-6 text-center leftSlideIn06s"> 
        <img src={profile_pic} className="imgProfile" />
        <p><b>Nathan Dunn</b></p>
        <p>Full Stack Developer/Architect</p>
      </div>
      <div className="col-sm-6 sectionBodyInsert p-0 rightSlideIn08s"> 
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-6">
              <img src={architecture_pic} className="imgHighlight" />
            </div>
            <div className="col-6">
              <h4>Backend</h4><p>Cloud/Service Design & Development</p>
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
</div>
}