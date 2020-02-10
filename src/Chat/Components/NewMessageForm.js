import React,{useState} from 'react';
import styled from 'styled-components';
import PortfolioChatApi from '../lib/PortfolioChatApi';

const MessageInput = styled.textarea`
    font-size: 0.7em;
    display: inline-block;
    width: 100%;
    height: 17px;
    max-height: 50px;
    max-width: 100%;
    resize: none;
    line-height: 1em;
    overflow: hidden;
    border: 1 solid #86888D;
    position: absolute;
    bottom: 0;
    border-radius: 2px;
    
`;

const MessageButton = styled.button`
    font-size: 0.7em;
    border: white 2px solid;
    display: inline-block;
    position: absolute;
    bottom: 0;
`;

//added to api url + thread number
const PATHEXT = "newTextMessage/";
const MAXINPUTHEIGHT = 50;





const NewMessageForm = (props) => {
    
    const [messageContent, setMessageContent] = useState("");

    // Handles text area growth
    const handleKeyDown = (e) => {

        console.log(e.target.scrollHeight, e.target.style.height);
        let newHeight = (e.key === 'Enter') ? 15 : 0;
        newHeight += e.target.scrollHeight + 2; // scroll height always 2 less
        e.target.style.height = `${newHeight}px`;

    }

    const onChange = (e) => {
        setMessageContent(e.target.value);
    }

    // Submit new message
    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("content", messageContent);
        try {
            await PortfolioChatApi.postForm(`newTextMessage/${props.threadId}`, formData)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form>
            <div className="container">
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