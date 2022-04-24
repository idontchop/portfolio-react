import React from 'react';
import PortfolioApi from './lib/PortfolioApi.js';
import GuestBook from './GuestBook.js';
import ResumeModal from './Components/ResumeModal'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './style.css'
import {Welcome} from './Components/Welcome'
import Resume from './Components/Resume'
import {PresentationHeader} from './Presentation/Header';
import {Presentation, ConfigurableSlide} from 'react-scroll-presentation'

import LoveMire from './Presentation/LoveMire.js';
import Idc from './Presentation/Idc.js'
import { standard, night } from "./themes/themes.js";
import ThemeToggle from './Components/ThemeToggle';

import styled, { ThemeProvider } from 'styled-components'
import LoveMireBackDrop from './images/LoveMireBackDrop.png'
import IDontChopBackDrop from './images/IDontChopBackDrop.png'

function App() {

  const [theme, setTheme] = React.useState("standard")
  const [showResumeModal, setShowResumeModal] = React.useState(false)





  React.useEffect( () => {
    if(theme === "night") {
      document.body.style.backgroundColor = "#222"
    } else {
      document.body.style.backgroundColor = "#FFF"
    }
  },[theme])

  React.useEffect( () => {
    // fire and forget
    PortfolioApi.postJson('hit', {name: 'portfolio', message: navigator.userAgent})
      .catch ( e => {console.log("Error saving hit.")})

  },[])

  return (<>
  <ThemeProvider theme={theme === "night" ? night : standard}>
  <div style={{maxWidth: '1024px', margin: "auto"}}>
  {/*<ThemeToggle onClick={ () => setTheme( (theme === "night") ? "standard" : "night")}
    useStandardTheme={!(theme === "night")} />*/}
  
    <Presentation fullScreen>

        {/*<Header />*/}
        {/*<div class="h1Div">
          <h2 class="introSpace"> return experiencedDeveloper() <span class="indentH1">.flatMap ( addMSDA() )</span> <span class="indentH1">.flatMap ( addDevOps() )</span> <span class="indentH1">.doOnSuccess ( disruptiveProduct() )</span> </h2>
        </div>*/}
      <ConfigurableSlide title="Welcome" fadeOut={{hold: 2}}>
        <Welcome showResume={() => setShowResumeModal(true)} />
      </ConfigurableSlide>
      <ConfigurableSlide header>
        <PresentationHeader title="header" />
      </ConfigurableSlide>
      <ConfigurableSlide title="lovemire"
        alternateSlideIn={{scrollViewPort: true, fullScreen: true, 
        background: LoveMireBackDrop,
        scrollSpeed: 4}}>
        <LoveMire slide="1" />
        <LoveMire slide="2" />
        <LoveMire slide="3" />
        <LoveMire slide="4" />
      </ConfigurableSlide>
      <ConfigurableSlide title="idc"
        alternateSlideIn={{scrollViewPort: true, fullScreen: true,
          background: IDontChopBackDrop, 
        scrollSpeed: 4}}>
        <Idc slide="1"/>
        <Idc slide="2"/>
      </ConfigurableSlide>     
      <ConfigurableSlide springIn title="guestbook">
      <div className="pageSection2">
      <div className="sectionBody">
        <div className="sectionHeader container">
          <div className="sectionHeaderH2Wrapper">
            <h2><a name="GuestBook"></a>Guest Book</h2>
          </div>
          <GuestBook />
        </div>
      </div>
    </div>

        </ConfigurableSlide>
    </Presentation>

  

    {/*<Presentation fullScreen>
      <ConfigurableSlide header >

          <div className="sectionHeader">
            <div className="sectionHeaderH2Wrapper">
              <h2><a name="GuestBook"></a>Guest Book</h2>
            </div>            
          </div>

      </ConfigurableSlide>
      <ConfigurableSlide slideIn={{hold: 1}}>
        <GuestBook />
      </ConfigurableSlide>
        </Presentation>*/}

    <Presentation fullScreen>
      <ConfigurableSlide header >

        <div className="sectionHeader">
          <div className="sectionHeaderH2Wrapper">
            <h2><a name="GuestBook"></a>About Nathan Dunn</h2>
          </div>            
        </div>

      </ConfigurableSlide>  
      <Resume />
    </Presentation>
    {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)}>
      <Resume />
    </ResumeModal>}
    </div>
    </ThemeProvider>
  </>
  );
}

export default App;
