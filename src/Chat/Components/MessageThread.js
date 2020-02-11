import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import PortfolioChatApi from '../lib/PortfolioChatApi';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NewMessageForm from './NewMessageForm';

// css for styling chat bubbles
const userColor = '134,136,139';
const memberColor = '131,124,139';
const userBorder = '10px 10px 10px 1px';
const memberBorder = '10px 10px 1px 10px';

// wraps whole window, goal is to lift it from bottom
const ThreadWrapper = styled.div`
    width: 350px;
    border-radius: 4px;
    border: solid 3px rgba(134,136,139,.2);
    box-shadow: 0px 0px 0px 5px rgba(134,136,139,.5);
    height: inherit;
    max-width: inherit;
    max-height: inherit;
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    clear: both;
    position: relative;
    left: 50px;
    padding: 3px;
    max-height: ${window.innerHeight * .58}px;
`;

const MessagesWrapper = styled.div`
    overflow-Y: auto;
    overflow-X: wrap;
    width: 100%;
    height: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;

`;
// Message Wrapper (chat bubble)
const MessageWrapper = styled.div`
    
    margin: 0px 3px 10px 3px;
    padding: ${props=> props.isUser ? '0px 0px 0px 6px' : '0px 6px 0px 0px'};

    text-align: ${props=> props.isUser ? 'right' : 'left'};

    p {
        font-size: 0.75em;
        display: inline-block;
        padding: 5px 10px;
        margin: 0;
        word-wrap: break-word;
        word-break: break-all;
        border-radius: ${props => props.isUser ? memberBorder:userBorder};
        background-color: rgb(${props => props.isUser ? memberColor : userColor },.6);
    }
`;
/**
 * Displays the cascaded divs of messages in a messagethread.
 * Expects to receive the expanded data from a spring rest call
 * to messageThreads (with _links).
 * 
 * TODO:
 *  1) pass from parent app a function to display chat_user information.
 *      This data is expected to be from a different microservice
 *  2) Handle pagination, when scrolling back 
 *
 * @param {user, ...messageThreads} props 
 */
const MessageThread = (props) => {

    let [messages, setMessages] = useState([]);
    let [isLoading, setLoading] = useState(true);

    const scrollNode = useRef();
    /**
     * Finds thread id from passed props
     * will be in an href under self
     */
    let getThreadId = () => {
        return parseInt(props.self.href.match(/\d*$/g)[0]);
    }

    /**
     * Component Did Mount
     * 
     * API call, fills state with messages for supplied messagethread href
     * 
     * TODO: Pages
     */
    useEffect(  () =>  {

        const messagesByThreadUrl = 
        `messages/search/findAllSince?date=01/01/2019&id=${getThreadId()}`;
        let msgObj;

        // load messages
        ( async () => {
            try {

                msgObj = await PortfolioChatApi.getJson(messagesByThreadUrl);

                setMessages(msgObj._embedded.messages.reverse());
                setLoading(false);
                


            } catch (err) {
                console.log("Unable to load: ", err, msgObj, props.href);
            }
        })();

    }, []);

    /**
     * Component Did Update
     * 
     * Combines messages state with newMessages props
     * 
     */
    useEffect ( () => {

    

    });

    /**
        Updates to scroll bar on every redraw
     */
    useLayoutEffect ( () => {
        if ( !!scrollNode && !!scrollNode.current) {
            scrollNode.current.scrollTop = scrollNode.current.scrollHeight;
        }    

    })

    /**
     * Primarily solves goal to display new lines
     */
    const content = (c) => {

        return c.split('\n').map (( item, i ) => {
            return <span style={{display: "block"}} key={i}>{item}</span>
        })

    }

    // build messages
    const buildMessages = (m,nm) => {

        // adds newMessages from props to a new array
        // that is concated with our state messages
        let mm = m;
        if ( nm !== undefined) {
            mm = m.concat(
                nm.reduce ( (mt, nm) => {
                    if ( nm.messageThread.id === getThreadId()) {
                        mt.push(nm);
                    }
                    return mt;
                }, [])
            );
        }

        // maps the new array to UI
        return mm.map ( e => (
            <div key={e.created}>
                <MessageWrapper isUser={e.sender.name === props.user.username}>
                    <p>{content(e.content)}
                    </p>
                </MessageWrapper>
            </div>
        ));
    }

    if (isLoading) {
        return <div>Loading...</div>
    } else if (!isLoading && messages.length === 0 ) {
        return <div>No Messages...</div>
    } else return (
        <div style={{height: 'inherit', width: 'inherit', maxHeight: 'inherit', maxWidth: 'inherit'}}>
            <ThreadWrapper>
                <MessagesWrapper ref={scrollNode}>{buildMessages(messages, props.newMessages )}</MessagesWrapper>
                <NewMessageForm threadId={getThreadId()}/>
            </ThreadWrapper>
            
        </div>
        )

}

MessageThread.propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
}

export default MessageThread;