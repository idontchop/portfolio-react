import React from 'react'
export const Welcome = () => {

return <div className="pageSection2" style={{height: "100vh"}}>
<div className="sectionHeader container dateTheme">
  <div className="sectionHeaderH2Wrapper">
    <h2>Welcome!</h2>
  </div>
</div>
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
      <div className="col-md-6"> 
        <p>Hello, my name is <b>Nathan Dunn</b>, I'm a Software Developer from Las Vegas, Nevada.</p>
        <p>My experience on web apps ranges from the browser (React) to the bare metal Linux machine
          running Docker, and everything in between.</p>
          <ul>
            <li><a href="#GuestBook">Guest Book</a></li>
            <li><a href="#Projects">Current Projects</a></li>
            <li><a href="#Skills">Skills and Experience</a></li>
          </ul>
          <ul>
          <li className="listContact">Nate at I Don't Chop</li>
          <li className="listContact"><a href="https://www.linkedin.com/in/idontchop/">@idontchop</a></li>
          </ul>
      </div>
    </div>
  </div>
</div>
</div>
}