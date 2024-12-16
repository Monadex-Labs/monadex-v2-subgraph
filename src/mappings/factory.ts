/* eslint-disable prefer-const */
import { log } from '@graphprotocol/graph-ts'
import { MonaFactory, Pair, Token, Bundle } from '../types/schema'
import { PoolCreated } from '../types/Factory/Factory'
import { Pair as PairTemplate } from '../types/templates'
import {
  FACTORY_ADDRESS,
  ZERO_BD,
  ZERO_BI,
  fetchTokenSymbol,
  fetchTokenName,
  fetchTokenDecimals,
  fetchTokenTotalSupply
} from './helpers'
import { isOnBlacklist, isOnWhitelist } from './pricing'

// export function handleNewPair(event: PoolCreated): void {
//   // load factory (create if first exchange)
//   let factory = UniswapFactory.load(FACTORY_ADDRESS) as UniswapFactory
//   if (factory === null) {
//     factory = new UniswapFactory(FACTORY_ADDRESS)
//     factory.pairCount = 0
//     factory.totalVolumeETH = ZERO_BD
//     factory.totalLiquidityETH = ZERO_BD
//     factory.totalVolumeUSD = ZERO_BD
//     factory.untrackedVolumeUSD = ZERO_BD
//     factory.totalLiquidityUSD = ZERO_BD
//     factory.txCount = ZERO_BI

//     // create new bundle
//     let bundle = new Bundle('1')
//     bundle.ethPrice = ZERO_BD
//     bundle.save()
//     factory.save()
//   }
//   factory.pairCount = factory.pairCount + 1
//   factory.save()

//   // create the tokens
//   let token0 = Token.load(event.params.tokenA.toHexString())
//   let token1 = Token.load(event.params.tokenA.toHexString())

//   // fetch info if null
//   if (token0 === null) {
//     token0 = new Token(event.params.tokenA.toHexString())
//     if (isOnBlacklist(token0.id)) {
//       return;
//     }
//     token0.symbol = fetchTokenSymbol(event.params.tokenA)
//     token0.name = fetchTokenName(event.params.tokenA)
//     token0.totalSupply = fetchTokenTotalSupply(event.params.tokenA)
//     let decimals = fetchTokenDecimals(event.params.tokenA)
//     // bail if we couldn't figure out the decimals
//     if (decimals === null) {
//       log.debug('mybug the decimal on token 0 was null', [])
//       return
//     }

//     token0.decimals = decimals
//     token0.derivedETH = ZERO_BD
//     token0.tradeVolume = ZERO_BD
//     token0.tradeVolumeUSD = ZERO_BD
//     token0.untrackedVolumeUSD = ZERO_BD
//     token0.totalLiquidity = ZERO_BD
//     // token0.allPairs = []
//     token0.whitelist = []
//     token0.txCount = ZERO_BI
//   }

//   // fetch info if null
//   if (token1 === null) {
//     token1 = new Token(event.params.tokenB.toHexString())
//     if (isOnBlacklist(token1.id)) {
//       return;
//     }
//     token1.symbol = fetchTokenSymbol(event.params.tokenB)
//     token1.name = fetchTokenName(event.params.tokenB)
//     token1.totalSupply = fetchTokenTotalSupply(event.params.tokenB)
//     let decimals = fetchTokenDecimals(event.params.tokenB)

//     // bail if we couldn't figure out the decimals
//     if (decimals === null) {
//       return
//     }
//     token1.decimals = decimals
//     token1.derivedETH = ZERO_BD
//     token1.tradeVolume = ZERO_BD
//     token1.tradeVolumeUSD = ZERO_BD
//     token1.untrackedVolumeUSD = ZERO_BD
//     token1.totalLiquidity = ZERO_BD
//     // token1.allPairs = []
//     token1.whitelist = []
//     token1.txCount = ZERO_BI
//   }

//   if (isOnWhitelist(token1.id)) {
//     let white0 = token0.whitelist
//     white0.push(event.params.pool.toHexString())
//     token0.whitelist = white0
//   }

//   if (isOnWhitelist(token0.id)) {
//     let white1 = token1.whitelist
//     white1.push(event.params.pool.toHexString())
//     token1.whitelist = white1
//   }

//   let pair = new Pair(event.params.pool.toHexString()) as Pair
//   pair.s_tokenA = token0.id
//   pair.s_tokenB = token1.id
//   pair.liquidityProviderCount = ZERO_BI
//   pair.createdAtTimestamp = event.block.timestamp
//   pair.createdAtBlockNumber = event.block.number
//   pair.txCount = ZERO_BI
//   pair.s_reserveA = ZERO_BD
//   pair.s_reserveB = ZERO_BD
//   pair.trackedReserveETH = ZERO_BD
//   pair.reserveETH = ZERO_BD
//   pair.reserveUSD = ZERO_BD
//   pair.totalSupply = ZERO_BD
//   pair.volumeToken0 = ZERO_BD
//   pair.volumeToken1 = ZERO_BD
//   pair.volumeUSD = ZERO_BD
//   pair.untrackedVolumeUSD = ZERO_BD
//   pair.token0Price = ZERO_BD
//   pair.token1Price = ZERO_BD

