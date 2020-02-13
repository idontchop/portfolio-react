import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MessageThread from './MessageThread';
import styled from 'styled-components';

const Ms = (props) => {

    const [expanded, setExpanded] = useState(false);

    const [chatBubble, setBubble] = useState(<></>);
    const [chatBubbleLoading, setChatBubbleLoading] = useState(true);

    const BubbleButton = styled.button`
        background: none;
        border: ${props => props.expanded ? 'solid green 4px' : 'none'};
        border-radius: 50%;
        padding: 0;
    `;

    // close X, sits to upper right
    const CloseButton = styled.button`
        background: rgba(134,136,139, 0.4);
        position: absolute;
        padding: 0px 1px;
    `;

    const NewMessagesDiv = styled.div`
        background-color: rgba(166, 129, 129);
        display: block;
        position: absolute;
        bottom: -2px;
        left: 35px;
        border: 1px solid black;
        border-radius: 5px;

        p {
            font-size: 0.6em;
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
                setBubble ( await props.chatBubbleCallBack(props.memberNames[bubbleIndex]) )
            }
            if (chatBubble !== <></>)
                setChatBubbleLoading(false);
        })();

    }, []);

    // Can't use effect here because of api call
    const collaspeExpand = (newExpanded) => {
        setExpanded(newExpanded);

        // chat box was collapsed.
        if ( !newExpanded ) {
            props.newMessages(true, getThreadId() );
        }
    }
    
    console.log(props)
    return (
        <div style={{height: 'inherit', width: 'inherit', maxHeight: 'inherit', maxWidth: 'inherit'}}>
        {!props.memberIds && <div>loading</div>}
        {!!props.memberIds &&     
            <BubbleButton onClick={ () => collaspeExpand(!expanded) } expanded={expanded}>
                {chatBubbleLoading ? <div>{props.memberNames[1]}</div> : chatBubble}
                {props.numNewMessages > 0 && !expanded &&  <NewMessagesDiv><p>{props.numNewMessages}</p></NewMessagesDiv>}
                </BubbleButton> }
        
        {!!props._links && expanded && 
            <MessageThread user={props.user} 
                newMessages={props.newMessages()} {...props._links} >
            <CloseButton onClick= { () => collaspeExpand(false)}>&#8617;</CloseButton>
            </MessageThread>}
        
        </div>
    )
}

Ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default Ms;

