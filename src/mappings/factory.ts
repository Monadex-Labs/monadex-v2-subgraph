/* eslint-disable prefer-const */
import {log} from '@graphprotocol/graph-ts'
import { PoolCreated } from '../../generated/Factory/Factory'
import { Bundle, Pair, Token, UniswapFactory } from '../../generated/schema'
import { Pair as PairTemplate } from '../../generated/templates'
import {
  fetchTokenDecimals,
  fetchTokenName,
  fetchTokenSymbol,
  // fetchTokenTotalSupply,
} from './helpers'
import {
  FACTORY_ADDRESS,
  ZERO_BD,
  ZERO_BI,
  BD_PAIR_DEFAULT_FEE_AMOUNT
} from "./constants"
import {BigInt} from "@graphprotocol/graph-ts/index";

let BLACKLISTED_PAIRS: string[] = [
  // '0x6a78e84fa0edad4d99eb90edc041cdbf85925961', // AIDOGE/WETH
]

export function handleNewPair(event: PoolCreated): void {
  // load factory (create if first exchange)
  let factory = UniswapFactory.load(FACTORY_ADDRESS)
  if (factory === null) {
    factory = new UniswapFactory(FACTORY_ADDRESS)
    factory.pairCount = 0
    factory.totalVolumeETH = ZERO_BD
    factory.totalLiquidityETH = ZERO_BD
    factory.totalVolumeUSD = ZERO_BD
    factory.untrackedVolumeUSD = ZERO_BD
    factory.totalLiquidityUSD = ZERO_BD
    factory.totalFeeUSD = ZERO_BD
    factory.totalFeeETH = ZERO_BD
    factory.txCount = ZERO_BI

    // create new bundle
    let bundle = new Bundle('1')
    bundle.ethPrice = ZERO_BD
    bundle.save()
  }
  factory.pairCount = factory.pairCount + 1
  factory.save()

  // create the tokens
  let tokenA = Token.load(event.params.tokenA.toHexString())
  let tokenB = Token.load(event.params.tokenB.toHexString())

  // fetch info if null
  if (tokenA === null) {
    tokenA = new Token(event.params.tokenA.toHexString())
    tokenA.symbol = fetchTokenSymbol(event.params.tokenA)
    tokenA.name = fetchTokenName(event.params.tokenA)
    tokenA.totalSupply = ZERO_BI
    let decimals = fetchTokenDecimals(event.params.tokenA)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token 0 was null', [])
      return
    }

    tokenA.decimals = decimals
    tokenA.derivedETH = ZERO_BD
    tokenA.tradeVolume = ZERO_BD
    tokenA.tradeVolumeUSD = ZERO_BD
    tokenA.untrackedVolumeUSD = ZERO_BD
    tokenA.totalLiquidity = ZERO_BD
    // tokenA.allPairs = []
    tokenA.txCount = ZERO_BI
  }

  // fetch info if null
  if (tokenB === null) {
    tokenB = new Token(event.params.tokenB.toHexString())
    tokenB.symbol = fetchTokenSymbol(event.params.tokenB)
    tokenB.name = fetchTokenName(event.params.tokenB)
    tokenB.totalSupply = ZERO_BI
    let decimals = fetchTokenDecimals(event.params.tokenB)

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      return
    }
    tokenB.decimals = decimals
    tokenB.derivedETH = ZERO_BD
    tokenB.tradeVolume = ZERO_BD
    tokenB.tradeVolumeUSD = ZERO_BD
    tokenB.untrackedVolumeUSD = ZERO_BD
    tokenB.totalLiquidity = ZERO_BD
    tokenB.txCount = ZERO_BI
  }

  let pair = new Pair(event.params.pool.toHexString()) as Pair
  pair.token0 = tokenA.id
  pair.token1 = tokenB.id
  pair.liquidityProviderCount = ZERO_BI
  pair.createdAtTimestamp = event.block.timestamp
  pair.createdAtBlockNumber = event.block.number
  pair.txCount = ZERO_BI
  pair.reserve0 = ZERO_BD
  pair.reserve1 = ZERO_BD
  pair.trackedReserveETH = ZERO_BD
  pair.reserveETH = ZERO_BD
  pair.reserveUSD = ZERO_BD
  pair.totalSupply = ZERO_BD
  pair.volumeToken0 = ZERO_BD
  pair.volumeToken1 = ZERO_BD
  pair.volumeUSD = ZERO_BD
  pair.untrackedVolumeUSD = ZERO_BD
  pair.token0Price = ZERO_BD
  pair.token1Price = ZERO_BD
  pair.token0Fee = BigInt.fromI32(300)
  pair.token1Fee = BigInt.fromI32(300)
  pair.token0FeePercent = BD_PAIR_DEFAULT_FEE_AMOUNT
  pair.token1FeePercent = BD_PAIR_DEFAULT_FEE_AMOUNT
  pair.feeUSD = ZERO_BD
  pair.isStable = false

  if(!(BLACKLISTED_PAIRS.includes(event.params.pool.toHex()))) {
    // create the tracked contract based on the template
    PairTemplate.create(event.params.pool)
  }

  // const tokenAAllPairs = tokenA.allPairs
  // const tokenBAllPairs = tokenB.allPairs
  // tokenAAllPairs.push(pair.id)
  // tokenBAllPairs.push(pair.id)
  // tokenA.allPairs = tokenAAllPairs
  // tokenB.allPairs = tokenBAllPairs

  // save updated values

  tokenA.save()
  tokenB.save()
  pair.save()
  factory.save()
}
