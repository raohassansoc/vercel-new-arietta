import { ChainId } from '@pancakeswap/sdk'
import memoize from 'lodash/memoize'

const ARIETTA_ID = 92522;
const ARIETTA_TEST_NET_ID = 26388

export const ChainIdName = {
  [ChainId.ETHEREUM]: 'eth',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC]: 'bsc',
  [ChainId.BSC_TESTNET]: 'bscTestnet',
  [ARIETTA_ID]: 'arietta_mainnet',
  [ARIETTA_TEST_NET_ID]: 'arietta_testnet' 
}

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  const parsedQueryChain = Object.entries(ChainIdName).find(([_, value]) => value === chainName)
  return Number(parsedQueryChain?.[0])
})
