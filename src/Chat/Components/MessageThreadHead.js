import React from 'react';
import PropTypes from 'prop-types';
import MessageThread from './MessageThread';

const ms = (props) => {

    
    return (
        <div style={{height: 'inherit', width: 'inherit', maxHeight: 'inherit', maxWidth: 'inherit'}}>
        {!props.memberIds && <div>loading</div>}
        {!!props._links && 
            <MessageThread user={props.user} 
                newMessages={props.newMessages} {...props._links} />}
        </div>
    )
}

ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default ms;

