const axios = require('axios');
const utils = require('./utils');
const subgraphEndpoint = utils.subgraphEndpoint;

exports.run = async () => {

  const query = `
    {
      vaults(first: 1000){
        id
        shortOToken {
          id
        }
        longOToken {
          id
        }
        collateralAsset {
          id
          decimals
          symbol
        }
        shortAmount
        longAmount
        collateralAmount
      }
    }`;

  

  const response = await axios.post(
    subgraphEndpoint,
    JSON.stringify({ query })
  );

  const vaults = response.data.data.vaults;

  return vaults;

}