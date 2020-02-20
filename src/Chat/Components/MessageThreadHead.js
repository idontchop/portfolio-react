import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MessageThread from './MessageThread';
import styled from 'styled-components';

const Ms = (props) => {

    const [expanded, setExpanded] = useState(false);

    const [chatBubble, setBubble] = useState(<></>);
    const [chatBubbleLoading, setChatBubbleLoading] = useState(true);


    const BubbleButton = styled.button`
        background: white;
        border: ${props => props.expanded ? 'solid white 4px' : 'solid white 4px'};        
        padding: 0;
        width: 100%;
        display: inline-block;
        position relative;
        overflow: hidden;
    `;

    // close X, sits to upper right
    const CloseButton = styled.button`
        background: rgba(166, 129, 129, 0.9);
        position: absolute;
        left: -2px;
        top: -2px;
        padding: 1px 3px;
        border-radius: 7px 0 0 0;
    `;

    const NewMessagesDiv = styled.div`
        background-color: rgba(166, 129, 129);
        display: inline-block;
        position: absolute;
        top: -8px;
        left: -10px;
        border: 1px solid black;
        border-radius: 5px;

        p {
            font-size: 0.6em;
            font-weight: bold;
            color: white;
            padding: 2px;
            margin: 1px;
        }
    `;

    let getThreadId = () => {
        return parseInt(props._links.self.href.match(/\d*$/g)[0]);
    }

    useEffect ( () => {
        
        
        // gets the chat user circle
        (async () => {
            
            if (!!props.memberNames && chatBubbleLoading && !!props.user) {

                // bubble index should be set to opposite member (ie, not user)
                // usually 1 but could be switched if threads ran backwards on backend
                let bubbleIndex = 1;
                if ( props.user.username === props.memberNames[1]) {
                    bubbleIndex = 0;
                }
                console.log("setBubble")
                setBubble ( await props.chatBubbleCallBack(props.memberNames[bubbleIndex]) )
            }
            if (chatBubble !== <></>)
                setChatBubbleLoading(false);
        })();

    }, []);

    // Can't use effect here because of initial api call
    const collaspeExpand = (newExpanded) => {
        setExpanded(newExpanded);
        console.log("collaspeexpand")

        // chat box was collapsed.
        if ( !newExpanded ) {
            props.newMessagesCallback(true, getThreadId() );
        }
    }
    

    return (
        <>
        {!props.memberIds && <div>loading (messagethreadhead)...</div>}
        {!!props._links && expanded && 
            <MessageThread user={props.user} 
                newMessages={props.newMessages} {...props._links} >
            <CloseButton onClick= { () => collaspeExpand(false)}>&#8617;</CloseButton>
            </MessageThread>}
        {!!props.memberIds &&     
            <BubbleButton onClick={ () => collaspeExpand(!expanded) } expanded={expanded}>
                {props.numNewMessages > 0 && !expanded &&  <NewMessagesDiv><p>{props.numNewMessages}</p></NewMessagesDiv>}

                {chatBubbleLoading ? <div>{props.memberNames[1]}</div> : chatBubble}

                </BubbleButton> }
        </>
    )
}

Ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default Ms;

