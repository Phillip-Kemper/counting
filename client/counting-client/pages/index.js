import Head from "next/head";
import React, { useState } from "react";
import { Typography, TextField, Button, Grid, Link } from "@mui/material";
import useSWR from "swr";
import { COUNT_ENDPOINT } from "../resources/endpoints";
import { RED, THEME } from "../resources/theme";
import { Mountain } from "../components/mountain";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data } = useSWR(COUNT_ENDPOINT, fetcher, {
    refreshInterval: 1000,
  });

  const [newCount, setNewCount] = useState(0);

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

  if (!data) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Mount Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h5">
          <Link
            href="http://kemperino.com"
            style={{ textDecoration: "none", color: RED }}
          >
            Visit My Web Page
          </Link>
        </Typography>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          height={"90vh"}
        >
          <Mountain />
          <Typography variant={"h2"}>Current count</Typography>
          <Typography variant="h3">{data.count}</Typography>
          <Typography variant="h4">Submit new count</Typography>

          <form onSubmit={handleCountSubmissions}>
            <TextField
              id="outlined-basic"
              label="New count"
              variant="outlined"
              type={"number"}
              value={newCount}
              onChange={handleInputChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Grid>
      </main>
    </>
  );
}
