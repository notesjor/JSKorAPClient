export default class userInfo {
    /**
     * @param {string} bearerToken - authentication token (use korapJsClient/auth.js to get one)
     * @param {string} clientId - client id (null > default OWID-Client)
     * @param {function} func - callback function - returns the result of the search as json
     */
    getUserInfo(bearerToken, clientId = null, func) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + bearerToken);
    
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        if(clientId != null)
            clientId = "Nmb74mrP74m9rfTFRNdLf7";
    
        var url = "https://korap.ids-mannheim.de/api/oauth2/client/" + clientId;
        fetch(url, requestOptions)
          .then((response) => {
            //if (response.status != 200) throw new Error("INFO faild");
            if (response.status != 200){
              console.log(response.status);
              console.log(response.statusText);
              throw new Error("INFO faild");
            } 
            return response;
          })
          .then((response) => response.json())
          .then((json) => {
            func(json);
          })
          .catch((error) => {
            console.log("error", error);
            func(false);
          });
    }
  }