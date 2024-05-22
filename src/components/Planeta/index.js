import React, { useEffect, useState } from "react";

import apiPlanetas from "../../servico/conexaoPlanetaApi";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

export default function Planeta() {
  const [planeta, setPlaneta] = useState("");
  const [listaPlaneta, setListaPlaneta] = useState([]);
  const [exibirImagem, setExibirImagem] = useState(false);
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid yellow",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setExibirImagem(true);
    setTimeout(() => {
      setExibirImagem(false);
    }, 4600);
  }, []);

  const listar = async () => {
    setListaPlaneta([]);

    for (let i = 1; i < 61; i++) {
      await apiPlanetas
        .get("/" + i)
        .then((response) => {
          if (response.data)
            setListaPlaneta((item) => [...item, response.data]);
          console.log("response -- ", response.data);
        })
        .catch((error) => {
          console.log("erro -- ", error);
          setExibirImagem(true);
        })
        .finally(() => {
          setExibirImagem(false);
        });
    }
  };

  const abrirModal = async (planeta) => {
    setPlaneta("");
    setPlaneta(planeta);
  };

  const handleOpen = (planeta) => {
    setOpen(true);
    abrirModal(planeta);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderizarImagem = (
    <>
      <Grid>
        <Card>
          <Box>
            <CardMedia
              component="img"
              src="img/rey_3.gif"
              sx={{ width: "80rem", height: "26.5rem" }}
            ></CardMedia>
          </Box>
        </Card>
      </Grid>
    </>
  );

  return (
    <>
      <div>
        {exibirImagem && renderizarImagem}

        {!exibirImagem && (
          <Box
            style={{
              backgroundImage: `url(img/space.jpg)`,
            }}
            sx={{ width: "auto", height: "auto", mb: "-6rem" }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ ml: "2rem", mb: "2rem", mt: "2rem", color: "yellow" }}
              onClick={() => listar()}
            >
              Listar Planetas
            </Button>

            {listaPlaneta.length && (
              <div>
                <Paper
                  elevation={1}
                  sx={{ ml: "8rem", mr: "39rem", mb: "2rem", opacity: 0.8 }}
                >
                  <FormControl sx={{ mt: "1rem" }}>
                    <div>
                      <FormLabel
                        sx={{ ml: "3rem", fontSize: "1.5rem", color: "black" }}
                      >
                        Planeta
                      </FormLabel>
                      <FormLabel
                        sx={{ ml: "8rem", fontSize: "1.5rem", color: "black" }}
                      >
                        População
                      </FormLabel>
                      <Divider sx={{ ml: "2rem" }} />
                    </div>

                    <TableContainer sx={{ ml: "2rem" }}>
                      <Table
                        sx={{
                          "& .MuiTableRow-root:hover": {
                            backgroundColor: "#EBEBEB",
                          },
                        }}
                      >
                        <TableBody>
                          {listaPlaneta.map((item) => {
                            return (
                              <>
                                <TableRow onClick={() => handleOpen(item)}>
                                  <TableCell sx={{ fontSize: "1.2rem" }}>
                                    {item.name}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: "1.2rem" }}>
                                    {item.population}
                                  </TableCell>
                                  <Divider sx={{ ml: "2rem", mr: "4rem" }} />
                                </TableRow>
                              </>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </FormControl>
                </Paper>
              </div>
            )}
          </Box>
        )}

        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...style, width: "30rem" }}>
            <AppBar sx={{ background: "black" }}>
              <Typography
                variant="h6"
                component="h5"
                sx={{ ml: "1rem", mb: "0.5rem" }}
              >
                Informações
              </Typography>
            </AppBar>

            <Typography sx={{ mt: "1rem" }}>Nome: {planeta.name}</Typography>

            <Typography sx={{ mt: "1rem" }}>
              Clima: {planeta.climate}
            </Typography>

            <Typography sx={{ mt: "1rem" }}>
              Terreno: {planeta.terrain}
            </Typography>

            <Typography sx={{ mt: "1rem" }}>
              População: {planeta.population}
            </Typography>
          </Box>
        </Modal>
      </div>

      {!exibirImagem && listaPlaneta.length !== 0 && (
        <div>
          <Box sx={{ background: "black", height: "8rem", mt: "6rem" }}></Box>
        </div>
      )}
      {!exibirImagem && listaPlaneta.length === 0 && (
        <div>
          <Box
            sx={{ background: "black", height: "26.3rem", mt: "6rem" }}
          ></Box>
        </div>
      )}
    </>
  );
}
