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
        border: none;
    `;

    useEffect ( () => {
        
        (async () => {
            !!props.memberNames && 
            chatBubbleLoading &&
            setBubble ( await props.chatBubbleCallBack(props.memberNames[1]) )
            && setChatBubbleLoading(false);
        })();

    }, []);
    
    return (
        <div style={{height: 'inherit', width: 'inherit', maxHeight: 'inherit', maxWidth: 'inherit'}}>
        {!props.memberIds && <div>loading</div>}
        {!!props.memberIds && 
            <BubbleButton onClick={ () => setExpanded(!expanded) }>{chatBubble}</BubbleButton>}
        {!!props._links && expanded && 
            <MessageThread user={props.user} 
                newMessages={props.newMessages} {...props._links} />}
        </div>
    )
}

Ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default Ms;

