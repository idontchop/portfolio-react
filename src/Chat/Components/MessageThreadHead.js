import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import MessageThread from './MessageThread';
import styled from 'styled-components';

const BubbleButton = styled.button`
    background: white;
    border: ${props => props.expanded ? 'solid white 4px' : 'solid white 4px'};        
    padding: 0;
    width: 100%;
    display: inline-block;
    position relative;
    overflow: hidden;
    outline: 0;
    text-align: center;

    &:focus {
        outline: 0;
    }
`;

// close X, sits to upper right
const CloseButton = styled.button`
    background: none;
    border: none;
    position: relative;
    display: inline-block;
    right: 0px;
    top: -10px;
    padding: 1px 3px;
    height: 10px;
    width: 20px;
    font-size: 0.6em;
`;




const NewMessagesDiv = styled.div`
    background-color: rgba(166, 129, 129);
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 20px;
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


const Ms = (props) => {

    const [expanded, setExpanded] = useState(false);

    const [chatBubble, setBubble] = useState(<></>);
    const [chatBubbleLoading, setChatBubbleLoading] = useState(true);


    const threadRef = useRef();


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

    useEffect ( () => {

        // sends our X coords back if expanded, we wait quarter of a second mainly to let
        // messagethread have a change to render, but also gives a bit of affect.
        if ( expanded && props.scrollCenterCallback && threadRef && threadRef.current ) {
            setTimeout ( () =>
                props.scrollCenterCallback(threadRef.current.getBoundingClientRect() ) ,
                150);
        }
    }, [expanded] )

    // Can't use effect here because of initial api call
    const collaspeExpand = (newExpanded) => {
        setExpanded(newExpanded);
        console.log("collaspeexpand")

        // chat box was expanded.
        if ( newExpanded ) {
            props.newMessagesCallback(true, getThreadId() );
        }


    }
    
    

    console.log("rendering MTH")
    return (
        <div ref={threadRef}>
            
        {!props.memberIds && <div>loading (messagethreadhead)...</div>}
        {!!props._links && expanded && 
            <MessageThread  user={props.user} 
                newMessages={props.newMessages} {...props._links} >
            
            <CloseButton onClick= { () => collaspeExpand(false)}>&#10005;</CloseButton>
            </MessageThread>}
        {!!props.memberIds &&     
            <BubbleButton onClick={ () => collaspeExpand(!expanded) } expanded={expanded}>
                {props.numNewMessages > 0 && !expanded &&  <NewMessagesDiv><p>{props.numNewMessages}</p></NewMessagesDiv>}

                {chatBubbleLoading ? <div>{props.memberNames[1]}</div> : chatBubble}

                </BubbleButton> }
        </div>
    )
}

Ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default Ms;

