import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MetaMask from '../connectorButtons/MetaMaskConnect';

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
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
					<div>
						<Stack direction="column" justifyContent="space-evenly" alignItems="stretch" spacing={1}>
							<MetaMask />
							<Button>Coinbase Wallet</Button>
							<Button>WalletConnect</Button>
						</Stack>
					</div>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
