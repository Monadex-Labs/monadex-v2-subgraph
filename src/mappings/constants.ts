import { Factory as FactoryContract } from '../../generated/templates/Pair/Factory'
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { TARGET_CHAIN } from '../config/chains'

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
const FACTORY_ADDRESS = TARGET_CHAIN.factory
const WRAPPED_NATIVE = TARGET_CHAIN.wrappedNative
const WRAPPED_NATIVE_USDC_POOL = TARGET_CHAIN.wrappedNativeUSDCPool
const WHITELIST = TARGET_CHAIN.whitelistTokens
const STABLE = TARGET_CHAIN.stableCoin
const MINIMUM_USD_THRESHOLD_NEW_PAIRS = TARGET_CHAIN.minimumUSDThresholdNewPairs
const MINIMUM_LIQUIDITY_THRESHOLD_ETH = TARGET_CHAIN.minimumLiquidityThresholdETH
const MINIMUM_LIQUIDITY_ETH = TARGET_CHAIN.minimumLiquidityETH

let ZERO_BI = BigInt.fromI32(0)
let ONE_BI = BigInt.fromI32(1)
let ZERO_BD = BigDecimal.fromString('0')
let ONE_BD = BigDecimal.fromString('1')
let BI_18 = BigInt.fromI32(18)
let BD_PAIR_DEFAULT_FEE_AMOUNT = BigDecimal.fromString('0.3')

let factoryContract = FactoryContract.bind(Address.fromString(FACTORY_ADDRESS))

// rebass tokens, d'ont count in tracked volume
let UNTRACKED_PAIRS: string[] = ['']

export {
  ADDRESS_ZERO,
  FACTORY_ADDRESS,
  WRAPPED_NATIVE,
  WRAPPED_NATIVE_USDC_POOL,
  ZERO_BI,
  ONE_BI,
  ZERO_BD,
  ONE_BD,
  BI_18,
  BD_PAIR_DEFAULT_FEE_AMOUNT,
  factoryContract,
  UNTRACKED_PAIRS,
  WHITELIST,
  STABLE,
  MINIMUM_USD_THRESHOLD_NEW_PAIRS,
  MINIMUM_LIQUIDITY_THRESHOLD_ETH,
  MINIMUM_LIQUIDITY_ETH
}
