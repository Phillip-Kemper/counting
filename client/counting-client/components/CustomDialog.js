/* eslint-disable react/prop-types */
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";

const PaperComponent = (props) => {
  return <Box style={{ backgroundColor: "white" }}>{props.children}</Box>;
};

export const CustomDialog = (props) => {
  //next step: close button
  const { closeDialog, open, title } = props;

  return (
    <Dialog
      maxWidth={"xs"}
      onClose={closeDialog}
      open={open}
      PaperComponent={PaperComponent}
    >
      <DialogTitle>
        <Grid
          container
          direction="row"
          justifyContent={"space-between"}
          alignContent="center"
          alignItems={"center"}
        >
          <Grid item>
            <Typography>{title} </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={closeDialog}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.children}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
