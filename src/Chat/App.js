import React, {useState, useEffect} from 'react';
import PortfolioChatApi from './lib/PortfolioChatApi.js';
import styled from 'styled-components';
import MessageThreadHead from './Components/MessageThreadHead.js';
import PropTypes from 'prop-types';

const ChatDiv = styled.div`
    position: fixed;
    border: 2px black solid;
    background-color: white;
    display: inline-block;
    max-width: 360px;
    top: 200px;
    left: 0px;
    z-index: 9;
`;

/**
 * Chat module will be designed to be easily portable to another
 * app. Receives function in props: user
 * This will be displayed in the position of the chat head and should
 * receive an argument id=?
 * 
 * @param {} props 
 */
const App = (props) => {

    const [ob, setOb] = useState({});
    const [messageThreads, setThreads] = useState({});
    const [loading, setLoading] = useState(true);


    const gg = async () => {
        let obj = await PortfolioChatApi.getJson("messageThreads");
        setOb(obj)
        setLoading(false)
    }

    const contact = async (id) => {
        try {
            let formData = new FormData();
            formData.append("id",id);
            let obj2 = await PortfolioChatApi.postForm("newThread",formData);
            console.log(obj2);

        } catch (err) {
            console.log(err)
        }
    }

    useEffect ( () => {
        gg();
    }, [])
   


    return (
     <ChatDiv>
      {!!loading && <div>loading</div>}
      {!loading && <div>
    
        {ob._embedded.messageThreads.map( e => (
            <MessageThreadHead user={props.user} key={e.created} {...e} />
        ))}
        <button onClick={() => contact(1)}>Contact Nate!</button>
      </div>}
    </ChatDiv>
    );
  }

  App.propTypes = {
      user: PropTypes.object.isRequired
  };
  
  export default App;