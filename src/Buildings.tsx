import React, { useEffect } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import Header from './Header';
import BuildingDialog, { IBuilding } from './BuildingDialog';

const useStyles = makeStyles((theme: Theme) => createStyles({
	wrapper: {
		paddingLeft: 25,
		paddingRight: 25,
		[theme.breakpoints.up('sm')]: {
			paddingLeft: 50,
			paddingRight: 50,
		},
	},
	table: {
		minWidth: 650,
	},
	btns: {
		"&>*": {
			marginRight: 10,
		}
	}
}));

type IBuildings = IBuilding[];

function buildingsFromStorage() {
	let buildings = [] as any, keys = Object.keys(localStorage).sort((a, b) => parseInt(a) - parseInt(b)), i = keys.length;
	while (i--) {
		buildings.push({ ...JSON.parse(localStorage.getItem(keys[i]) as string), id: keys[i] });
	}
	return buildings;
}

function Buildings() {
	const classes = useStyles();
	const [openDialog, setDialog] = useState(false);
	const [updateMode, setUpdateMode] = useState(false);
	const [buildings, setBuildings] = useState<IBuildings>([]);
	useEffect(() => {
		setBuildings(buildingsFromStorage());
	}, []);
	return (
		<>
			<Header />
			<Box className={classes.wrapper}>
				<Box mt={3} mb={2} className={classes.btns}>
					<Button
						onClick={() => {
							setDialog(true);
						}}
						variant="contained"
						color="primary"
						disableElevation
					>
						Add
					</Button>
					{
						buildings.length !== 0 && <Button
							onClick={() => {
								setUpdateMode(true)
								setDialog(true);
							}}
							variant="contained"
							color="primary"
							disableElevation
						>
							Update
						</Button>
					}
				</Box>
				<Box mb={5}>
					{buildings.length === 0 ? <Typography>No buildings have been found!</Typography> :
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Area</TableCell>
										<TableCell>Location</TableCell>
										<TableCell>Image</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{buildings.sort((a, b) => a.id - b.id).map((row) => (
										<TableRow key={row.id}>
											<TableCell component="th" scope="row">
												{row.id}
											</TableCell>
											<TableCell>{row.name}</TableCell>
											<TableCell>{row.area}</TableCell>
											<TableCell>{row.location}</TableCell>
											<TableCell width={180}>{row.image && <img src={row.image} />}</TableCell>
											<TableCell align="right">
												<Button
													color="secondary"
													onClick={() => {
														localStorage.removeItem(row.id.toString());
														setBuildings(buildingsFromStorage());
													}}>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					}
				</Box>
				<BuildingDialog
					isOpen={openDialog}
					updateMode={updateMode}
					onClose={(building) => {
						if (building) {
							const { name, area, location, image } = building;
							localStorage.setItem(building.id.toString(), JSON.stringify({
								name,
								area,
								location,
								image
							}));
							setBuildings(buildingsFromStorage());
						}
						setDialog(false);
						setUpdateMode(false);
					}}
				/>
			</Box >
		</>
	);
}

export default Buildings;
