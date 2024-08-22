import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import { TARGET_CHAIN } from "./chains"

const {
  configName,
  factory,
  startBlock,
} = TARGET_CHAIN

const subgraphPath = path.join(path.resolve(), 'subgraph.yaml')
const networksPath = path.join(path.resolve(), 'networks.json')

let subgraphConfig = fs.readFileSync(subgraphPath, 'utf8');
let subgraph = yaml.load(subgraphConfig) as any;

const subgraphFactory = subgraph.dataSources[0] as any
subgraphFactory.network = configName
subgraphFactory.source.address = factory
subgraphFactory.source.startBlock = startBlock
subgraph.templates[0].network = configName

const updatedSubgraph = yaml.dump(subgraph);

const networksJSON = {
  [configName]: {
    "Factory": {
      "address": factory,
      "startBlock": startBlock
    }
  }
}

fs.writeFileSync(subgraphPath, updatedSubgraph, 'utf8')
fs.writeFileSync(networksPath, JSON.stringify(networksJSON, null, 2), 'utf8')