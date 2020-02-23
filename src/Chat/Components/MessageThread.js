import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import PortfolioChatApi from '../lib/PortfolioChatApi';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NewMessageForm from './NewMessageForm';
import withFullScreenModal from '../lib/WithFullScreenModal';
import DropImage from './DropImage';

// css for styling chat bubbles
const userColor = '134,136,139';
const memberColor = '131,124,139';
const userBorder = '10px 10px 10px 1px';
const memberBorder = '10px 10px 1px 10px';

const HeaderWrapper = styled.div`
    width: 320px;
`;

// wraps whole window, goal is to lift it from bottom
const ThreadWrapper = styled.div`
    width: 320px;
    border-radius: 4px;
    white-space: normal;
    height: inherit;
    max-width: inherit;
    max-height: inherit;
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    clear: both;
    padding: 3px 0px;
    max-height: ${window.innerHeight * .38}px;
`;

const MessagesWrapper = styled.div`
    overflow-Y: auto;
    overflow-X: wrap;
    width: 100%;
    height: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    position: relative;

`;
// Message Wrapper (chat bubble)
const MessageWrapper = styled.div`
    
    margin: 0px 3px 10px 3px;
    padding: ${props=> props.isUser ? '0px 0px 0px 6px' : '0px 6px 0px 0px'};

    text-align: ${props=> props.isUser ? 'right' : 'left'};

    p {
        font-size: 0.75em;
        display: inline-block;
        padding: 5px 10px;
        margin: 0;
        word-wrap: break-word;
        word-break: break-all;
        text-align: left;
        border-radius: ${props => props.isUser ? memberBorder:userBorder};
        background-color: rgb(${props => props.isUser ? memberColor : userColor },.6);
    }
`;

const MessageImage = styled.img`
    max-width: 280px;
    height: auto;
    border-radius: 5px;
`;

