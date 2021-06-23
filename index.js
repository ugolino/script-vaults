const getExpiredOTokens = require('./getExpiredOTokens');
const getExpiryPrices = require('./getExpiryPrices');
// const getVaults = require('./getVaults');


async function runScript() {

  const expiredOtokens = await getExpiredOTokens.run();

  // const expiredAddresses = expiredOtokens.map( otoken => otoken.id );

  const expiryPrices = await getExpiryPrices.run();
  
  // const vaults = await getVaults.run();

  ITMtokens = []

  expiredOtokens.map( token => {
    const expPrice = expiryPrices.filter(price => 
    { return price.expiry === token.expiryTimestamp && price.asset.id === token.underlyingAsset.id}
    )[0].price / 1e8

    const isPut = token.isPut
    const strikePrice = token.strikePrice / 1e8
    const totalSupply = token.totalSupply / 1e8

    const ITM = isPut ? Number(strikePrice) > Number(expPrice) : Number(strikePrice) < Number(expPrice)

    if (ITM) {

      const ITMAmount = isPut ? Number(strikePrice) - Number(expPrice) : Number(expPrice) - Number(strikePrice)

      ITMtokens.push({
        address: token.id,
        strikePrice: strikePrice,
        isPut: isPut,
        expPrice: expPrice,
        totalSupply: totalSupply,
        ITM: ITM,
        ITMAmount: ITMAmount,
        totalITM: (totalSupply * ITMAmount)
      })
    }
    
  })

  console.log(ITMtokens)

  const totToRedeem = ITMtokens.reduce(function (prev, cur) {
    return prev + cur.totalITM;
  }, 0);

  console.log(totToRedeem)

}

runScript();


runScript();