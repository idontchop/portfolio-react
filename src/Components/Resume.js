import React from 'react'

import appdist_pic from '../images/fcp.png'
import tallmountain from '../images/tall-mountain.jpg'

const Resume = (props) => {

    return (
        <div class="pageSection1">

        {/*<div class="sectionHeader sectionHeader2 container">
          <div class="sectionHeaderH2Wrapper">
            <h2><a name="Skills"></a>About Nathan Dunn</h2>
          </div>
        </div>*/}

        <article class="resume">
            
         <div class="projectSeperator container-fluid">
          <div class="row">
              <div class="col-12">
              <h2>Skills</h2>
              </div>
              <div class="col-md-6">
                  <h4>Strong Languages</h4>
                  <p>Java, Javascript / Typescript, C, SQL</p>
                  <h4>Experienced Languages</h4>
                  <p>Python, C++, R, PHP, SAS, NoSQL</p>
                  <h4>Dabbling in...</h4>
                  <p>Rust</p>
              </div>
              <div class="col-md-6">
                  <h4>Strong Tech/Frameworks</h4>
                  <p>Spring (Reactive), React</p>
                  <h4>Experienced Tech/Frameworks</h4>
                  <p>Node (MERN), Conda, Docker, Jenkins, LAMP, Wordpress, Bootstrap, Tableau, Adobe Cloud (PS, AI, PR, XD) </p>
                  <h4>Notable Libraries with experience</h4>
                  <p>Spring Security/Cloud, Styled-Components, React-spring, Storybook, Rollup</p>
              </div>
      
             </div>
         </div>
         <div class="projectSeperator container-fluid">
             <hr />
          <div class="row">
              <div class="col-12">
              <h2>Education</h2>
              </div>
              <div class="col-md-6">
                  <h4>BSIT - Software Development</h4>
                  <p class="text-center">Western Governor's University - 2019</p>
              </div>
              <div class="col-md-6">
                  <h4>MS - Data Analytics</h4>
                  <p class="text-center">Western Governor's University - 2020</p>
              </div>
      
             </div>
         </div>
          
            
          <div class=" projectSeperator container-fluid">
              <hr />
            <div class="row">
            <div class="col-12">
              <h2>Some Current and Past Projects</h2>
              </div>
              <div class="col-sm-6">
                <h3> Early work... </h3>
                <h4>Farmers and Kings <a href="https://github.com/idontchop/fk-cpp"><img src="https://www.idontchop.com/portfolio/images/GitHub-Mark-120px-plus.png" 
                 class="img-fluid imgLogo"
				 alt="Github logo" /></a></h4>
                <p> <img src="https://www.idontchop.com/wp-content/uploads/2018/07/pomdir.ans_-300x173.png"
                            class="rounded mx-auto d-block img-fluid" alt="Farmers and Kings ANSI Door Game artwork" /> </p>
      
                <p>BBS Door Game written in mid-90s as a middle school student. Sold over 50 copies!</p>
                <h4>Crypto Pull <a href="https://github.com/idontchop/crypto_exchange_rate_pull_py"><img src="https://www.idontchop.com/portfolio/images/GitHub-Mark-120px-plus.png" 
                 class="img-fluid imgLogo"
				 alt="Github logo" /></a></h4>
                <p>2013-2014: Personal project to pull crypto exchange rates seeking discrepancies in bid/ask.</p>
                <h4>Ipulse Communications </h4>
                <p><b>Founder / CEO </b> Built a web hosting company in high school starting with a single Linux server, eventually managing over 40 servers, hundreds of customers, and 4 employees. Sold the company to NationalNet Inc in December 2002 and managed the transfer of digital and hardware assets.</p>
                <h4>Parametric Analysis Cookie Apps <a href="https://github.com/idontchop/cookie-compliance-ux-report"><img src="https://www.idontchop.com/portfolio/images/GitHub-Mark-120px-plus.png" 
                 class="img-fluid imgLogo"
				 alt="Github logo" /></a></h4>
                 <p> <img src={appdist_pic}
                            class="rounded mx-auto d-block img-fluid" alt="Farmers and Kings ANSI Door Game artwork" /> </p>
                <p>Masters Paper 2020: Utilized Google's BigQuery to study affects of cookie compliance 3rd-party apps on web site loading.</p>
                <p>Discovered no statistical significance in First Contentful Paint times. Onload times were affected.</p>
              </div>
      
              <div class="col-sm-6">
                <h3> Recent work... </h3>
                <h4>Project LoveMire <a href="https://lovemire.com" style={{float: "right"}}>🔗</a></h4>      
                <p>Dating App designed as a fusion between media browsing and companion seeking.</p>
                <p>Responsible for designing and developing cloud architecture up to and including public beta.</p>
                <p>Responsible for initial front end PWA design until investment / contributors obtained.</p>
                <h4>I Dont Chop <a href="https://idontchop.com" style={{float: "right"}}>🔗</a></h4>      
               <p>Full Stack Development (React + Spring Boot) of free poker tools app. Designed to appeal to recreational poker players and tournament directors.</p>
                <h4>react-scroll-presentation <a href="https://github.com/idontchop/react-scroll-presentation"><img src="https://www.idontchop.com/portfolio/images/GitHub-Mark-120px-plus.png" 
                 class="img-fluid imgLogo"
				 alt="Github logo" /></a></h4>      
                <p>React module that eases the creation of scrolling presentations in Web Apps.</p>
                <h4>node-online-service <a href="https://github.com/idontchop/node-online-service"><img src="https://www.idontchop.com/portfolio/images/GitHub-Mark-120px-plus.png" 
                 class="img-fluid imgLogo"
				 alt="Github logo" /></a></h4>      
                <p>Node + MongoDB service that can plug into an Event-Driven architecture to track online users based on event key.</p>                
                <h4>portfolioChat <a href="https://github.com/idontchop/portfolioChat"><img src="https://www.idontchop.com/portfolio/images/GitHub-Mark-120px-plus.png" 
                 class="img-fluid imgLogo"
				 alt="Github logo" /></a></h4>      
                <p>Spring Boot / SQL service that manages a simple two-way chat with websockets.</p>
              </div>

              <div class="col-12">
              <h2>About Me</h2>
              </div>    
              <div class="col-4">
                  <div style={{position: "sticky", top: 0}}>
                    <img src={tallmountain} class="img-fluid" style={{marginTop: '50px'}} alt="Everest Base Camp Trek" />
                  </div>
              </div>    
              <div class="col-8">
                  <ul>
                      <li style={{marginBottom: "25px"}}>I've always enjoyed dabbling and creating. It has led me to have a wide range of exposure to various software and languages, careers and mindsets. </li>
                      <li style={{marginBottom: "25px"}}>Passion for Traveling & Outdoors. Destinations include 5 continents. Most proud of trek to Everest Base Camp / Three Passes completion.</li>
                      <li style={{marginBottom: "25px"}}>I enjoy investing. Stocks and otherwise. Though my skills in this arena were mostly wasted and an index fund would have returned just as well.</li>
                      <li style={{marginBottom: "25px"}}>Adobe Creative Cloud is a hobby. Improving image quality, video editing (<a href="https://www.youtube.com/watch?v=U2twbPHdP2c&t=141s">example</a>), and ebook covers are some of my interests. I don't consider myself a great artist, certainly not good enough to be employed creatively, though the hobby helps in app design.</li>

                  </ul>

              </div>
                          

            </div>
          </div>
        </article>

      </div>)
}

export default Resume