import React from 'react';
import { Routes, Route, HashRouter, Link } from 'react-router-dom';

import Personagem from './components/Personagem';
import Planeta from './components/Planeta';
import Starship from './components/Straship';
import Principal from './components/Principal/Principal';

import { Button, Typography, AppBar, Card, CardMedia, Grid } from '@mui/material';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar sx={{ background: 'black' }}>
            <Typography 
              variant='h3' 
              sx={{ ml: '5rem', mb: '1rem', color: 'black', 
                    fontFamily: 'Verdana', WebkitTextStrokeColor: 'yellow', 
                    WebkitTextStrokeWidth: '0.1rem', fontWeight: 'bold' }}>App Star Wars
            </Typography>                     
          </AppBar>  
        <div>
        
          <HashRouter>
            <Typography sx={{ background: 'black', height: '10rem' }}>
              <Button component={Link} to='/' variant="outlined" sx={{ mt: '6rem', ml: '2rem', borderColor:'yellow', color:'yellow', background: 'black'}}>
                Principal
              </Button>
              
              <Button component={Link} to='/personagem' variant="outlined" sx={{ mt: '6rem', ml: '2rem', mr: '2rem', borderColor:'yellow', color:'yellow', background: 'black'}}>
                Personagens
              </Button>
              
              <Button component={Link} to='/planeta' variant="outlined"  sx={{  mt: '6rem', mr: '2rem',  borderColor:'yellow', color:'yellow', background: 'black' }}>
                Planetas
              </Button>

              <Button component={Link} to='/starship' variant="outlined" sx={{  mt: '6rem', mr: '2rem',  borderColor:'yellow', color:'yellow', background: 'black' }}>
                Starship
              </Button>
              

              <Grid>
          <Card>
            <CardMedia
                component="audio"
                autoPlay
                constrol
                src="audio/Star Wars Music Pick Episode IV- The Force Theme.mp3"
              ></CardMedia>
            </Card> 
          </Grid>
            </Typography>

             
              
            <div>
              <Routes>
                <Route path="/" exact element={<Principal />}></Route>
                <Route path="/personagem" exact element={<Personagem />}></Route>
                <Route path="/planeta" exact element={<Planeta />}></Route>
                <Route path="/starship" exact element={<Starship />}></Route>
              </Routes>              
            </div>
            
          </HashRouter>        
        </div>
      </div>
      
    );
  }
  
}

export default App;
