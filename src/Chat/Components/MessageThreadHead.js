import React from 'react';
import PropTypes from 'prop-types';

const ms = (props) => {

    console.log(props);
    return (
        <div>
        {!props.memberIds && <div>loading</div>}
        {!!props.memberIds && <div>{props.memberIds.map ( e => e )}</div>}
        </div>
    )
}

export default ms;

