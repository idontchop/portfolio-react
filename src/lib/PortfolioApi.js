
// dev
//const portfolioUrl = "http://localhost:8080/portfolio";
// prod
const portfolioUrl = process.env.NODE_ENV === "development" ?
    "http://localhost:8080/portfolio" : "https://idontchop.com/portfolio";

const buildHeaders = (method, type, formData) => {

    let bheaders = new Headers();
    
    let params = new URLSearchParams(window.location.search);

    if ( params.has("t")) {
        bheaders.append('Authorization', 'Bearer ' + params.get("t"));
    }
    else if (window.localStorage.hasOwnProperty('token')) {
        bheaders.append ('Authorization', 'Bearer ' + window.localStorage.getItem("token"));
    }

    // token in url always higher priority
  
    if ( type === 'json' ) {
        bheaders.append ('Accept', 'application/json');
        bheaders.append ('Content-type', 'application/json');
    }
    
    return {
        method: method,
        headers: bheaders,
        body: type === 'form' ? formData : JSON.stringify(formData)
    }
}

// argument passed to know which url to use
const urlExt = {
    profilePic: `/me/image`,
    profile: `/me/profile`,
    user: `/user`,
    formLogin: `/login`,
    newFormUser: `/newFormUser`,
    guestBook: `/guestBook`,
    uploadImage: `/uploadImage`
}

const buildUrl = (type) => {
    return portfolioUrl + urlExt[type];
}

const buildUrlWithPathParam = (type, pathParam) => {
    return portfolioUrl + urlExt[type] + "/" + pathParam;
}

/**
 * Accepts a response object and runs checks that the fetch successed.
 * Returns boolean true / false
 */
const checkResponse =  (response) => {

    if ( response && response.status === 200 )
        return true;
    else return false;
}

/**
 * Gets the payload or returns an object with 'error' and 'errorMessage' keys
 * accepts parameters response, type: 'json' 'blob'
 */
const getPayload = async (response, type) => {

    let responseData;
    if ( type === 'json') {
        responseData = await response.json().catch ( () => {
            // failed to extract payload
            throw {'error': response.status, 'errorMessage': "json extraction failed"}
        })
    } else if ( type === 'blob' ) {
        responseData = await response.blob().catch ( () => {
            // failed to extract blob payload
            throw {'error': response.status, 'errorMessage': "data extraction failed"}
        })
    }

    // successful data retrieval
    return responseData;
}

/**
 * Used for interacting with the Spring backend. 
 * Return will include an object with key "error" if
 * problem fetching
 */
const PortfolioApi = {

    setToken: ( token ) => {
        window.localStorage.setItem('token',token);
    },
    logout: () => {
        window.localStorage.removeItem('token');
    },
    // form login
    postForm: async (type, formData) => {

        let response = await fetch (
            buildUrl(type),
            buildHeaders('post','form',formData)
            ).catch ( () => {
                console.log("form post failed", buildUrl(type));
            })
        
        if ( !checkResponse(response) ) {
            throw {'error': response.status, 'errorMessage': "Error returned from Post"}
        }

        return await getPayload(response,'json').catch ( (err) => {
            throw err;
        })
    },

    // unused, but sends data as post
    postJson: (type, formData) => PortfolioApi.putJson(type, formData, 'post'),
    // for updating profile
    putJson: async (type, formData, method = 'put') => {

        let response = await fetch ( 
             buildUrl(type),
             buildHeaders(method,'json',formData)
             ).catch ( () => {
                 console.log("fetch failed",buildUrl(type));
             })

        if ( !checkResponse(response) ) {
            throw {'error': response.status, 'errorMessage': "Error putting"}
        }

        return await getPayload(response,'json').catch ( (err) => {
            throw err;
        })

    },

    // for retrieving data (profile, guestbook)
    getJson: async (type, pathParam) => {

        let url = buildUrl(type);
        if (!!pathParam) {
            url = buildUrlWithPathParam(type, pathParam);
        }

        let response = await fetch ( url,
        buildHeaders('get','json')).catch ( () => {
            console.log("fetch failed",buildUrl(type));
        })

        if ( !checkResponse(response) ) {
            throw {'error': response.status, 'errorMessage': "error retrieving"};
        }

        return await getPayload(response,'json').catch ( (err) => {
            throw err;
        })
    },

    getPic: async (type) => {

        let response = await fetch ( buildUrl(type),
            buildHeaders('get','pic')
            ).catch ( () => {
                console.log("fetch failed",buildUrl(type));
            })

        if ( !checkResponse(response) ) {
            throw { 'error': response.status, 'message': "load pic failed"};
        }

        return await getPayload(response,'blob').catch ( (err) => {
            throw err;
        })
    }


};

export default PortfolioApi;