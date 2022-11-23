import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useWeb3React } from '@web3-react/core';
import * as React from 'react';
import { hooks, metaMask } from '../connectors/metaMask';
import MetaMask from './connectorButtons/MetaMaskConnect';
import Identicon from './Identicon';
import AccountModal from './modal/Account';
import Connect from './modal/Connect';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

function ConnectHeader() {
	const { account } = useWeb3React();

	return <>{account ? <AccountModal /> : <Connect />}</>;
}

export default ConnectHeader;
