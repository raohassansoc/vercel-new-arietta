import { Chain } from "wagmi/dist/chains";

// Define Arietta Testnet chain
const ariettaTestNet: Chain = {
    id: 26388, // Chain ID
    name: 'Arietta Test Net', // Human-readable name
    network: 'arietta_testnet', // Internal network name
    nativeCurrency: {
        name: 'Test Arietta Currency', // Name of the test currency
        symbol: 'tASC', // Symbol of the test currency
        decimals: 18, // Number of decimals
    },
    rpcUrls: {
        default: {
            http: ['https://testnetrpc.ariettachain.tech'], // RPC endpoint
        },
    },
    blockExplorers: {
        default: {
            name: 'Arietta Testnet Explorer',
            url: 'https://tnexplorer.ariettachain.tech', // Explorer URL
        },
    },
    testnet: true, // It's a testnet, so testnet is set to true
};

// Export Arietta Test Net chain
export { ariettaTestNet };
