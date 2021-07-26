import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useState } from 'react';
import ImageDropzone from './ImageDropzone';
export interface IBuilding {
	id: number;
	name: string;
	area: string;
	location?: string;
	image?: string;
}
interface Props {
	isOpen: boolean;
	updateMode?: boolean;
	onClose: (building?: IBuilding) => void
}

function BuildingDialog({ isOpen, onClose, updateMode }: Props) {
	const [id, setId] = useState<number | undefined>(undefined);
	const [name, setName] = useState("");
	const [area, setArea] = useState("");
	const [location, setLocation] = useState<string | undefined>(undefined);
	const [image, setImage] = useState<string | undefined>(undefined);
	const [loadedRecord, setLoaded] = useState(false);
	const idExists = id ? Object.keys(localStorage).includes(id.toString()) : false;
	const getIdHelperText = () => {
		if (id) {
			if (updateMode && !idExists) {
				return "Error: Must be an existing Id"
			}
			if (!updateMode) {
				if (idExists) {
					return "Error: Id exists already"
				}
			}
		}
		return undefined;
	};
	const setInitialState = () => {
		setId(undefined);
		setName("");
		setArea("");
		setLocation(undefined);
		setImage(undefined);
		setLoaded(false);
	};
	const mode = updateMode ? "Update" : "Add";
	return (
		<Dialog
			open={isOpen}
			disableBackdropClick
		>
			<DialogTitle id="alert-dialog-title">{mode + " a record"}</DialogTitle>
			<DialogContent>
				<Box width="500px" maxWidth="100%">
					<Box mb={2} display="flex">
						<Box flex={1} marginRight={updateMode ? "10px" : undefined}>
							<TextField
								autoFocus
								label="Id"
								fullWidth
								helperText={getIdHelperText() || (!id && "Should be a positive number")}
								type="number"
								value={id}
								onChange={(e) => {
									setId(parseInt(e.target.value));
								}}
								onKeyDown={(e) => {
									if (e.key !== "Backspace" && !new RegExp("[1-9]").test(e.key)) {
										e.preventDefault();
									}
								}}
								onPaste={e => {
									if (!new RegExp("[1-9]").test(e.clipboardData.getData("Text"))) {
										e.preventDefault();
									}
								}}
								error={!!getIdHelperText()}
								required
								variant="outlined"
							/>
						</Box>
						{
							updateMode &&
							<Button
								variant="contained"
								color="primary"
								disableElevation
								disabled={!updateMode || !idExists || !id}
								onClick={() => {
									if (id) {
										const { name, area, location, image }: IBuilding = JSON.parse(localStorage.getItem(id.toString()) as string);
										setName(name);
										setArea(area);
										setLocation(location);
										setImage(image);
										setLoaded(true);
									}
								}}
							>
								Load record
							</Button>
						}
					</Box>
					{(!updateMode || (idExists && loadedRecord)) && (
						<>
							<Box mb={2} >
								<TextField
									variant="outlined"
									required
									label="Name"
									fullWidth
									value={name}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</Box>
							<Box mb={2}>
								<TextField
									value={area}
									variant="outlined"
									required
									label="Area"
									fullWidth
									onChange={(e) => {
										setArea(e.target.value);
									}}
								/>
							</Box>
							<Box mb={2}>
								<TextField
									value={location}
									variant="outlined"
									label="Location"
									fullWidth
									onChange={(e) => {
										setLocation(e.target.value);
									}}
								/>
							</Box>
							<Box mb={1}>
								<ImageDropzone img={image} onImageSet={(img) => { setImage(img) }} />
							</Box>
						</>
					)}
				</Box>
			</DialogContent>
			<Box mb={1}>
				<DialogActions>
					<Button onClick={() => { onClose(); setInitialState() }} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => { onClose({ id: id || 0, name, area, location, image }); setInitialState(); }}
						color="primary"
						variant="contained"
						disabled={!!getIdHelperText() || name.length === 0 || area.length === 0 || !id}
						disableElevation
					>
						{mode}
					</Button>
				</DialogActions>
			</Box>
		</Dialog >
	);
}

export default BuildingDialog;
