const express = require('express');
const got = require('got');

require("dotenv").config();
const { CF_ZONE_ID, CF_TKN } = process.env;
const url = "https://api.cloudflare.com/client/v4/zones/" + CF_ZONE_ID + "/dns_records";


let app = express();
app.get('/nic/update', async(req, res) => {
    let recordID;
    let previousIP;

    const hostname = req.query.hostname
    console.log("Hostname: " + hostname);

    let remoteAddress = res.socket.remoteAddress.split(":");
    const ip = remoteAddress[remoteAddress.length - 1];
    console.log("Client IP: " + ip);

    //Getting Record ID from cloudflare
    try {
        const response = await got(url, {
            searchParams: {
                name: hostname
            },
            headers: {
                "Authorization": "Bearer " + CF_TKN,
                "Accept": "application/json"
            },
            responseType: 'json'
        });
        recordID = response.body.result[0].id;
        previousIP = response.body.result[0].content;
    } catch (error) {
        console.log(error);
        //=> 'Internal server error ...'
    }

    console.log("Previous IP: " + previousIP);

    // Updating record if required
    if (ip != previousIP) {
        try {
            const response = await got.put(url + "/" + recordID, {
                json: {
                    type: "A",
                    name: hostname,
                    ttl: 120,
                    content: ip
                },
                headers: {
                    "Authorization": "Bearer " + CF_TKN,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                responseType: 'json'
            });
            console.log("Success: " + response.body.success);
        } catch (error) {
            console.log("ERROR: " + error);
            //=> 'Internal server error ...'
        }

        res.send("good " + ip);
    } else {
        res.send("nochg " + ip);
    }

});

app.listen(80);