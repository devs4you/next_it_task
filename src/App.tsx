import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) => createStyles({
	wrapper: {
		textAlign: "center",
		width: "500px",
		maxWidth: "100%",
		margin: "80px auto 50px auto",
		paddingLeft: 25,
		paddingRight: 25
	}
}));
function App() {
	const classes = useStyles();
	const history = useHistory();
	return (
		<Box className={classes.wrapper}>
			<Box mb={1}><Typography variant="h2"><Link onClick={() => history.push("/buildings")}>Buildings</Link></Typography></Box>
			<Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
		</Box >
	);
}
export default App;
