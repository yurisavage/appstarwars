import React from "react";
import { Box, Card, CardMedia, Grid } from "@mui/material";

export default function Principal() {
  return (
    <>
      <div>
        <Grid>
          <Card>
            <Box>
              <CardMedia
                component="img"
                src="img/vader.gif"
                sx={{ width: "80rem", height: "26.5rem" }}
              ></CardMedia>              
            </Box>
          </Card>
        </Grid>
      </div>
    </>
  );
}
