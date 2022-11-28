import styled from '@emotion/styled';
import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { TransitionProps } from '@mui/material/transitions';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers, providers } from 'ethers';
import { copyFileSync } from 'fs';
import { useSnackbar } from 'notistack';
import { forwardRef, Fragment, useState } from 'react';
import NerveGlobalABI from '../../abi/NerveGlobal.json';

interface State {
	amount: string;
}

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

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog() {
	const [open, setOpen] = useState(false);
	const { account, provider, isActive } = useWeb3React();
	const { enqueueSnackbar } = useSnackbar();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [pendingTx, setPendingTx] = useState(false);

	const [values, setValues] = useState<State>({
		amount: '0',
	});

	const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const customValue = values.amount.toString();
	console.log(customValue);
	// TODO -> Get Minimum Stake + Individual input Stake from user
	const val = ethers.utils.parseEther(customValue);

	// Get Task ID
	const path = (global.window && window.location.pathname)?.toString() || '';
	const dareNumber = path.split('/').pop();
	const Id = '0x'.concat(dareNumber);

	// Join Function
	async function onJoin() {
		const signer = provider.getSigner();
		const nerveGlobal = new ethers.Contract('0x91596B44543016DDb5D410A51619D5552961a23b', NerveGlobalABI, signer);
		try {
			setPendingTx(true);
			await nerveGlobal.joinTask(Id, { value: val, gasLimit: 250000 });
			enqueueSnackbar('Transaction signed succesfully!', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('Transaction failed!', {
				variant: 'error',
				action: (key) => (
					<Fragment>
						<Button size="small" onClick={() => alert(`${error}${key}`)}>
							Detail
						</Button>
					</Fragment>
				),
			});
			setPendingTx(false);
		}
	}

	return (
		<div>
			<Button fullWidth={true} variant="outlined" onClick={handleClickOpen}>
				Join Dare
			</Button>
			<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Connect a wallet
					</Typography>
					<OutlinedInput
						id="outlined-adornment-amount"
						value={values.amount}
						onChange={handleChange('amount')}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label="Amount"
					/>
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
					<Button onClick={handleClose}>Cancel</Button>
					{pendingTx ? <Button>Pending</Button> : <Button onClick={onJoin}>Join</Button>}
				</Box>
			</Modal>
		</div>
	);
}
