
// dev
const portfolioUrl = "http://localhost:8080/portfolio";
// prod
//const portfolioUrl = "https://idontchop.com/portfolio";

const buildHeaders = (method, type) => {
    return {
        credentials: 'include',
        method: method,
        headers: type === 'json' ? { 'Accept': 'application/json', 'Content-type': 'application/json'} : {}
    }
}

// argument passed to know which url to use
const urlExt = {
    profilePic: `/me/image`,
    profile: `/me/profile`,
    user: `/user`,
    formLogin: `/login`,
    newFormUser: `/newFormUser`,
    guestBook: `/guestBook`
}

const buildUrl = (type) => {
    return portfolioUrl + urlExt[type];
}

/**
 * Used for interacting with the Spring backend. 
 * Return will include an object with key "error" if
 * problem fetching
 */
const PortfolioApi = {

    // for updating profile
    putJson: async (type, formData) => {

        let response = fetch ( buildUrl(type),
             buildHeaders('get','json')).catch ( () => {
                 console.log("fetch failed",buildUrl(type));
             })

        if ( response && response.status === 200 ) {

            let responseData = response.json().catch ( () => {
                console.log("json fail", response);
            })

            return responseData;
        }

        return {'error': "error fetching profile"};
    },

    // for retrieving data (profile, guestbook)
    getJson: async (type) => {

        let response = await fetch ( buildUrl(type),
        buildHeaders('get','json')).catch ( () => {
            console.log("fetch failed",buildUrl(type));
        })

        if ( response && response.status === 200 ) {

            let responseData = response.json().catch ( () => {
                console.log("json fail", response);
            })

            return responseData;
        }

        return {'error': "error fetching", response};

    }


};

export default PortfolioApi;