import { useEffect, useState } from 'react';
import { hooks, walletConnect } from '../../connectors/walletConnect';
import { Card } from '../ConnectOnlyCard';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

export default function CoinbaseWalletConnect() {
	const chainId = useChainId();
	const isActivating = useIsActivating();
	const isActive = useIsActive();
	const [error, setError] = useState(undefined);

	// attempt to connect eagerly on mount
	useEffect(() => {
		void walletConnect.connectEagerly().catch(() => {
			console.debug('Failed to connect eagerly to walletconnect');
		});
	}, []);

	return <Card connector={walletConnect} chainId={chainId} isActivating={isActivating} isActive={isActive} error={error} setError={setError} />;
}
