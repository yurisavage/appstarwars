import { Box, Card, CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Starship() {
  const [exibirImagem, setExibirImagem] = useState(false);

  useEffect(() => {
    setExibirImagem(true);
    // setTimeout(() => {
    //     setExibirImagem(false)
    //   }, 4600);
  }, []);

  const renderizarImagem = (
    <>
      <Grid>
        <Card>
          <Box>
            <CardMedia
              component="img"
              src="img/Lea_1.gif"
              sx={{ width: "80rem", height: "26.5rem" }}
            ></CardMedia>
          </Box>
        </Card>
      </Grid>
    </>
  );

  return <div>{renderizarImagem}</div>;
}
