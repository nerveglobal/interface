import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { coinbaseWallet, hooks } from '../../connectors/coinbaseWallet';
import CoinbaseWalletConnect from '../connectorButtons/CoinbaseWalletConnect';
import MetaMaskConnect from '../connectorButtons/MetaMaskConnect';
import WalletConnect from '../connectorButtons/WalletConnect';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#292929',
	border: '0.5px solid rgba(152, 161, 192, 0.1)',
	borderRadius: '20px',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

function ConnectHeader() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const isActivating = useIsActivating();

	return (
		<div>
			<Button fullWidth={true} sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleOpen}>
				Connect
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Connect a wallet
					</Typography>
					<MetaMaskConnect />
					<CoinbaseWalletConnect />
					<WalletConnect />
					<Typography id="modal-modal-description" sx={{ fontSize: '12px', mt: 2 }}>
						By connecting a wallet, you agree to Nerve Global's{' '}
						<a target="_blank" rel="noreferrer" href={'https://www.nerveglobal.com/disclaimer'}>
							Terms of Service
						</a>{' '}
						and acknowledge that you have read and understand the{' '}
						<a target="_blank" rel="noreferrer" href={'https://www.nerveglobal.com/disclaimer'}>
							Disclaimer
						</a>
						{'.'}
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

export default ConnectHeader;
