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

    useEffect ( () => {
        
        (async () => {
            !!props.memberNames && 
            chatBubbleLoading &&
            setBubble ( await props.chatBubbleCallBack(props.memberNames[1]) )
            if (chatBubble !== <></>)
                setChatBubbleLoading(false);
        })();

    }, []);
    
    return (
        <div style={{height: 'inherit', width: 'inherit', maxHeight: 'inherit', maxWidth: 'inherit'}}>
        {!props.memberIds && <div>loading</div>}
        {!!props.memberIds &&     
            <BubbleButton onClick={ () => setExpanded(!expanded) } expanded={expanded}>
                {chatBubbleLoading ? <div>{props.memberNames[1]}</div> : chatBubble}
                </BubbleButton> }
        {!!props._links && expanded && 
            <MessageThread user={props.user} 
                newMessages={props.newMessages} {...props._links} >
            <CloseButton onClick= { () => setExpanded(false)}>&#8617;</CloseButton>
            </MessageThread>}
        
        </div>
    )
}

Ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default Ms;

