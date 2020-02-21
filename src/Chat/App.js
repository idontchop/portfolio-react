import React, {useState, useEffect, useRef} from 'react';
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
    width: 100%;
    bottom: -2px;
    left: 0;
    z-index: 9;
    text-align: right;
    white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 0px;
    max-height: ${window.innerHeight * .8}px;

    &::-webkit-scrollbar {
        height: 8px;
       }

    /* Track */
    &::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

`;

const ThreadWrapperDiv = styled.div`
    display: inline-block;
    background-color: white;
    border: 2px solid #86888D;
    border-radius: 5px 5px 0px 0px;
    padding: 0 1px;
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
        let numThreads = -1;
        try {
            let obj = await PortfolioChatApi.getJson("messageThreads");
            if ( !!obj._embedded ) {
                numThreads = obj._embedded.messageThreads.length;
            }
            setOb(obj)
            setLoading(false)
            console.log(obj, ob);
            countNumNewMessages(obj._embedded.messageThreads);
        } catch (err) {
            console.log("failed to load threads")
        }

        return numThreads;
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

        if (!! frame.body ) {
            
            let message = JSON.parse(frame.body);
            if ( !! message.messageThread ) {

                // Found messageThread, properly formatted message
                // push to state
                //console.log(message, ob);
                updateNumNewMessage(message.messageThread.id);
                
                
                // ran into problem here with scope of stomp's callback, should
                // dig into why it's creating a new object.
                // Perhaps Stomp calls will simply need to use stateful components
                // Went too big on this functional component
                // For now, this hack will work, checks the ob state to see if 
                // this message thread exists. Sets a flag to run getThreads()
                // if necessary
                let getNewThreads = false;
                setOb ( prevState => {
                    if (prevState._embedded.messageThreads.length === 0 ||
                        !prevState._embedded.messageThreads.some ( (m) => message.messageThread.id === getThreadId(m) ) ) {
                        getNewThreads = true; 
                    }
    
                    return prevState;
                })

                // either get new threads from servers which will include messages
                // or update new messages state
                if (getNewThreads) {
                    getThreads();
                } else {
                    setNewMessages ( prevState => [...prevState,message]);
                }
                
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

        console.log(threadId, reset)

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
    useEffect (  () => {

        /*
        How do we solve this? TODO
        */
        PortfolioChatSocket.subscribe ( 
            {route: '/secured/user', callback: incomingNewMessage.bind(this) }
            );
        
        // get threads from api
        // create thread if one doesn't exist
        ( async () => {
            try {
                let numThreads = await getThreads();
                console.log("Loaded threads", numThreads)
                if (numThreads === 0) {
                    setTimeout ( () => contact (1), 3000);
                }

            } catch (err) {
                console.log("error loading threads")
            }
        })();

    }, [])

    /**
     * Sets the x scroll of the chat div when a messagethreadhead is expanded
     * If not scrolling, does not affect.
     */
    const scrollCenter = ( (x) => {
        console.log(x)
        if ( x['x'] + 320 > window.innerWidth) {
            console.log("Greater than width: ", threadNode.current.scrollLeft, ( (x['x'] + 320) - window.innerWidth ));
            let scrollLeft = threadNode.current.scrollLeft + 
                ( (x['x'] + 320) - window.innerWidth ) + 20;
                //threadNode.current.scrollLeft = 150;
            threadNode.current.scrollBy ( {
                left: scrollLeft, behavior: 'smooth'
            })
            console.log(threadNode.current.scrollLeft, threadNode.current.scrollHeight,scrollLeft);
        } else if ( x['x'] < 0 ) {
            console.log("Less than width: ", threadNode.current.scrollLeft, x['x']);

            let scrollRight = x['x'] - 10;

            threadNode.current.scrollBy ( {
                left: scrollRight, behavior: 'smooth'
            })

        }
    })
   
    console.log(ob);
    console.log(numNewMessages);

    const threadNode = useRef();
    if ( !!threadNode && !!threadNode.current ) {
        console.log(threadNode, threadNode.current, 
            threadNode.current.getBoundingClientRect(), threadNode.current.scrollLeft)
    }
    return (
     <ChatDiv ref={threadNode}>
      {!!loading && <div>loading (app)</div>}
      {!loading && 
    
        ob._embedded.messageThreads.map( e => (
            <ThreadWrapperDiv>
            <MessageThreadHead user={props.user} chatBubbleCallBack={props.chatBubbleCallBack} 
            newMessages={newMessages}
            scrollCenterCallback={(x) => scrollCenter(x)}
            newMessagesCallback={(r,id) => newMessagesProp(r,id)} key={e.created} {...e}
            numNewMessages={numNewMessages[getThreadId(e)]} />
            </ThreadWrapperDiv>
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