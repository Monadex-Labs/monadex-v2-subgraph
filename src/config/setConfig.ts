import fs from "fs"
import path from "path"
import yaml from "js-yaml"

import {
  TARGET_CHAIN,
  supportedChains,
  ARBITRUM_ONE
} from "./chains"

const {
  factory,
  startBlock,
} = supportedChains[TARGET_CHAIN]

const subgraphPath = path.join(path.resolve(), 'subgraph.yaml')
const networksPath = path.join(path.resolve(), 'networks.json')

let subgraphConfig = fs.readFileSync(subgraphPath, 'utf8');
let subgraph = yaml.load(subgraphConfig) as any;

const subgraphFactory = subgraph.dataSources[0] as any
subgraphFactory.network = TARGET_CHAIN
subgraphFactory.source.address = factory
subgraphFactory.source.startBlock = startBlock
subgraph.templates[0].network = TARGET_CHAIN

if (TARGET_CHAIN === ARBITRUM_ONE) {
  subgraph.features = [ 'grafting' ],
  subgraph.graft = {
    base: 'QmUtGm33GnY6hvnBnAJs8N78Vo7k11ZPctNU8cu7RbNfsp',
    block: 84695232
  }
}

const updatedSubgraph = yaml.dump(subgraph);

const networksJSON = {
  [TARGET_CHAIN]: {
    "Factory": {
      "address": factory,
      "startBlock": startBlock
    }
  }
}

fs.writeFileSync(subgraphPath, updatedSubgraph, 'utf8')
fs.writeFileSync(networksPath, JSON.stringify(networksJSON, null, 2), 'utf8')

