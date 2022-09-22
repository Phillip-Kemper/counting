import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";

const PaperComponent = (props) => {
  return <Box style={{ backgroundColor: "grey" }}>{props.children}</Box>;
};

export const AboutThisProjectDialog = (props) => {
  const { closeDialog, open } = props;

  return (
    <Dialog
      maxWidth={"sm"}
      onClose={closeDialog}
      open={open}
      PaperComponent={PaperComponent}
    >
      <DialogTitle>About This Project</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
