# Stack Information
This file contains information about Alexandria Browser's stack. What services it needs to connect to, as well as core modules. This is for development reference only.

## Core Modules

### Wallet
Needs to have functions to generate new addresses, sign messages, publish transactions with comments (only FLO).
#### BTC
Regular Bitcoin wallet.
#### LTC
Regular Litecoin wallet.
#### FLO
Regular Florincoin wallet.
#### BTC LN
Bitcoin Lightning Network wallet.
#### LTC LN
Litecoin Lightning Network wallet.
#### FLO LN
Florincoin Lightning Network wallet.

## Services
The browser needs to connect to a number of API's that provide a variety of services. I have outlined the API's we connect to, as well as what they are used for and what data in them is used.

### Alexandria API Sub-Services
[https://api.alexandria.io/docs/](https://api.alexandria.io/docs/)
#### LibraryD
The LibraryD Service should hook up to the following function
##### Get All Publishers
Should return a JSON array, this is just a simple API call. https://api.alexandria.io/docs/#get-all-publishers
##### Get a Specific Publisher
Should return a JSON array, this is just a simple API call, however it should allow variables for the different search types. https://api.alexandria.io/docs/#get-a-specific-publisher
##### Get All Artifacts
Should return a JSON array, this is just a simple API call. https://api.alexandria.io/docs/#get-all-artifacts
##### Get a Specific Artifact
Should return a JSON array, this is just a simple API call, however it should allow variables for the different search types. https://api.alexandria.io/docs/#get-a-specific-artifact
##### Sign Publisher
This funtion should hook up to the wallet core module to use it to sign a message then return the signature.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L6](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L6)
##### Sign Artifact
This funtion should hook up to the wallet core module to use it to sign a message then return the signature.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L14](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L14)
##### Sign Artifact Deactivate
This funtion should hook up to the wallet core module to use it to sign a message then return the signature.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L22](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L22)
##### Publish Artifact
This function should accept [OIP 041 Artifact JSON](https://github.com/oipwg/media-protocol#publish-artifact), then take that JSON and publish it in transactions to the Florincoin Blockchain. Care needs to be taken that if multiple transactions are needed, the multi-part artifact format is still valid. This mainly needs to interact with the wallet module.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L30](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L30)
##### Register Publisher
This function should accept a JSON object, then take that JSON and publish it in transactions to the Florincoin Blockchain. Care needs to be taken that if multiple transactions are needed, the multi-part artifact format is still valid. This mainly needs to interact with the wallet module. This will be used upon user registration to register the username to a Florincoin address to use as the "Publisher" address.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L82](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L82)
##### Announce Publisher
Same as Register.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L87](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L87)
##### Send Deactivation Message
This function should accept [OIP 041 Artifact Deactivation JSON](https://github.com/oipwg/media-protocol#deactivate-artifact), then take that JSON and publish it in transactions to the Florincoin Blockchain. Care needs to be taken that if multiple transactions are needed, the multi-part artifact format is still valid. This mainly needs to interact with the wallet module. This will be used upon user registration to register the username to a Florincoin address to use as the "Publisher" address.
[https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L120](https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/libraryd-js.js#L120)
##### Send Edit Message
This function should accept [OIP 041 Artifact Edit JSON](https://github.com/oipwg/media-protocol#edit-artifact), then take that JSON and publish it in transactions to the Florincoin Blockchain. Care needs to be taken that if multiple transactions are needed, the multi-part artifact format is still valid. This mainly needs to interact with the wallet module. This will be used upon user registration to register the username to a Florincoin address to use as the "Publisher" address.
##### Send Transfer Message
This function should accept [OIP 041 Artifact Transfer JSON](https://github.com/oipwg/media-protocol#transfer-artifact), then take that JSON and publish it in transactions to the Florincoin Blockchain. Care needs to be taken that if multiple transactions are needed, the multi-part artifact format is still valid. This mainly needs to interact with the wallet module. This will be used upon user registration to register the username to a Florincoin address to use as the "Publisher" address.
#### Florincoin Market Data
This is just an API endpoint that needs to be called. We use it to get the latest Florincoin price for our FLO to USD/BTC calculations (used upon publish & payment stuff)
https://api.alexandria.io/docs/#get-market-data
#### Search Florincoin TX Comment
Should be pretty self explanitory
https://api.alexandria.io/docs/#search-florincoin-tx-comments
#### Tradebot
The Tradebot service needs to connect to the Tradebot API as well as the Blockchain.info websocket to listen for incoming payments. You can find code for how it was last implemented here: https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/tradebot.js

https://api.alexandria.io/docs/#tradebot
#### Payment Processor
This is used to help process transactions. It serves a new BTC address to the user for the user to send payment to, then forwards it on to the creator at a later time. We need per user addresses so that we can properly listen for transactions, since others might be also paying at the same time and we do not want only a single person to be required to pay.
https://api.alexandria.io/docs/#payment-processor
### IPFS
We need to be able to both retreive files and add/modify files inside of IPFS. The service should handle the loading of IPFS file torrents and return either a URL to the resource, or a file buffer (to be streamed into our players). A file buffer is preferred over a URL so that we can abstract up one layer and hide that from the end user.
### Blockchain.info
We need to use websockets to listen for transactions to Bitcoin addresses. We currently use the following code for this: https://github.com/dloa/publisher-web/blob/7490dd40ad35dc1c7ad161c6901a6a0d5f85553c/js/tradebot.js#L44
### 