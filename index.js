const getExpiredOTokens = require('./getExpiredOTokens');
const getVaults = require('./getVaults');


// async function runScript() {

//   const expiredOtokens = await getExpiredOTokens.run();

//   const expiredAddresses = expiredOtokens.map( otoken => otoken.id );
  
//   const vaults = await getVaults.run();

//   // filter vaults with expired short tokens and with collateral not null
//   const vaultsWithExpiredOTokens = vaults.filter( vault => {
//     const hasShortOToken = vault.shortOToken && expiredAddresses.includes(vault.shortOToken.id);
//     const hasCollateral = vault.collateralAmount
//     return hasShortOToken && hasCollateral
//   });
  
//   // group by collateralAsset and sum collateral
//   let totalCollateralAmount = [];
//   vaultsWithExpiredOTokens.reduce(function (res, value) {
//     if (!res[value.collateralAsset.symbol]) {
//       res[value.collateralAsset.symbol] = { token: value.collateralAsset.symbol, collateralAmount: 0 };
//       totalCollateralAmount.push(res[value.collateralAsset.symbol])
//     }
//     res[value.collateralAsset.symbol].collateralAmount += Number(value.collateralAmount) / 10 ** value.collateralAsset.decimals;
//     return res;
//   }, {});

//   console.log(totalCollateralAmount)

// }

// runScript();

async function runScript() {

  const expiredOtokens = await getExpiredOTokens.run();

  const expiredAddresses = expiredOtokens.map( otoken => otoken.id );

  const vaults = await getVaults.run();

  // filter vaults with expired long tokens
  const vaultsWithExpiredOTokens = vaults.filter( vault => {
    const hasLongOToken = vault.longOToken && expiredAddresses.includes(vault.longOToken.id);
    return hasLongOToken
  });

  console.log(vaultsWithExpiredOTokens)

  // filter vaults with colleteral only and group by collateralAsset and sum collateral
  let totalCollateralAmount = [];
  vaultsWithExpiredOTokens.filter(vault => vault.collateralAsset).reduce(function (res, value) {
    if (!res[value.collateralAsset.symbol]) {
      res[value.collateralAsset.symbol] = { token: value.collateralAsset.symbol, collateralAmount: 0 };
      totalCollateralAmount.push(res[value.collateralAsset.symbol])
    }
    res[value.collateralAsset.symbol].collateralAmount += Number(value.collateralAmount) / 10 ** value.collateralAsset.decimals;
    return res;
  }, {});

  console.log(totalCollateralAmount)



}

runScript();