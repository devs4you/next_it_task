import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) => createStyles({
	header: {
		background: "#bebebe",
		padding: "10px 25px 10px 25px",
		textAlign: "center",
		"&>*": {
			marginBottom: 10,
			marginTop: 10,
		},
		[theme.breakpoints.up('sm')]: {
			paddingLeft: 50,
			paddingRight: 50,
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
	},
	icon: {
		fontSize: 50,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}
}));


function Header() {
	const classes = useStyles();
	return (
		<Box className={classes.header}>
			<Typography variant="h4">Welcome</Typography>
			<Box className={classes.icon}><AccountCircle fontSize="inherit" /></Box>
		</Box>
	);
}

export default Header;
