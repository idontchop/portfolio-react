import React,{useState} from 'react';
import styled from 'styled-components';
import PortfolioChatApi from '../lib/PortfolioChatApi';

const MessageInput = styled.textarea`
    font-size: 0.7em;
    display: flex;
    width: 100%;
    height: 19px;
    max-height: 50px;
    max-width: 100%;
    resize: none;
    line-height: 1em;
    overflow: hidden;
    border: 1 solid #86888D;
    position: relative;
    bottom: 0px;
    left: 0;
    border-radius: 2px;
    
`;

const MessageButton = styled.button`
    font-size: 0.7em;
    border: white 2px solid;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 2px;
`;

//added to api url + thread number
const PATHEXT = "newTextMessage/";
const MAXINPUTHEIGHT = 50;





const NewMessageForm = (props) => {
    
    const [messageContent, setMessageContent] = useState("");

    // Handles text area growth
    const handleKeyDown = (e) => {

        // if key pressed is Enter without shift, do a submit
        if ( !e.shiftKey && e.key === 'Enter' ) {
            handleSubmit(e);
        } else { // else handle scroll height
            let scrollDiff = e.target.offsetHeight - e.target.scrollHeight;
            if (scrollDiff < 0 || scrollDiff > 4 ) scrollDiff = 4;
            let newHeight = (e.shiftKey && e.key === 'Enter') ? 19 : 0;
            newHeight += e.target.scrollHeight + scrollDiff; // scroll height always 2 less
            e.target.style.height = `${newHeight}px`;
            console.log(e.target.style.height);
        }

    }

    const onChange =  (e) => {

        setMessageContent(e.target.value);
        if (e.target.value === "" && e.target.style.height !== `19px`)
            e.target.style.height = `19px`;
    }

    // Submit new message
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( messageContent !== "") {

            let formData = new FormData();
            formData.append("content", messageContent);
            try {
                await PortfolioChatApi.postForm(`${PATHEXT + props.threadId}`, formData)
                setMessageContent("");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <form>
            <div style={{padding: "3px 2px"}} className="container">
                <div className="row no-gutters">
                    <div className="col-11">
                        <MessageInput value={messageContent} onChange={onChange} onKeyDown={handleKeyDown}/>
                    </div>
                    <div className="col-1">
                        <MessageButton onClick={handleSubmit}>></MessageButton>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default NewMessageForm;