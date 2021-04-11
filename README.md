# Hikvision-DDNS

Node API server made to mimick a Dyn-Dns members API server.
Intended to be used on Hikvision devices where you dont want to use DynDns as your Dynamic DNS provider.
Uses Cloudflare for Dynamic DNS.

## Setup

Using the Hikvision Network SDK, available [here](https://www.hikvision.com/en/support/download/sdk/device-network-sdk--for-windows-64-bit-/) you can edit your DDNS server, port and domain and
make them point to your server.

Create your own `.env` file and in it place the following data:
```
CF_TKN=<YOUR API TOKEN>
CF_ZONE_ID=<YOUR ZONE ID>
```
You can create your API token in the Cloudflare dashboard.
Get your `CF_ZONE_ID` from your domain's dashboard by scrolling down and then copy the ZONE ID string

## Install and RUN

Clone the repo and run `npm i` to install all dependecies.
After that simply run `node .\server.js` and you are up and running.

The app listens on path '/nic/update' as this is the endpoint that dyn-dns members API uses.

Would reccomend to host in on AWS or GCP for free or on your own server with pm2, available [here](https://www.npmjs.com/package/pm2).