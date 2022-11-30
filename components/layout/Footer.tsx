import styled from '@emotion/styled';
import LayersIcon from '@mui/icons-material/Layers';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import IconButton from '@mui/material/IconButton';
import { useWeb3React, Web3ReactHooks } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { hooks, metaMask } from '../../connectors/metaMask';
import { Chain } from '../Chain';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

const StyledFooter = styled.footer`
	max-width: auto;
	display: flex-end;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	padding: 0 25px 10px 0;
	position: absolute;
	bottom: 0;
	right: 0;

	@media (max-width: 1155px) {
		display: block;
	}

	@media (max-width: 960px) {
		padding: 1rem;
	}
`;

export default function BlockNumber() {
	const chainId = useChainId();
	var chain = chainId === undefined ? 1 : chainId;
	var provider = ethers.getDefaultProvider(chain, {
		etherscan: '-',
		infura: process.env.infuraKey,
		alchemy: '-',
		pocket: '-',
		ankr: '-',
	});
	const [blockNumber, setBlockNumber] = useState(0);
	const [gasPrice, setGasPrice] = useState('0');

	useEffect(() => {
		setInterval(() => {
			// Get Block Height
			const getBlock = async () => {
				try {
					const blockNumber = await provider.getBlockNumber();
					setBlockNumber(blockNumber);
				} catch (error) {}
			};
			getBlock();

			// Get Gas Price in gwei
			const getGwei = async () => {
				try {
					const GasPrice = await provider.getGasPrice();
					const gweiPrice = ethers.utils.formatUnits(GasPrice, 'gwei');
					const gwei = gweiPrice.split('.', 1).pop();
					setGasPrice(gwei);
				} catch (error) {}
			};
			getGwei();
		}, 50000);
	}, []);

	return (
		<StyledFooter>
			<IconButton sx={{ color: '#5D6785', fontSize: '0.75rem' }}>
				<LocalGasStationIcon fontSize="small" sx={{ mr: '0.5rem' }} />
				{gasPrice}
			</IconButton>

			<IconButton sx={{ color: '#5D6785', fontSize: '0.75rem' }}>
				<LayersIcon fontSize="small" sx={{ mr: '0.5rem' }} />
				{blockNumber}
			</IconButton>
		</StyledFooter>
	);
}
