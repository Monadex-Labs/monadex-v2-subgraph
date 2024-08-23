// naming in line with subgraph config convention
const ETH_SEPOLIA = "arbitrum-sepolia"
const MONAD_TESTNET = "camelot-gravity"
const MONAD_MAINNET = "camelot-proofofplay-apex"

class ChainInfo {
  configName: string;
  factory: string;
  wrappedNative: string;
  wrappedNativeUSDCPool: string;
  whitelistTokens: Array<string>;
  stableCoin: string;
  startBlock: number;
  minimumUSDThresholdNewPairs: string;
  minimumLiquidityThresholdETH: string;
  minimumLiquidityETH: string;


  constructor(
    configName: string,
    factory: string,
    wrappedNative: string,
    wrappedNativeUSDCPool: string,
    whitelistTokens: Array<string>,
    stableCoin: string,
    startBlock: number,
    minimumUSDThresholdNewPairs: string,
    minimumLiquidityThresholdETH: string,
    minimumLiquidityETH: string
  ) {
    this.configName = configName.toLowerCase()
    this.factory = factory.toLowerCase()
    this.wrappedNative = wrappedNative.toLowerCase()
    this.wrappedNativeUSDCPool = wrappedNativeUSDCPool.toLowerCase()
    this.whitelistTokens = whitelistTokens
    this.stableCoin = stableCoin.toLowerCase()
    this.startBlock = startBlock
    this.minimumUSDThresholdNewPairs = minimumUSDThresholdNewPairs
    this.minimumLiquidityThresholdETH = minimumLiquidityThresholdETH
    this.minimumLiquidityETH = minimumLiquidityETH
  }
}

class SupportedChains {
  ethereumSepolia: ChainInfo;
  monadTestnet: ChainInfo;
  monadMainnet: ChainInfo;


  constructor(ethereumSepolia: ChainInfo, monadTestnet: ChainInfo, monadMainnet: ChainInfo) {
    this.ethereumSepolia = ethereumSepolia
    this.monadTestnet = monadTestnet
    this.monadMainnet = monadMainnet
    
  }
}

const ethereumSepolia = new ChainInfo(
  ETH_SEPOLIA,
  "0x3FB48a9b88685Fb14DcfBE65553200b1790964E1",  // factory
  '0x5b511870E0B832aDcA698E8DE4A55B809753473f',  // wEth - wMND  TKNa - TKNb
  '0x84652bb2539513baf36e225c930fdd8eaa63ce27',  // LP  Weth - USDC  ADD ONCE I HAVE IT
  // tracked tokens TESTNET
  [
    '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // WETH
    '0x88F36174228b0Ef71B56a144cB24E5812EDCFEBB', // TOKENA
    '0x445Cf35C1E65FBe2151c95e5d62848aC26e07Ce6', // TOKB
    '0x229584467fADea35489fE9b3eDdc3E5A908eA332', // CHARM
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831', // USDC
    '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0', // USDT
    '0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6', // DAI
  ],
  "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
  6536001,
  "500",
  "0.5",
  "50"
)

// add deployement address once is deployed to MONAD
const monadTestnet = new ChainInfo(
  MONAD_TESTNET,
  "0x18E621B64d7808c3C47bccbbD7485d23F257D26f",
  "0x980b62da83eff3d4576c647993b0c1d7faf17c73",
  "0x35142e6410a060546f89fe5dc865eb13fdff5514",
  [
    '0x980b62da83eff3d4576c647993b0c1d7faf17c73', // WETH
    '0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7', // USDC
  ],
  "0xb893e3334d4bd6c5ba8277fd559e99ed683a9fc7",
  8780258,
  "500",
  "0.5",
  "50"
)
// add deployement address once is deployed to MONAD MAINNET 
const monadMainnet = new ChainInfo(
  MONAD_MAINNET,
  "0x7d8c6B58BA2d40FC6E34C25f9A488067Fe0D2dB4", // factory
  "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
  "0xA67C07b61dBB705441A1f09cA6D405317175c2b1", // WG-USDC
  [
    "0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD", // WG
    "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
    "0x816E810f9F787d669FB71932DeabF6c83781Cd48", // USDT
    "0xf6f832466Cd6C21967E0D954109403f36Bc8ceaA", // WETH
    "0x729ed87bbE7B7e4B7F09BCb9c668580818d98BB9", // WBTC
    "0xBFBBc4dA47508e85AC18DFC961fa182194E85f9a", // DAI
  ],
  "0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6", // USDC
  11985,
  "500",
  "100",
  "100000"
)

const supportedChains = new SupportedChains(
 ethereumSepolia,
 monadMainnet,
 monadTestnet
)

// Edit this for the given deployment
const TARGET_CHAIN: ChainInfo = supportedChains.ethereumSepolia

export {
  TARGET_CHAIN
}