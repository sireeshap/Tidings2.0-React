import React, {Component} from 'react';

async function APIService(countrycode) {
    try {
        let results = await fetch(process.env.REACT_APP_API_URL + 'top-headlines?country=' + countrycode + '&apiKey=' + process.env.REACT_APP_API_KEY)
        let responseJson = await results.json();
        return responseJson;
    } catch (error) {
        return (
            <div>Somethinhg went wrong. Sorry for inconvinance</div>
        )
    }

}
export default APIService;

// export default class APIService{   static myInstance = null;   static
// getAPIServiceInstance() {     return new APIService();   }   async
// callAPI(countrycode) {     try{       let response = await
// fetch(process.env.REACT_APP_API_URL+'top-headlines?country='+countrycode+'&api
// Key='+process.env.REACT_APP_API_KEY)       let responseJson = await
// response.json();       return responseJson     }           catch(error){
//        return (<div>Somethinhg went wrong. Sorry for inconvinance</div>)
//      }   }   }