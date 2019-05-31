var Request = require("request");

Request.get("https://nvxhqhbiwh.execute-api.us-east-1.amazonaws.com/test/blockstack-sentio-api-handler-node", (error, response, body) => {
    if(error) {
        return console.log(error);
    }
    console.log(JSON.parse(body));
});