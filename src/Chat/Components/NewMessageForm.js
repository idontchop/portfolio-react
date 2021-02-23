import React,{useState, useRef} from 'react';
import styled from 'styled-components';
import PortfolioChatApi from '../lib/PortfolioChatApi';

const userColor = '134,136,139';

const MessageInput = styled.textarea`
    font-size: 0.7em;
    display: flex;
    width: 100%;
    height: 23px;
    max-height: 50px;
    max-width: 100%;
    resize: none;
    line-height: 1em;
    overflow: hidden;
    border: 0;
    background-color: rgba(${userColor}, 0.15);
    position: relative;
    bottom: 0px;
    left: 0;
    padding: 5px 15px 2px 4px;
    border-bottom: 1px solid #86888D;

    &:focus {
        outline: 0;
    }
    
`;

const MessageButton = styled.button`
    font-size: 0.7em;
    border: 0;
    background-color: Transparent;
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 1px;
`;

//added to api url + thread number
const PATHEXT = "newTextMessage/";
const MAXINPUTHEIGHT = 50;





const NewMessageForm = (props) => {
    
    const [messageContent, setMessageContent] = useState("");
    const messageInput = useRef();

    // Handles text area growth
    const handleKeyDown = (e) => {

        // if key pressed is Enter without shift, do a submit
        if ( !e.shiftKey && e.key === 'Enter' ) {
            handleSubmit(e);
        } else { // else handle scroll height
            let scrollDiff = e.target.offsetHeight - e.target.scrollHeight;
            if (scrollDiff < 0 || scrollDiff > 4 ) scrollDiff = 4;
            let newHeight = (e.shiftKey && e.key === 'Enter') ? 23 : 0;
            newHeight += e.target.scrollHeight + scrollDiff; // scroll height always 2 less
            e.target.style.height = `${newHeight}px`;
            console.log(e.target.style.height);
        }

    }

    const onChange =  (e) => {

        setMessageContent(e.target.value);
        if (e.target.value === "" && e.target.style.height !== `23px`)
            e.target.style.height = `23px`;
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
                
                // reset text area and focus
                if ( messageInput && messageInput.current ) {
                    messageInput.current.style.height = `23px`;
                    messageInput.current.focus()
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div style={{position: "relative", marginTop: "2px"}}>
        <form>
            <MessageInput 
                value={messageContent} 
                onChange={onChange} onKeyDown={handleKeyDown}
                ref={messageInput} />
            <MessageButton onClick={handleSubmit}>></MessageButton>
        </form>
        </div>

    );

    /*
    return (
        <form>
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-11">
                        <MessageInput value={messageContent} onChange={onChange} onKeyDown={handleKeyDown} />
                        
                    </div>
                    <div className="col-1">
                        <MessageButton onClick={handleSubmit}>></MessageButton>
                    </div>
                </div>
            </div>
        </form>
    );*/
}

export default NewMessageForm;