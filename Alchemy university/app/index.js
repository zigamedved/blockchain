const axios = require('axios');

const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/waEiqvj3Y6iFYM2m6CiCU8QZ1AJPBwtG";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
 "method": "web3_sha3",
  "params": [
     "0x68656c6c6f20776f726c64"
  ],
}).then((response) => {
  console.log(response.data.result);
});