import React, { useEffect, useState } from 'react';
import PortfolioChatApi from '../lib/PortfolioChatApi';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// css for styling chat bubbles
const userColor = '134,136,139';
const memberColor = '131,124,139';
const userBorder = '10px 10px 10px 1px';
const memberBorder = '10px 10px 1px 10px';

// Message Wrapper (chat bubble)
const MessageWrapper = styled.div`
    
    margin: 3px 15px;
    padding: 2px;
    display: block;
    text-align: ${props=> props.isUser ? 'left' : 'right'};
    

    p {
        font-size: 0.85em;
        display: inline-block;
        padding: 5px 10px;
        margin: 0;
        border-radius: ${props => props.isUser ? userBorder:memberBorder};
        background-color: rgb(${props => props.isUser ? userColor : memberColor },.6);
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

    /**
     * API call, fills state with messages for supplied messagethread href
     */
    useEffect(  () =>  {

        let msgObj;

        // load messages
        ( async () => {
            try {

                msgObj = await PortfolioChatApi.getJson(props.href);

                setMessages(msgObj._embedded.messages);
                setLoading(false);

            } catch (err) {
                console.log("Unable to load: ", err, msgObj, props.href);
            }
        })();

    }, []);

    // build messages
    let Messages = messages.map ( e => (
        <div key={e.created}>
            <MessageWrapper isUser={e.sender.name === props.user.username}>
                <p>{e.content}
                <span>by {e.sender.name === props.user.username ? 'You' : e.sender.name}</span>
                </p>
            </MessageWrapper>
        </div>
    ));

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && messages.length === 0 ? <div>No Messages...</div>: <div></div>}
            <div>{Messages}</div>
        </div>
    )

}

MessageThread.propTypes = {
    user: PropTypes.object.isRequired,
    href: PropTypes.string.isRequired
}

export default MessageThread;