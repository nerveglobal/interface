import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers, providers } from 'ethers';
import { copyFileSync } from 'fs';
import { useSnackbar } from 'notistack';
import { Fragment, useState } from 'react';
import NerveGlobalABI from '../../abi/NerveGlobal.json';

export default function FormDialog() {
	const [open, setOpen] = useState(false);
	const { provider } = useWeb3React();
	const { enqueueSnackbar } = useSnackbar();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [pendingTx, setPendingTx] = useState(false);

	// Get Task ID
	const path = (global.window && window.location.pathname)?.toString() || '';
	const dareNumber = path.split('/').pop();
	const Id = '0x'.concat(dareNumber);

	// Vote Function -> True
	async function voteFunctionTrue() {
		const signer = provider.getSigner();
		const nerveGlobal = new ethers.Contract('0x91596B44543016DDb5D410A51619D5552961a23b', NerveGlobalABI, signer);
		try {
			setPendingTx(true);
			await nerveGlobal.voteTask(Id, true, { gasLimit: 250000 });
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

	// Vote Function -> False
	async function voteFunctionFalse() {
		const signer = provider.getSigner();
		const nerveGlobal = new ethers.Contract('0x91596B44543016DDb5D410A51619D5552961a23b', NerveGlobalABI, signer);
		try {
			setPendingTx(true);
			await nerveGlobal.voteTask(Id, false, { gasLimit: 250000 });
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
				Vote Dare
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Vote Dare</DialogTitle>
				<DialogContent>
					{pendingTx ? <Button>Pending</Button> : <Button onClick={voteFunctionTrue}>True</Button>}
					{pendingTx ? <Button>Pending</Button> : <Button onClick={voteFunctionFalse}>False</Button>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
