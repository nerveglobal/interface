import styled from '@emotion/styled';
import { BigNumber, ethers } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';

import Join from '../../../components/modal/Join';
import Vote from '../../../components/modal/Vote';

import { useWeb3React } from '@web3-react/core';
import NerveGlobalABI from '../../../abi/NerveGlobal.json';
import Connect from '../../../components/modal/Connect';

import { Provider } from '@ethersproject/providers';
import Instagram from '../../../images/instagram.inline.svg';
import TikTok from '../../../images/tiktok.inline.svg';
import Twitch from '../../../images/twitch.inline.svg';
import Twitter from '../../../images/twitter.inline.svg';
import Youtube from '../../../images/youtube.inline.svg';

import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

import Skeleton from '@mui/material/Skeleton';

const StyledInstagram = styled(Instagram)`
	path {
		fill: #white;
	}

	width: 20px;
	height: 20px;

	:hover {
		transform: rotate(-10deg);
		transition: 0.5s;
		path {
			fill: #e1306c;
		}
	}
`;

const StyledTwitter = styled(Twitter)`
	path {
		fill: #white;
	}

	width: 20px;
	height: 20px;

	:hover {
		transform: rotate(-10deg);
		transition: 0.5s;
		path {
			transition: 0.5s;
			fill: #1da1f2;
		}
	}
`;

const StyledTikTok = styled(TikTok)`
	path {
		fill: #white;
	}

	width: 20px;
	height: 20px;

	:hover {
		transform: rotate(-10deg);
		transition: 0.5s;
		path {
			transition: 0.5s;
			fill: #00f2ea;
		}
	}
`;

const StyledYoutube = styled(Youtube)`
	path {
		fill: #white;
	}

	width: 20px;
	height: 20px;

	:hover {
		transform: rotate(-10deg);
		transition: 0.5s;
		path {
			transition: 0.5s;
			fill: #ff0000;
		}
	}
`;

const StyledTwitch = styled(Twitch)`
	path {
		fill: #white;
	}

	width: 20px;
	height: 20px;

	:hover {
		transform: rotate(-10deg);
		transition: 0.5s;
		path {
			transition: 0.5s;
			fill: #6441a5;
		}
	}
`;

const StyledCard = styled.div`
	background-color: rgba(0, 0, 20, 0.5);
	border: 1px solid #white;
	padding: 2rem;
	border-radius: 24px;
`;

const GrantsCard = styled(StyledCard)`
	width: 500px;
	height: 500px;
	margin: 0 auto 0 auto;

	@media (max-width: 960px) {
		width: 100%;
		margin: 0 auto 0 auto;
	}
`;

const Positive = styled.div`
	color: green;
	align-items: left;
	text-align: left;
	display: flex;
	margin-left: 5px;
	flex: 1;
`;

const Negative = styled.div`
	color: red;
	align-items: left;
	text-align: left;
	display: flex;
	margin-left: 5px;
	flex: 1;
`;

const StyledItemRowSocials = styled.nav`
	display: flex;
	flex: 1;
	flex-direction: row;
	font-size: 16px;
	font-weight: 500;
	justify-content: space-between;
	width: 100%;
	margin: -0.5rem auto 0.75rem auto;

	p {
		font-size: 12px;
		justify-content: space-between;
	}

	a {
		font-size: 16px;

		:hover {
			transition: 0.5s;
			color: #00f2fc;
		}
	}

	@media (max-width: 960px) {
		font-size: 16px;
		justify-content: space-between;
		width: 100%;
		margin: 0 auto 0 auto;

		p {
			font-size: 12px;
		}

		& > * {
			margin-top: 1px;
			margin-bottom: 1px;
		}
		& > *:not(:first-of-type) {
			margin-top: 0;
			align-items: right;
		}
	}
`;

