import { Chain } from "wagmi/dist/chains";

const ariettaMainNet: Chain = {
    id: 92522, // Chain ID
    name: 'Arietta Main Net', // Human-readable name
    network: 'arietta_mainnet', // Internal network name
    nativeCurrency: {
        name: 'Arietta Currency', // Name of the currency
        symbol: 'ASC', // Symbol of the currency
        decimals: 18, // Number of decimals
    },
    rpcUrls: {
        default: {
            http: ['https://mainnetrpc.ariettachain.tech'], // RPC endpoint
        },
    },
    blockExplorers: {
        default: {
            name: 'Arietta Chain Explorer',
            url: 'https://explorer.ariettachain.tech', // Explorer URL
        },
    },
    testnet: false, // It's a mainnet, so testnet is set to false
};

export { ariettaMainNet };