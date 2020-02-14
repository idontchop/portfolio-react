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
    const [loading, setLoading] = useState(true);
    const [numNewMessages, setNumNewMessages] = useState({});

    console.log("chat app loaded", ob, loading);

    // receives message thread object and extracts server id of thread
    let getThreadId = (mt) => {
        return parseInt(mt._links.self.href.match(/\d*$/g)[0]);
    }

    // Counts number of new messages on server
    const countNumNewMessages =  async (messageThreads) => {

        let newNum = {};

        // classic for look to handle async issues
        for (let i = 0; i < messageThreads.length; i++) {
            let mt = messageThreads[i];
            let t = await PortfolioChatApi.getJson('unSeen/' + getThreadId(mt));
            console.log(getThreadId(mt));
            newNum[getThreadId(mt)] = parseInt(t['num']);
        }

        setNumNewMessages (newNum);
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

    // increment the numNewMessages array
    const updateNumNewMessage = (threadId) => {
        console.log(ob);

        setNumNewMessages ( (prevState) => {
            console.log(threadId, prevState[threadId])
            prevState[threadId] = ++prevState[threadId] || 1;
            console.log(threadId, prevState[threadId])
            let newState = prevState;
            return newState;
        })

    }

    /**
     * Handles incoming websocket messages. This is how new messages
     * are delivered.
     * @param {} frame 
     */
    const incomingNewMessage = (frame) => {
        console.log(loading, ob, numNewMessages, newMessages);

        if (!! frame.body ) {
            
            let message = JSON.parse(frame.body);
            if ( !! message.messageThread ) {

                // Found messageThread, properly formatted message
                // push to state
                //console.log(message, ob);
                updateNumNewMessage(message.messageThread.id);
                setNewMessages ( prevState => [...prevState,message]);
                
                console.log("prevstate")
                setOb ( prevState => {
                    console.log(prevState);
                    return prevState;
                })

                // we are simply trying to know if we should call getThreads or not
                //if (ob._embedded.messageThreads.length === 0 ||
                //    ob._embedded.messageThreads.some ( (m) => message.messageThread.id === getThreadId(m) ) ) {
                //        // we don't have this thread, so probably need to refetch
                //        getThreads();
                //}
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

            setNumNewMessages ( prevState => {
                prevState[threadId] = 0;
                return prevState;
            })

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
    useEffect ( function ()  {

        /*
        How do we solve this? TODO
        */
        PortfolioChatSocket.subscribe ( 
            {route: '/secured/user', callback: incomingNewMessage }
            );

        // get threads from api
        getThreads();

    }, [])
   
    console.log(ob);
    console.log(numNewMessages);
    return (
     <ChatDiv>
      {!!loading && <div>loading</div>}
      {!loading && 
    
        ob._embedded.messageThreads.map( e => (
            <MessageThreadHead user={props.user} chatBubbleCallBack={props.chatBubbleCallBack} 
            newMessages={(r,id) => newMessagesProp(r,id)} key={e.created} {...e}
            numNewMessages={numNewMessages[getThreadId(e)]} />
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