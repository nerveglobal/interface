import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import type { Web3ReactHooks } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import type { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAddChainParameters } from '../chains'
import { getLogo, getName } from '../utils'

export function ConnectOnly({
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
}) {
  const isNetwork = connector instanceof Network
  const [desiredChainId] = useState<number>(137)

  const onClick = useCallback((): void => {
    setError(undefined)
    if (connector instanceof GnosisSafe) {
      connector
        .activate()
        .then(() => setError(undefined))
        .catch(setError)
    } else if (connector instanceof WalletConnect || connector instanceof Network) {
      connector
        .activate(desiredChainId === -1 ? undefined : desiredChainId)
        .then(() => setError(undefined))
        .catch(setError)
    } else {
      connector
        .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
        .then(() => setError(undefined))
        .catch(setError)
    }
    
  }, [connector, desiredChainId, setError])

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <Button onClick={onClick}>Try {getName(connector)} Again?</Button>
      </div>
    )
  } else if (isActivating) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <CircularProgress />
        <Button disabled={true}>Try connecting to {getName(connector)}</Button>
      </div>
    )
  } else if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() => {
            if (connector?.deactivate) {
              void connector.deactivate()
            } else {
              void connector.resetState()
            }
          }}
        >
          Disconnect
        </button>
      </div>
    )
  } else {
  return (
      <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1rem' }} />
      <Button
        onClick={isActivating
          ? undefined
          : () => connector instanceof GnosisSafe
            ? void connector
              .activate()
              .then(() => setError(undefined))
              .catch(setError)
            : connector instanceof WalletConnect || connector instanceof Network
              ? connector
                .activate(desiredChainId === -1 ? undefined : desiredChainId)
                .then(() => setError(undefined))
                .catch(setError)
              : connector
                .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
                .then(() => setError(undefined))
                .catch(setError)}
        disabled={isActivating}
      >
{/* {getLogo(connector)} */}
        {getName(connector)}
      </Button>
    </div>
      </>
    )
        }
}