const StyledItemRowDescription = styled.nav`
	display: flex;
	flex: 1;
	flex-direction: row;
	height: 80px;
	font-size: 18px;
	font-weight: 500;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto 0 auto;

	p {
		font-size: 12px;
		justify-content: space-between;
	}

	a {
		font-size: 18px;
	}

	@media (max-width: 960px) {
		font-size: 16px;
		justify-content: space-between;
		width: 100%;
		margin: 0 auto 0 auto;

		p {
			font-size: 12px;
		}

		& > * {
			margin-top: 1px;
			margin-bottom: 1px;
		}
		& > *:not(:first-of-type) {
			margin-top: 0;
			align-items: right;
		}
	}
`;

const StyledItemRowIntern = styled.nav`
	display: flex;
	flex: 1;
	flex-direction: row;
	font-size: 16px;
	font-weight: 500;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto 0 auto;

	p {
		font-size: 12px;
		justify-content: space-between;
	}

	a {
		font-size: 16px;
	}

	@media (max-width: 960px) {
		font-size: 16px;
		justify-content: space-between;
		width: 100%;
		margin: 0 auto 0 auto;

		p {
			font-size: 12px;
		}

		& > * {
			margin-top: 1px;
			margin-bottom: 1px;
		}
		& > *:not(:first-of-type) {
			margin-top: 0;
			align-items: right;
		}
	}
`;

const StyledItemRow = styled.nav`
	display: flex;
	flex-direction: row;
	margin: 0 auto 0 auto;

	@media (max-width: 960px) {
		flex-direction: column;
		& > * {
			margin-top: 1px;
			margin-bottom: 1px;
		}
	}
`;

const StyledSection = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	align-content: center;
	margin: 5rem auto 0 auto;

	@media (max-width: 960px) {
		display: grid;
		align-items: center;
		margin: 0 auto 0 auto;
		grid-template-columns: 1fr;
		grid-gap: 2em;
	}
`;

// TODO -> Countdown Shit

// Account Address
// const account = useWeb3React();

// Get Task ID
const path = (global.window && window.location.pathname)?.toString() || '';
const dareNumber = path.split('/').pop();
const Id = '0x'.concat(dareNumber);

// Query The Graph -> Dares
function useTAD() {
	const [tad, setTAD] = useState<any[]>([]);

	useEffect(() => {
		fetch('https://api.thegraph.com/subgraphs/name/nerveglobal/nerveglobal', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: QueryForDare }),
		})
			.then((response) => response.json())
			.then((data) => setTAD(data.data.tasks));
	}, []);

	return tad;
}

const QueryForDare = `
{
  tasks(where: { id:"${Id}"}) 
  {
   description
   recipientName
   endTask
   proofLink
   positiveVotes
   negativeVotes
   amount
   participants
  }
}
`;

// Query The Graph -> User -> Joined Dare || Voted Dare || Claimed Dare
function useQueryForUser() {
	const [queryForUser, setQueryForUser] = useState<any[]>([]);
	useEffect(() => {
		fetch('https://api.thegraph.com/subgraphs/name/nerveglobal/nerveglobal', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: QueryForUser }),
		}).then((response) => {
			if (response.ok) {
				response
					.json()

					.then((data) => setQueryForUser(data.data.userTasks));
			}
			throw console.log('Array is Empty');
		});
	}, []);

	return queryForUser;
}

// TODO -> Get ${account} as userAddress
const QueryForUser = `
{
	userTasks(where: { id:"0x52b28292846c59da23114496d6e6bfc875f54ff5-${Id}"}) {
	  userStake
	  voted
	  vote
	  endTask
	  finished
	 }
	}
