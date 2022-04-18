import React from 'react';
import GuestBook from './GuestBook.js';
import './App.css';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Welcome} from './Components/Welcome'
import Header from './Components/Header'
import {Presentation, ConfigurableSlide} from 'react-scroll-presentation'


function App() {
  return (
  <div>
    <Presentation fullScreen>

        {/*<Header />*/}
        {/*<div class="h1Div">
          <h2 class="introSpace"> return experiencedDeveloper() <span class="indentH1">.flatMap ( addMSDA() )</span> <span class="indentH1">.flatMap ( addDevOps() )</span> <span class="indentH1">.doOnSuccess ( disruptiveProduct() )</span> </h2>
        </div>*/}
      <ConfigurableSlide title="Welcome" fadeOut>
        <Welcome />
      </ConfigurableSlide>
      <ConfigurableSlide alternateSlideIn>
        <Welcome />
        <Welcome />
      </ConfigurableSlide>
    </Presentation>

    <main>
    <div className="pageSection2">
      <div className="sectionHeader container dateTheme">
        <div className="sectionHeaderH2Wrapper">
          <h2><a name="GuestBook"></a>Guest Book</h2>
        </div>
      </div>
      <div className="sectionBody">
          

        <p>Please take a momemnt to sign my <b>Guest Book</b>. Even if I don't fit the position you are filling, by leaving your
        name, it might help me appear more legitimate to the next recruiter!</p>
          <GuestBook />
        
      </div>
    </div>
    </main>

  </div>
  );
}

export default App;
