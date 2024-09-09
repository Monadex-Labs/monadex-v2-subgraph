// naming in line with subgraph config convention
const ETH_SEPOLIA = "base-sepolia"
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
  "0x5f1498f06d631f010183D5DE08Af835c60eB1cd2",  // factory
  '0x6D592e80D896F11d505a7B5CF66b218C656c82c7',  // WETH - MDX pool
  '0x0FEe29dBa85391AD8D117FB9655B68116F2665d3',  // LP  Weth - USDC  Pool
  
  // tracked tokens TESTNET
  [
    '0x4200000000000000000000000000000000000006', // WETH
    '0xe7Ac0E38a0bAAFeb3e5cBa94E2fbAE44511D0F8A', // MDX
    '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC
    '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06', // USDT
  ],
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
  19455530,
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
  "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
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