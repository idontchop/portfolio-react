import React from 'react';
import GuestBook from './GuestBook.js';
import './App.css';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Welcome} from './Components/Welcome'
import Header from './Components/Header'
import {Presentation, ConfigurableSlide} from 'react-scroll-presentation'

import PresentationHeader from './Presentation/PresentationHeader'


function App() {
  return (
  <div style={{maxWidth: '1024px', margin: "auto"}}>
    <Presentation fullScreen>

        {/*<Header />*/}
        {/*<div class="h1Div">
          <h2 class="introSpace"> return experiencedDeveloper() <span class="indentH1">.flatMap ( addMSDA() )</span> <span class="indentH1">.flatMap ( addDevOps() )</span> <span class="indentH1">.doOnSuccess ( disruptiveProduct() )</span> </h2>
        </div>*/}
      <ConfigurableSlide title="Welcome" fadeOut={{hold: 2}}>
        <Welcome />
      </ConfigurableSlide>
      <ConfigurableSlide header>
        <PresentationHeader title="header" />
      </ConfigurableSlide>
    </Presentation>


    <div className="pageSection2">
    <div className="sectionBody">
      <div className="sectionHeader container dateTheme">
        <div className="sectionHeaderH2Wrapper">
          <h2><a name="GuestBook"></a>Guest Book</h2>
        </div>
        <p>Please take a momemnt to sign my <b>Guest Book</b>. Even if I don't fit the position you are filling, by leaving your
        name, it might help me appear more legitimate to the next recruiter!</p>
      </div>
          <GuestBook />
        
      </div>
    </div>


  </div>
  );
}

export default App;
