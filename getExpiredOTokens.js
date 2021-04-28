const axios = require('axios');
const utils = require('./utils');
const subgraphEndpoint = utils.subgraphEndpoint;

exports.run = async () => {

  const currentTimestamp = Math.floor(Date.now() / 1000)

  const query = `
    {
      otokens (first: 1000, where: {expiryTimestamp_lt: ${currentTimestamp}} ) {
        underlyingAsset {
          id
        }
        id
        expiryTimestamp
      }
    }`;

  const response = await axios.post(
    subgraphEndpoint,
    JSON.stringify({ query })
  );

  const otokens = response.data.data.otokens;

  return otokens;

}