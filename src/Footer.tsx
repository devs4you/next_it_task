import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => createStyles({
	footer: {
		background: "#bebebe",
		padding: "20px 25px 10px 25px",
		"&>*": {
			marginBottom: 10,
		},
		[theme.breakpoints.up('sm')]: {
			paddingLeft: 50,
			paddingRight: 50,
			display: "flex",
			justifyContent: "space-between",
			"& > div": {
				display: "flex",
				"&>*": {
					marginRight: 20,
				}
			}
		},
	}
}));


function Footer() {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Box className={classes.footer}>
			<Box>
				<Typography>
					<Link onClick={() => history.push("/")} color="primary">
						Home
					</Link>
				</Typography>
				<Typography>
					<Link onClick={() => history.push("/buildings")} color="primary">
						Buildings
					</Link>
				</Typography>
			</Box>
			<Typography>Martin's project</Typography>
		</Box >
	);
}

export default Footer;
