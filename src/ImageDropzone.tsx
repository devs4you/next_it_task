import React, { useState } from 'react';
import { Box, Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone';
const useStyles = makeStyles((theme: Theme) => createStyles({
	dropzone: {
		background: "#adb4e0",
		textAlign: "center",
		padding: 50,
	}
}));

interface Props {
	onImageSet: (img?: string) => void,
	img?: string,
}

function ImageDropzone({ onImageSet, img }: Props) {
	const classes = useStyles();
	const [image, setImage] = useState<string | undefined>(img);
	return (
		<>
			{image ?
				<>
					<Box style={{ textAlign: "right" }}>
						<Button onClick={() => {
							setImage(undefined);
							onImageSet();
						}}>remove image x</Button>
					</Box>
					<img src={image} alt="" />
				</>
				: <Dropzone
					accept="image/*"
					maxFiles={1}
					onDrop={acceptedFiles => {
						var reader = new FileReader();
						reader.readAsDataURL(acceptedFiles[0]);
						reader.onload = () => {
							setImage(reader.result as string);
							onImageSet(reader.result as string)
						};
					}}
				>
					{({ getRootProps, getInputProps }) => (
						<div {...getRootProps()} className={classes.dropzone}>
							<input {...getInputProps()} />
							<Typography>Drag 'n' drop an image here, or click to select one</Typography>
						</div>
					)}
				</Dropzone>
			}
		</>
	);
}
export default ImageDropzone;