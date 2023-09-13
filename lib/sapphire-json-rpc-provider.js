
import { providers } from "ethers";
import * as sapphire from '@oasisprotocol/sapphire-paratime';

function sapphireJsonRpcProvider({
  priority,
  rpc,
  stallTimeout,
  static: static_ = true,
  weight
}) {
  return function(chain) {
    const rpcConfig = rpc(chain);
    if (!rpcConfig || rpcConfig.http === "")
      return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [rpcConfig.http] }
        }
      },
      provider: () => {
        const RpcProvider = static_ ? providers.StaticJsonRpcProvider : providers.JsonRpcProvider;
        const provider = new RpcProvider(rpcConfig.http, {
          ensAddress: chain.contracts?.ensRegistry?.address,
          chainId: chain.id,
          name: chain.network
        });
        provider.getSigner = () => {
            return sapphire.wrap(provider.getSigner());
        }
        return sapphire.wrap(Object.assign(provider, { priority, stallTimeout, weight }));
      },
      ...rpcConfig.webSocket && {
        webSocketProvider: () => new providers.WebSocketProvider(
          rpcConfig.webSocket,
          chain.id
        )
      }
    };
  };
}
export {
    sapphireJsonRpcProvider
};