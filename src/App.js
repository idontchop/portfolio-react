import React from 'react';
import GuestBook from './GuestBook.js';
import './App.css';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Welcome} from './Components/Welcome'
import {Presentation, ConfigurableSlide} from 'react-scroll-presentation'


function App() {
  return (
  <div>
    <Presentation>
      <ConfigurableSlide slideIn>
        <Welcome />
      </ConfigurableSlide>
    </Presentation>

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

  </div>
  );
}

export default App;
