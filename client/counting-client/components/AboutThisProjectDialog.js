import { Dialog, DialogTitle } from "@mui/material";
import React from "react";

export const AboutThisProjectDialog = (props) => {
  const { closeDialog, open } = props;

  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle>About This Project</DialogTitle>
      <p> hi</p>
    </Dialog>
  );
};
