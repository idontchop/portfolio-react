import React, {useState, useEffect} from 'react';
import PortfolioChatApi from './lib/PortfolioChatApi.js';
import styled from 'styled-components';
import MessageThreadHead from './Components/MessageThreadHead.js';
import PropTypes from 'prop-types';
import PortfolioChatSocket from './lib/PortfolioChatSocket';

const ChatDiv = styled.div`
    position: fixed;
    padding: 2px;
    background-opacity: 0;
    display: inline-block;
    max-width: 360px;
    bottom: 40%;
    left: 0px;
    z-index: 9;
    max-height: ${window.innerHeight * .6}px;
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
    const [newMessages, setNewMessages] = useState([]);
    const [messageThreads, setThreads] = useState({});
    const [loading, setLoading] = useState(true);
    const [numNewMessages, setNumNewMessage] = useState([]);

    // memberNameData holds the display name of a user
    // it is set and managed by getMemberName()
    // getMemberName looks through this when called with an id
    // if not found, uses the passed in function call meant to 
    // call an api
    const memberNameData = {};
    // holds JSX elements corresponding to chat head
    // managed by getMemberDisplay
    const memberDisplayData = {};

    // receives message thread object and extracts server id of thread
    let getThreadId = (mt) => {
        return parseInt(mt._links.self.href.match(/\d*$/g)[0]);
    }

    // Counts number of new messages on server
    const countNumNewMessages =  (messageThreads) => {

        
        messageThreads.forEach ( async (mt) => {
            let nm = {};
            let t = await PortfolioChatApi.getJson('unSeen/' + getThreadId(mt));
            nm[getThreadId(mt)] = parseInt(t['num']);
            setNumNewMessage ( prevState => {
                prevState.push(nm);
                return prevState;
            });
        })

  

    }

    const getThreads = async () => {
        let obj = await PortfolioChatApi.getJson("messageThreads");
        setOb(obj)
        setLoading(false)
        console.log(obj);
        countNumNewMessages(obj._embedded.messageThreads);
    }

    const contact = async (id) => {
        try {
            let formData = new FormData();
            formData.append("id",id);
            let obj2 = await PortfolioChatApi.postForm("newThread",formData);
            
            getThreads();

        } catch (err) {
            console.log(err)
        }
    }

    const incomingNewMessage = (frame) => {
        
        if (!! frame.body ) {
            
            let message = JSON.parse(frame.body);
            if ( !! message.messageThread ) {

                // Found messageThread, properly formatted message
                // push to state
                console.log(message);
                setNewMessages ( prevState => [...prevState,message]);
            }
        }
    }

    /**
     * This is called when message threads are expanded and collaspsed. Handles
     * the new messages object.
     * 
     * @param {} reset true if newMessages should be reset
     * @param {*} thread 
     */
    const newMessagesProp = (reset = false, threadId) => {

        console.log(threadId)

        if ( reset ) {

            // reset new messages and tell API messages are read
            setNewMessages( prevState => {
                let newState = [];
                prevState.forEach ( m => {
                    if (m.id !== threadId ) {
                        // remove messages that are part of passed in thread id
                        newState.push(m);
                    }                    
                })

                return newState;
            }); // called by message thread head when hidden

            try {
                PortfolioChatApi.putForm('seenThread/' + threadId, new FormData());
            } catch (err) {
                console.log("Caught error updating seenThread", err);
            }
            return [];

        } else {
            return newMessages;
        }
    }

    // Componenent Did Mount
    useEffect ( () => {
        
        // get threads from api
        getThreads();

        PortfolioChatSocket.subscribe ( 
            {route: '/secured/user', callback: (frame) => incomingNewMessage(frame) }
            );

    }, [])
   
    return (
     <ChatDiv>
      {!!loading && <div>loading</div>}
      {!loading && 
    
        ob._embedded.messageThreads.map( e => (
            <MessageThreadHead user={props.user} chatBubbleCallBack={props.chatBubbleCallBack} 
            newMessages={(r,id) => newMessagesProp(r,id)} key={e.created} {...e}
            numNewMessages={getThreadId(e)} />
        ))}
        {!loading && ob._embedded.messageThreads.length === 0 &&
            <button onClick={() => contact(1)}>Contact Nate! (testing)</button>}
    </ChatDiv>
    );
  }

  App.propTypes = {
      user: PropTypes.object.isRequired
  };
  
  export default App;