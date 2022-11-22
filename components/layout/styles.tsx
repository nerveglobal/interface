import { createTheme } from '@mui/material/styles';
import localFont from '@next/font/local';

const TrueLies = localFont({ src: './fonts/TrueLies.ttf' });

export const themeLight = createTheme({
	typography: {
		fontFamily: 'TrueLies',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
		  @font-face {
			font-family: 'TrueLies';
			src: url(${TrueLies}) format('truetype');
			font-weight: normal;
			font-style: normal;
		  }
			`,
		},
	},
	palette: {
		background: {
			default: '#e4f0e2',
		},
	},
});

export const themeDark = createTheme({
	typography: {
		fontFamily: 'TrueLies',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: '#000014',
					backgroundImage: 'radial-gradient(#00f2fc -250%, #000014 70%)',
					backgroundRepeat: 'no-repeat',
					backgroundAttachment: 'fixed',
				},
			},
			// 	`
			//   @font-face {
			// 	font-family: 'TrueLies';
			// 	src: url(${TrueLies}) format('truetype');
			// 	font-weight: normal;
			// 	font-style: normal;
			//   }
			// 	`,
		},
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: '#202020',
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#000014',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: `#000014`,
		},
		text: {
			primary: '#ffffff',
			secondary: '#000014',
			disabled: '#5D6785',
		},
	},
});