`;

export default function DarePage() {
	const { account, provider, isActive } = useWeb3React();
	const tad = useTAD();
	const queryForUser = useQueryForUser();
	const matic = Number(usePrice());

	// Merge The Graph Queries
	let merged = [] as any;
	for (let i = 0; i < tad.length; i++) {
		merged[i] = { ...tad[i], ...queryForUser[i] };
	}

	// User joined?
	var joined = queryForUser.length === 0 ? false : true;

	//Claim Function
	const [pendingTx, setPendingTx] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	async function claimFunction() {
		const signer = provider.getSigner();
		const nerveGlobal = new ethers.Contract('0x91596B44543016DDb5D410A51619D5552961a23b', NerveGlobalABI, signer);
		try {
			setPendingTx(true);
			await nerveGlobal.redeemUser(Id, { gasLimit: 250000 });
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

	// TODO Countdown Timer
	const [dareTimer, setDareTimer] = useState(false);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [endTask, setEndTask] = useState(0);

	{
		merged.map((merged) => {
			setEndTask(Math.floor(merged.endTask * 1000));
		});
		console.log('TIMESTAMP', endTask);
	}

	// TIMESTAMP 1669138345000

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date().getTime();
			const difference = endTask - now;
			console.log('ENDTASK', endTask);

			// ENDTASK 0

			const d = Math.floor(difference / (1000 * 60 * 60 * 24));
			setDays(d);

			const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			setHours(h);

			const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			setMinutes(m);

			const s = Math.floor((difference % (1000 * 60)) / 1000);
			setSeconds(s);

			if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
				setDareTimer(true);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<StyledSection>
				{merged.map((merged) => (
					<li style={{ listStyle: 'none' }} key={merged.participants}>
						<StyledItemRow>
							<GrantsCard>
								<StyledItemRowSocials style={{ fontSize: '16px' }}>
									<a key={merged.recipientName} target="_blank" rel="noreferrer" href={'https://app.nerveglobal.com/#' + merged.recipientName}>
										{merged.recipientName}↗
									</a>
									<a target="_blank" rel="noreferrer" href={merged.proofLink}>
										{merged.proofLink.includes('instagram') ? <StyledInstagram /> : ''}
									</a>

									<a target="_blank" rel="noreferrer" href={merged.proofLink}>
										{merged.proofLink.includes('twitter') ? <StyledTwitter /> : ''}
									</a>

									<a target="_blank" rel="noreferrer" href={merged.proofLink}>
										{merged.proofLink.includes('tiktok') ? <StyledTikTok /> : ''}
									</a>

									<a target="_blank" rel="noreferrer" href={merged.proofLink}>
										{merged.proofLink.includes('youtube') ? <StyledYoutube /> : ''}
									</a>

									<a target="_blank" rel="noreferrer" href={merged.proofLink}>
										{merged.proofLink.includes('twitch') ? <StyledTwitch /> : ''}
									</a>
								</StyledItemRowSocials>

								<StyledItemRowDescription>{merged.description}</StyledItemRowDescription>

								<StyledItemRowIntern style={{ marginBottom: '-0.25rem' }}>
									{dareTimer ? (
										<a>Time's over</a>
									) : (
										<div className="timer-wrapper">
											<div className="timer-inner">
												<a className="timer-segment">
													<span className="time">{days}:</span>
												</a>
												<a className="timer-segment">
													<span className="time">{hours}:</span>
												</a>
												<a className="timer-segment">
													<span className="time">{minutes}:</span>
												</a>
												<a className="timer-segment">
													<span className="time">{seconds}</span>
												</a>
											</div>
										</div>
									)}
									{merged.positiveVotes - merged.negativeVotes > 0 ? (
										<Positive>({merged.positiveVotes - merged.negativeVotes})</Positive>
									) : (
										<Negative>({merged.positiveVotes - merged.negativeVotes})</Negative>
									)}
									({merged.participants}) ${((merged.amount / 1e18) * matic).toFixed(2)}
								</StyledItemRowIntern>

								<StyledItemRowIntern>
									<p>Time & Votes</p>
									<p>Participants & Value</p>
								</StyledItemRowIntern>
								{account ? (
									joined == false ? (
										<Join />
									) : merged.voted == false ? (
										<Vote />
									) : (
										<Button fullWidth={true} onClick={claimFunction}>
											Claim
										</Button>
									)
								) : (
									<Connect />
								)}
							</GrantsCard>
						</StyledItemRow>
					</li>
				))}
			</StyledSection>
		</>
	);
}

function usePrice() {
	const [maticPrice, setPrice] = useState<number[]>([]);

	useEffect(() => {
		fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Object),
		})
			.then((response) => response.json())
			.then((data) => setPrice(data['matic-network'].usd));
	}, []);

	return maticPrice;
}
