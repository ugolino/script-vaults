const axios = require('axios');
const utils = require('./utils');
const subgraphEndpoint = utils.subgraphEndpoint;

exports.run = async () => {

  // Tue Apr 20 2021 08:00:00 GMT+0000
  const currentTimestamp = 1618905600

  const query = `
    {
      otokens (first: 1000, where: {expiryTimestamp_lt: ${currentTimestamp}} ) {
        underlyingAsset {
          id
        }
        id
        expiryTimestamp
        strikePrice
        isPut
        totalSupply
      }
    }`;

  const response = await axios.post(
    subgraphEndpoint,
    JSON.stringify({ query })
  );

  const otokens = response.data.data.otokens;

  return otokens;

}