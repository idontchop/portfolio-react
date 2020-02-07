import Stomp from 'stompjs';

const portfolioChatUrl = process.env.NODE_ENV === "development" ?
"http://localhost:8080/portfolioChat" : "http://localhost:8080/portfolioChat";

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
        const stompClient = Stomp.over(socket);
        stompClient.connect ( buildStompHeader(),
            (frame) => {
                
                registrations.forEach ( (r) => {
                    stompClient.subscribe( r.route, r.callback);
                    let url = stompClient.ws._transport.url;
                    console.log(url);
                    url = url.replace(
                        "ws://localhost:8080/portfolioChat/socket/",  "");
                      url = url.replace("/websocket", "");
                      url = url.replace(/^[0-9]+\//, "");
                      console.log(url);
                    stompClient.subscribe('/secured/user/queue/specific-user-user' + url,
                    r.callback);
                });

            });

    }
}

export default PortfolioChatSocket;