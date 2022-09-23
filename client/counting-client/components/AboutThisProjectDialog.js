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
  return <Box style={{ backgroundColor: "grey" }}>{props.children}</Box>;
};

export const AboutThisProjectDialog = (props) => {
  //next step: close button
  const { closeDialog, open } = props;

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
            <Typography>About This Project </Typography>
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
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
