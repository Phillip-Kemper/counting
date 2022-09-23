import {
  Box,
  Button,
  Grid,
  Link,
  ListItem,
  List,
  TextField,
  Typography,
  ListSubheader,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Head from "next/head";
import React, { useState } from "react";
import useSWR from "swr";
import { Mountain } from "../components/mountain";
import { COUNT_ENDPOINT, STATS_ENDPOINT } from "../resources/endpoints";
import { PURPLE } from "../resources/theme";
import { SocialIcon } from "react-social-icons";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { CustomDialog } from "../components/CustomDialog";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: countData } = useSWR(COUNT_ENDPOINT, fetcher, {
    refreshInterval: 1000,
  });

  const { data: statsData } = useSWR(STATS_ENDPOINT, fetcher);

  React.useMemo(() => {
    console.log(statsData);
  }, [statsData]);

  const [newCount, setNewCount] = useState(0);
  const [isRulesDialogOpen, setIsRulesDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isStatisticsDialogOpen, setIsStatisticsDialogOpen] = useState(false);

  const StyledTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: PURPLE,
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: PURPLE,
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: PURPLE,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: PURPLE,
        },
        "&:hover fieldset": {
          borderColor: PURPLE,
        },
        "&.Mui-focused fieldset": {
          borderColor: PURPLE,
        },
      },
    },
  })(TextField);

  function handleCountSubmissions(event) {
    event.preventDefault();

    fetch(COUNT_ENDPOINT, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count: newCount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const countResult = data.count;
        setNewCount(countResult);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleInputChange(e) {
    setNewCount(e.target.value);
  }

  if (!countData || !statsData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Mount Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container direction={"row"} justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">
              <Link
                href="http://kemperino.com"
                style={{ textDecoration: "none", color: PURPLE }}
              >
                Visit My Web Page
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <SocialIcon url={"https://twitter.com/Kemperino_"} />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          height={"90vh"}
        >
          <Mountain />
          <Typography
            variant="h4"
            style={{
              marginTop: "-50px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            Current: {countData.count}
          </Typography>

          <Box alignContent={"center"}>
            <form onSubmit={handleCountSubmissions}>
              <Grid
                container
                direction={"row"}
                alignContent="center"
                alignItems={"center"}
              >
                <Grid item>
                  <StyledTextField
                    label="New count"
                    variant="standard"
                    type={"number"}
                    value={newCount}
                    onChange={handleInputChange}
                    size="medium"
                    sx={{ input: { color: PURPLE } }}
                  />
                </Grid>
                <Grid item>
                  <Button style={{ color: PURPLE }} type="submit">
                    <ArrowCircleRightIcon />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>

          <br />
          <br />
          <br />

          <Grid
            container
            direction={"row"}
            alignItems="center"
            spacing={32}
            justifyContent="center"
          >
            <Grid item>
              <Typography
                variant="h4"
                onClick={() => {
                  setIsRulesDialogOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Rules
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                onClick={() => {
                  setIsProjectDialogOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                About This Project
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                onClick={() => {
                  setIsStatisticsDialogOpen(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Statistics
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <CustomDialog
          open={isProjectDialogOpen}
          closeDialog={() => {
            setIsProjectDialogOpen(false);
          }}
          title="About This Project"
        >
          Lorem Ipsum Dalet
        </CustomDialog>

        <CustomDialog
          open={isRulesDialogOpen}
          closeDialog={() => {
            setIsRulesDialogOpen(false);
          }}
          title="Rules"
        >
          <Typography>
            Together we can climb to the summit of the legendary Mount COUNT.
          </Typography>
          <Typography>
            The goal of this game is to climb to the summit of Mount Count as a
            community. To do so, we must reach a height of 8.849m by counting
            up.
          </Typography>
          <div style={{ color: PURPLE }}>
            <List sx={{ listStyleType: "disc" }}>
              <ListSubheader style={{ color: PURPLE }}>
                The following rules apply:
              </ListSubheader>
              <ListItem sx={{ display: "list-item" }}>
                We have to count up to 8.849 starting from 1
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                No number may be skipped - otherwise we go back to 1
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                Any wrong input sends us back to the bottom and we have to start
                at 1 again
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                No player is allowed to count twice in a row
              </ListItem>
            </List>
          </div>
        </CustomDialog>

        <CustomDialog
          open={isStatisticsDialogOpen}
          closeDialog={() => {
            setIsStatisticsDialogOpen(false);
          }}
          title="Statistics"
        >
          <Typography>Total Games Played: {statsData.gamesPlayed}</Typography>
          <Typography>Highscore: {statsData.maxCount}</Typography>
        </CustomDialog>
      </main>
    </>
  );
}
