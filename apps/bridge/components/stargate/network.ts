import { mainnet, arbitrum, optimism, polygon, fantom, avalanche, bsc, bscTestnet } from 'wagmi/chains'
import { ariettaTestNet } from './costomChaintestnet'
import { ariettaMainNet } from './costomChain'
// Chain Id is defined by Stargate
const stargateNetowrk = [
  {
    chainId: 92522,
    name: 'Arietta Main Net',
    chain: ariettaMainNet,
  },
  {
    chainId: 26388,
    name: 'Arietta Testnet',
    chain: ariettaTestNet,
  },
  {
    chainId: 101,
    name: 'Ethereum',
    chain: mainnet,
  },
  {
    name: 'BNB Chain',
    chainId: 102,
    chain: bsc,
  },
  {
    name: 'BSC Testnet',
    chainId: 97,
    chain: bscTestnet,
  },
  {
    chainId: 109,
    name: 'Matic',
    chain: polygon,
  },
  {
    chainId: 106,
    name: 'Avalanche',
    chain: avalanche,
  },
  {
    chainId: 112,
    name: 'Fantom',
    chain: fantom,
  },
  {
    chainId: 110,
    name: 'Arbitrum',
    chain: arbitrum,
  },
  {
    chainId: 111,
    name: 'Optimism',
    chain: optimism,
  },
]

export const findChainByStargateId = (chainId: number) => stargateNetowrk.find((s) => s.chainId === chainId)
