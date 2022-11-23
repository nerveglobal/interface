import { Web3Provider } from '@ethersproject/providers';
import { CssBaseline } from '@mui/material/';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { coinbaseWallet, hooks as coinbaseWalletHooks } from '../connectors/coinbaseWallet';
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';
import { hooks as networkHooks, network } from '../connectors/network';
import { hooks as walletConnectHooks, walletConnect } from '../connectors/walletConnect';
import { getName } from '../utils';

const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
	[metaMask, metaMaskHooks],
	[walletConnect, walletConnectHooks],
	[coinbaseWallet, coinbaseWalletHooks],
	[network, networkHooks],
];

function Child() {
	const { connector, account, accounts } = useWeb3React();
	console.log(`Priority Connector is: ${getName(connector)} and Account is ${account} or ${accounts}`);
	return null;
}

// function getProvider(provider: any): Web3Provider {
// 	const library = new Web3Provider(provider);
// 	library.pollingInterval = 12000;
// 	return library;
// }

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Web3ReactProvider connectors={connectors}>
				<Child />
				<Layout>
					<SnackbarProvider maxSnack={3}>
						<Component {...pageProps} />
					</SnackbarProvider>
				</Layout>
			</Web3ReactProvider>
		</>
	);
}
