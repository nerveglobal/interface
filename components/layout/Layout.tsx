import { ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

import { CssBaseline } from '@mui/material/';
import Button from '@mui/material/Button';
import { deepmerge } from '@mui/utils';
import { light } from './Header';
import { themeDark, themeLight } from './styles';

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
	return (
		<ThemeProvider theme={light ? themeLight : themeDark}>
			<CssBaseline />
			<Header />
			<main>{children}</main>
			<Footer />
		</ThemeProvider>
	);
};

export default Layout;
