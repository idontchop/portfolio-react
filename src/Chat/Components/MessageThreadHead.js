import React from 'react';
import PropTypes from 'prop-types';
import MessageThread from './MessageThread';

const ms = (props) => {

    console.log(props)
    return (
        <div>
        {!props.memberIds && <div>loading</div>}
        {!!props._links && <MessageThread user={props.user} {...props._links} />}
        </div>
    )
}

ms.propTypes = {
    user: PropTypes.object.isRequired
}
export default ms;

