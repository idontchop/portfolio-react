import Stomp from 'stompjs';

const portfolioChatUrl = process.env.NODE_ENV === "development" ?
"http://localhost:8080/portfolioChat" : "https://idontchop.com/portfolioChat/";

const wsChatUrl = process.env.NODE_ENV === "development" ?
"ws://localhost:8080/portfolioChat/socket/" : "https://idontchop.com/portfolioChat//socket/";

const SockJS = require('sockjs-client');

const buildStompHeader = () => {

    let bheaders = {};

    // Note: if this fails, the api will also likely fail
    // This module shouldn't be called without authenticated user
    // If anonymous chat feature required, temp JWT token should still
    // be supplied.
    if (window.localStorage.hasOwnProperty('token')) {
        bheaders['Authorization'] =  'Bearer ' + window.localStorage.getItem("token");
    }

    return bheaders;
    
}


const PortfolioChatSocket = {

    
    register: (registrations) => {
        const socket = SockJS(portfolioChatUrl + '/socket');
        PortfolioChatSocket.stompClient = Stomp.over(socket);
        PortfolioChatSocket.stompClient.reconnect_delay = 5000;
        PortfolioChatSocket.stompClient.connect ( buildStompHeader(),
            (frame) => {
                console.log("STOMP Connected in register", frame);
                registrations.forEach ( (r) => {
                    PortfolioChatSocket.stompClient.subscribe( r.route, r.callback);
                    let url = PortfolioChatSocket.stompClient.ws._transport.url;
                    console.log(url);
                    url = url.replace(
                        wsChatUrl,  "");
                      url = url.replace("/websocket", "");
                      url = url.replace(/^[0-9]+\//, "");
                      console.log(url);
                      PortfolioChatSocket.stompClient.subscribe('/secured/user/queue/specific-user-user' + url,
                    r.callback);
                });

            });

    },
    subscribe: (r) => {
        const socket = SockJS(portfolioChatUrl + '/socket');
        const stompClient = Stomp.over(socket);
        stompClient.reconnect_delay = 5000;
        stompClient.connect ( buildStompHeader(), 
            (frame) => {
            console.log("STOMP Connected in Subscribe", frame);
            let url = stompClient.ws._transport.url;
            console.log(url);
            url = url.replace(
                wsChatUrl,  "");
              url = url.replace("/websocket", "");
              url = url.replace(/^[0-9]+\//, "");
              stompClient.subscribe('/secured/user/queue/specific-user-user' + url,
            r.callback);
            console.log(r.callback)
        })

        PortfolioChatSocket.stompClient = stompClient;

    }
}

export default PortfolioChatSocket;