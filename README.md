Wagmi Sapphire Paratime
=====

A library to use [Sapphire ParaTime](https://docs.oasis.io/dapp/sapphire/) with [Wagmi](https://0.12.x.wagmi.sh/)

## Getting started
```bash
npm install wagmi-sapphire-provider
```

## How to use it

```javascript
import { sapphireJsonRpcProvider } from 'wagmi-sapphire-provider';

const sapphireTestnet = {
    id: 23295,
    name: 'SapphireTestnet',
    network: 'SapphireTestnet',
    nativeCurrency: {
      name: 'TEST',
      symbol: '$',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://testnet.sapphire.oasis.dev',
    },
    testnet: true,
    blockExplorers: {
      default: { name: 'Sapphire Explorer', url: 'https://testnet.explorer.sapphire.oasis.dev' }
    }
  };

const { chains, provider } = configureChains(
    [sapphireTestnet],
    [
      sapphireJsonRpcProvider({
        rpc: (chain) => {
          return { http: chain.rpcUrls.default };
        },
      }),
    ],
  );
```