//   // create the tracked contract based on the template
//   PairTemplate.create(event.params.pool)

//   // save updated values
//   token0.save()
//   token1.save()
//   pair.save()
//   factory.save()
// }
export function handleNewPair(event: PoolCreated): void {
  let factory = MonaFactory.load(FACTORY_ADDRESS);
  if (factory === null) {
    factory = new MonaFactory(FACTORY_ADDRESS);
    factory.pairCount = 0;
    factory.totalVolumeMON = ZERO_BD;
    factory.totalLiquidityMON = ZERO_BD;
    factory.totalValueLockedMON = ZERO_BD;
    factory.totalLiquidityUSD = ZERO_BD;
    factory.totalVolumeUSD = ZERO_BD;
    factory.untrackedVolumeUSD = ZERO_BD;
    factory.totalLiquidityUSD = ZERO_BD;
    factory.txCount = ZERO_BI;

    let bundle = new Bundle('1');
    bundle.monPrice = ZERO_BD;
    bundle.save();

    factory.save(); // Save factory after initialization
  }
  factory.pairCount += 1;
  factory.save();

  let token0 = Token.load(event.params.tokenA.toHexString());
  let token1 = Token.load(event.params.tokenB.toHexString()); // Fix here

  if (token0 === null) {
    token0 = new Token(event.params.tokenA.toHexString());
    if (isOnBlacklist(token0.id)) return;

    token0.symbol = fetchTokenSymbol(event.params.tokenA);
    token0.name = fetchTokenName(event.params.tokenA);
    token0.totalSupply = fetchTokenTotalSupply(event.params.tokenA);
    let decimals = fetchTokenDecimals(event.params.tokenA);

    if (decimals === null) {
      log.warning('Could not fetch decimals for token0: {}', [event.params.tokenA.toHexString()]);
      return;
    }

    token0.decimals = decimals;
    token0.derivedMON = ZERO_BD;
    token0.totalValueLocked = ZERO_BD;
    token0.totalValueLockedUSD = ZERO_BD;
    token0.tradeVolume = ZERO_BD;
    token0.tradeVolumeUSD = ZERO_BD;
    token0.untrackedVolumeUSD = ZERO_BD;
    token0.totalLiquidity = ZERO_BD;
    token0.whitelist = [];
    token0.txCount = ZERO_BI;
  }

  if (token1 === null) {
    token1 = new Token(event.params.tokenB.toHexString());
    if (isOnBlacklist(token1.id)) return;

    token1.symbol = fetchTokenSymbol(event.params.tokenB);
    token1.name = fetchTokenName(event.params.tokenB);
    token1.totalSupply = fetchTokenTotalSupply(event.params.tokenB);
    let decimals = fetchTokenDecimals(event.params.tokenB);

    if (decimals === null) {
      log.warning('Could not fetch decimals for token1: {}', [event.params.tokenB.toHexString()]);
      return;
    }

    token1.decimals = decimals;
    token1.derivedMON = ZERO_BD;
    token1.totalValueLocked = ZERO_BD;
    token1.totalValueLockedUSD = ZERO_BD;
    token1.tradeVolume = ZERO_BD;
    token1.tradeVolumeUSD = ZERO_BD;
    token1.untrackedVolumeUSD = ZERO_BD;
    token1.totalLiquidity = ZERO_BD;
    token1.whitelist = [];
    token1.txCount = ZERO_BI;
  }

  if (isOnWhitelist(token1.id)) {
    let white0 = token0.whitelist || [];
    white0.push(event.params.pool.toHexString());
    token0.whitelist = white0;
  }

  if (isOnWhitelist(token0.id)) {
    let white1 = token1.whitelist || [];
    white1.push(event.params.pool.toHexString());
    token1.whitelist = white1;
  }

  let pair = new Pair(event.params.pool.toHexString());
  pair.s_tokenA = token0.id;
  pair.s_tokenB = token1.id;
  pair.liquidityProviderCount = ZERO_BI;
  pair.createdAtTimestamp = event.block.timestamp;
  pair.createdAtBlockNumber = event.block.number;
  pair.txCount = ZERO_BI;
  pair.s_reserveA = ZERO_BD;
  pair.s_reserveB = ZERO_BD;
  pair.trackedReserveMON = ZERO_BD;
  pair.reserveMON = ZERO_BD;
  pair.totalValueLockedMON = ZERO_BD;
  pair.totalValueLockedUSD = ZERO_BD;
  pair.reserveUSD = ZERO_BD;
  pair.totalSupply = ZERO_BD;
  pair.volumeToken0 = ZERO_BD;
  pair.volumeToken1 = ZERO_BD;
  pair.volumeUSD = ZERO_BD;
  pair.untrackedVolumeUSD = ZERO_BD;
  pair.token0Price = ZERO_BD;
  pair.token1Price = ZERO_BD;

  PairTemplate.create(event.params.pool);

  token0.save();
  token1.save();
  pair.save();
  factory.save();
}