const UploadButton = styled.button`
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


/**
 * Returns an image as part of a message thread.
 * 
 * @param {image id} id 
 * @param {message with the image} content 
 */
const Image =  (props) => {

    let [imageLoading, setImageLoading] = useState(true);
    let [image, setImage] = useState();
    let [fullScreen, setFullScreen] = useState(false);


    useEffect ( () => {
        let imagePromise = PortfolioChatApi.getBlob(`image/27/${props.id}`);
        
        imagePromise.then(i => {
            setImage(URL.createObjectURL(i));
            setImageLoading(false);
        })
    }, []);
    
    return imageLoading ? <p>loading</p> : (
        <>
        {fullScreen ?  withFullScreenModal( () => setFullScreen(false),
         <img src={image} style={{width: "100%", height: "auto"}} />,
         {width: "80%", height: "auto"} ) : <></>}
        <MessageImage src={image} onClick={ () => setFullScreen(true)} />
        <span>{props.content}</span>
        </>);
}


/**
 * Displays the cascaded divs of messages in a messagethread.
 * Expects to receive the expanded data from a spring rest call
 * to messageThreads (with _links).
 * 
 * TODO:
 *  1) pass from parent app a function to display chat_user information.
 *      This data is expected to be from a different microservice
 *  2) Handle pagination, when scrolling back 
 *
 * @param {user, ...messageThreads} props 
 */
const MessageThread = (props) => {

    let [messages, setMessages] = useState([]);
    let [isLoading, setLoading] = useState(true);

    // handles scroll back load
    // total pages to know when end is reached, sets to one at first so it tries to load
    // page is the next page to be loaded
    let [totalPages, setTotalPages] = useState(1);
    let [page, setPage] = useState(0);

    let [isScrollTop, setScrollTop] = useState(false);
    let [isScrollBottom, setScrollBottom] = useState(true);
    let [lastScrollHeight, setLastScrollHeight] = useState(0);
    let [showUploadModal, setShowUploadModal] = useState(false);

    const scrollNode = useRef();
    const threadNode = useRef();
    /**
     * Finds thread id from passed props
     * will be in an href under self
     */
    let getThreadId = () => {
        return parseInt(props.self.href.match(/\d*$/g)[0]);
    }

    /**
     * returns the ID of message.
     * This is necessary since the spring data doesn't return an id field
     * @param {a message} message 
     */
    let getMessageId = (message) => {
        if ( !!message.id ) { // socket message, easy
            return message.id;
        } else {
            return parseInt(message._links.self.href.match(/\d*$/g)[0])
        }
    }

    const loadPage = () => {

        if ( page === totalPages ) {

            // end of messages on server, layout flag
            setScrollTop(false);
            
        } else {

        const messagesByThreadUrl = 
        `messages/search/findAllSince?date=01/01/2019&id=${getThreadId()}&`+
        `page=${page}`;

        console.log(messagesByThreadUrl)
        let msgObj;

        // load messages
        ( async () => {
            try {

                console.log("loading", getThreadId())
                msgObj = await PortfolioChatApi.getJson(messagesByThreadUrl);

                setMessages( prevMessages => 
                    [...msgObj._embedded.messages.reverse(), ...prevMessages ] 
                );

                // layout flags
                setLoading(false);
                setScrollTop(false);

                // update page selection for next pull
                setPage ( prevPage => prevPage + 1 );
                setTotalPages(msgObj.page.totalPages);
                
            } catch (err) {
                console.log("Unable to load: ", err, msgObj, props.href);
            }
        })();

        }

    }

    const handleScrollUp = (e) => {

        console.log("fire", isScrollTop, e.target.scrollTop)
        if ( e.target.scrollTop === 0 && !isScrollTop ) {
            
            setScrollTop(true);
            setLastScrollHeight(e.target.clientHeight - 1);            
            setScrollBottom(false);
            loadPage();
        } else if ( (e.target.scrollTop === (e.target.scrollHeight - e.target.offsetHeight)) && !isScrollBottom ) {
            setScrollBottom(true);
            setScrollTop(false);
        } else {
            setScrollBottom(false)
        }

    }

    /**
     * Component Did Mount
     * 
     * API call, fills state with messages for supplied messagethread href
     * 
     */
    useEffect(  () =>  {

        loadPage();

    }, []);

    /**
     * Component Did Update
     * 
     * Combines messages state with newMessages props
     * 
     */
    useEffect ( () => {

    });



    /**
        Updates to scroll bar on every redraw
        Mainly want to keep it from hugging top and redraw to bottom
        on initial page load
     */
    useLayoutEffect ( () => {

        /*
        complicated?

        If we receive a new message and scroll was on bottom:
            keep scroll to bottom
        
        If user is scrolled up:
            leave scroll on same spot if new messages arrive

        If user scrolled to top:
            Retrieve new messages but leave user on same spot

        */

        // stick to bottom if scroll is somewhat close
        if ( isScrollBottom && !!scrollNode && !!scrollNode.current) {
            console.log("layout effect b", page, scrollNode.current.scrollTop)

            scrollNode.current.scrollTop = scrollNode.current.scrollHeight;

        } else if ( isScrollTop && !!scrollNode && !!scrollNode.current ) {
            console.log("layout effect t", page, scrollNode.current.scrollTop)
            // just keep it off the top
            scrollNode.current.scrollTop = 350;

        } else if (scrollNode && scrollNode.current) {
            console.log("layout effect wala", page, scrollNode.current.scrollTop)
            if ( scrollNode.current.scrollTop === 0) {
                scrollNode.current.scrollTop = 350;
            }
        }

        // if not first page, user has scrolled up, so we will 

    })

    /**
     * Primarily solves goal to display new lines
     */
    const content = (c) => {

        return c.split('\n').map (( item, i ) => {
            return <span style={{display: "block"}} key={i}>{item}</span>
        })

    }



    // build messages
    const buildMessages = (m,nm) => {

        // adds newMessages from props to a new array
        // that is concated with our state messages
        let mm = m;
        console.log(nm);
        if ( nm !== undefined ) {
            mm = m.concat(
                nm.reduce ( (mt, nm) => {
                    if ( nm.messageThread.id === getThreadId()) {
                        mt.push(nm);
                    }
                    return mt;
                }, [])
            );
        }

        // if no messages
        if ( mm.length === 0 ) 
            return <p>No Messages</p>
        // maps the new array to UI
        return mm.map ( e => (
            <MessageWrapper key={e.created} isUser={e.sender.name === props.user.username}>
                <p>{e.type === "MESSAGE" ? content(e.content) : <Image id={getMessageId(e)} content={e.content} />}
                </p>
            </MessageWrapper>
        ));
    }

    /* position tests */

    /* end tests */
    if (isLoading) {
        return <div>Loading... (message thread)...</div>
    } else return (
        <ThreadWrapper ref={threadNode}>
            <HeaderWrapper>
            <UploadButton onClick={() => setShowUploadModal(true)}>&#9709;</UploadButton>
                { !!showUploadModal && withFullScreenModal(
                    () => setShowUploadModal(false), <DropImage threadId={getThreadId()} />)
                }
                {props.children}
            </HeaderWrapper>
            <MessagesWrapper ref={scrollNode} onScroll={ (e) => handleScrollUp(e)}>
                {isScrollTop && <p>{"Loading"}</p>}
                {buildMessages(messages, props.newMessages )}                
            </MessagesWrapper>
            <NewMessageForm threadId={getThreadId()}/>
        </ThreadWrapper>
        )

}

MessageThread.propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
}

export default MessageThread;