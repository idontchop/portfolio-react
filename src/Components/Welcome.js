import React from 'react'
import profile_pic from '../images/profile_pic.jpg'
import appdist_pic from '../images/data.png'
import architecture_pic from '../images/backend.png'
import react_pic from '../images/react.png'

export const Welcome = () => {

return <div className="pageSection2">
<div className="sectionBody container">
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