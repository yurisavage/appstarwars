import React, { useEffect, useState } from "react";
import api from "../../servico/conexaoService";

import {
  Button,
  Divider,
  Paper,
  FormControl,
  FormLabel,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
  Modal,
  AppBar,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

export default function Personagem() {
  const [personagem, setPersonagem] = useState("");
  const [listaPersonagem, setListaPersonagem] = useState([]);
  const [planeta, getPlaneta] = useState("");
  const [filmes, getFilmes] = useState([]);
  const [filmagens, getFilmagens] = useState([]);
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
    setOpen(false);

    setExibirImagem(true);
    setTimeout(() => {
      setExibirImagem(false);
    }, 3000);
  }, []);

  const listar = async () => {
    setListaPersonagem([]);

    for (let i = 1; i < 88; i++) {
      await api
        .get("people/" + i)
        .then((response) => {
          setListaPersonagem((item) => [...item, response.data]);
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

  const abrirModal = async (personagem) => {
    setPersonagem(null);
    setPersonagem(personagem);

    const planetaSeparado = personagem.homeworld.split("api/");
    console.log("personagem.homeworld -- ", planetaSeparado[1]);

    getPlaneta("");
    if (personagem.homeworld) {
      await api
        .get(planetaSeparado[1])
        .then((response) => {
          getPlaneta(response.data);
          console.log("planeta --- ", planeta);
        })
        .catch((error) => {
          console.log("erro -- ", error);
        });
    }

    getFilmes([]);
    getFilmes((item) => [...item, personagem.films]);
    console.log("filmes --- ", filmes);

    const totalFilmes = filmes.length;
    console.log("totalfilmes --- ", filmes.length);
    // for (let i = 1; i <= totalFilmes; i++){
    //     const filmeSeparado = filmes[i].split('"https://swapi.py4e.com/api/"');
    //     console.log('filmeseparado --- ', filmeSeparado)
    //     await api.get(filmeSeparado)
    //         .then(response => {
    //             getFilmagens(filme => [...filme, response.data.title])

    //         })
    //         .catch(error => {
    //             console.log('erro -- ', error)
    //         }
    //     )
    // }
    console.log("filmagens --- ", filmagens);
  };

  const handleOpen = (personagem) => {
    setOpen(true);
    abrirModal(personagem);
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
              src="img/rey_1.gif"
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
              Listar Personagens
            </Button>

            {listaPersonagem.length !== 0 && (
              <div>
                <Paper
                  elevation={1}
                  sx={{ ml: "8rem", mr: "40rem", mb: "2rem", opacity: 0.8 }}
                >
                  <FormControl sx={{ mt: "1rem" }}>
                    <div>
                      <FormLabel
                        sx={{ ml: "3rem", fontSize: "1.5rem", color: "black" }}
                      >
                        Nome
                      </FormLabel>
                      <FormLabel
                        sx={{ ml: "8rem", fontSize: "1.5rem", color: "black" }}
                      >
                        Data de Nascimento
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
                          {listaPersonagem.map((item) => {
                            return (
                              <>
                                <TableRow onClick={() => handleOpen(item)}>
                                  <TableCell sx={{ fontSize: "1.2rem" }}>
                                    {item.name}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: "1.2rem" }}>
                                    {item.birth_year}
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

            <Typography sx={{ mt: "1rem" }}>Nome: {personagem.name}</Typography>

            <Typography sx={{ mt: "1rem" }}>
              Data de Nascimento: {personagem.birth_year}
            </Typography>

            <Typography sx={{ mt: "1rem" }}>
              Planeta: {planeta.name} ({planeta.climate})
            </Typography>
          </Box>
        </Modal>
      </div>

      {!exibirImagem && listaPersonagem.length !== 0 && (
        <div>
          <Box sx={{ background: "black", height: "8rem", mt: "6rem" }}></Box>
        </div>
      )}
      {!exibirImagem && listaPersonagem.length === 0 && (
        <div>
          <Box
            sx={{ background: "black", height: "26.3rem", mt: "6rem" }}
          ></Box>
        </div>
      )}
    </>
  );
}
