import Stomp from 'stompjs';

const portfolioUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:8080/portfolio" : "https://idontchop.com/portfolio-war";

const SockJS = require('sockjs-client');

const PortfolioSocket = {

    register: (registrations) => {
        const socket = SockJS(portfolioUrl + '/socket');
        const stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect ( {},
            (frame) => {
                registrations.forEach ( (r) => {
                    stompClient.subscribe( r.route, r.callback);
                });
            });
    }

}

export default PortfolioSocket;