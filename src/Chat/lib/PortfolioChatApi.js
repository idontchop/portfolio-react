
const portfolioChatUrl = process.env.NODE_ENV === "development" ?
"http://localhost:8080/portfolioChat/" : "https://idontchop.com/portfolioChat/";

/**
 * 
 * @param {} method 
 * @param {*} type 
 * @param {*} formData 
 */
const buildHeaders = (method, type, formData) => {

    let bheaders = new Headers();

    // Note: if this fails, the api will also likely fail
    // This module shouldn't be called without authenticated user
    // If anonymous chat feature required, temp JWT token should still
    // be supplied.
    if (window.localStorage.hasOwnProperty('token')) {
        bheaders.append ('Authorization', 'Bearer ' + window.localStorage.getItem("token"));
    }

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

/**
 * Gets the payload or returns an error object with 'error' and 'errorMessage' keys
 * accepts parameters response, type: 'json' 'blob'
 * 
 * @param {*} response from api call
 * @param {json, blob} type 
 */
const getPayload = async (response, type) => {

    let responseData;
    if ( type === 'json') {
        responseData = await response.json().catch ( () => {
            // failed to extract payload
            throw Error({'error': response.status, 'errorMessage': "json extraction failed"})
        })
    } else if ( type === 'blob' ) {
        responseData = await response.blob().catch ( () => {
            // failed to extract blob payload
            throw Error({'error': response.status, 'errorMessage': "data extraction failed"})
        })
    }

    // successful data retrieval
    return responseData;
}


const buildParams = (params) => {
    let paramsString = "?";
    Object.keys(params).forEach( p => {
        paramsString += (p.key + ":" + params[p] + ",")
    });
    return paramsString;
}

/**
 * If passed a full url, this does nothing, otherwise
 * returns the default url if no argument
 * if argument doens't start with http, returns default
 * url plus the argument path
 * 
 * @param {full url or path ext} pathParam 
 */
const buildUrlWithPathParam = (pathParam = portfolioChatUrl) => {
    
    return (pathParam.startsWith("http") ) ? 
            pathParam : portfolioChatUrl + pathParam + '/';
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
 * This chat api always expects to be a child of a parent app
 * that will handle the JWT token authentication.
 */
const PortfolioChatApi = {

    // for retrieving data (profile, guestbook)
    getJson: async (pathParam, params) => {

        let url;
        if (!!pathParam) {
            url = buildUrlWithPathParam(pathParam);
        } else {
            url = portfolioChatUrl;
        }

        if (!!params) {
            url += buildParams(params);
        }

        let response = await fetch ( url,
        buildHeaders('get','json')).catch ( () => {
            console.log("fetch failed",url);
        })

        if ( !checkResponse(response) ) {
            throw Error({'error': !!response ? response.status: "failed", 'errorMessage': "error retrieving"});
        }

        return await getPayload(response,'json').catch ( (err) => {
            throw err;
        })
    },

    // unused, but sends data as post
    postForm: (pathParam, formData) => PortfolioChatApi.putForm(pathParam, formData, 'post'),
    // for updating profile
    putForm: async (pathParam, formData, method = 'put') => {

        let url;
        if (!!pathParam) {
            url = buildUrlWithPathParam(pathParam);
        } else {
            url = portfolioChatUrl;
        }

        let response = await fetch ( 
                url,
                buildHeaders(method,'form',formData)
                ).catch ( () => {
                    console.log("fetch failed",url);
                })

        if ( !checkResponse(response) ) {
            throw Error({'error': response.status, 'errorMessage': `Error ${method}ting - ${url}`})
        }

        return await getPayload(response,'json').catch ( (err) => {
            throw err;
        })

    },
}

export default PortfolioChatApi;