const axios = require('axios');
const utils = require('./utils');
const subgraphEndpoint = utils.subgraphEndpoint;

exports.run = async () => {

    // Tue Apr 20 2021 08:00:00 GMT+0000
    const currentTimestamp = 1618905600


    const query = `
        {
          expiryPrices( first: 1000, where: {expiry_lt: ${currentTimestamp}} ) {
            price
            expiry
            asset {
              id
            }
          }
        }`;

    const response = await axios.post(
      subgraphEndpoint,
      JSON.stringify({ query })
    );

  const expiryPrices = response.data.data.expiryPrices;

  return expiryPrices

  

}