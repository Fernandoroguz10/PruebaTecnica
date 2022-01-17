import * as React from 'react';
import styles from './Pruebatecnica.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Modal } from '@material-ui/core';

const ModaluseStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//functions format Object
function showObject(object,property){
  if(object[property]!=undefined ) {
    let prop=object[property];
    return Object.keys(prop).map((obj, i) => (<>{prop[obj]}{i+1!=Object.keys(prop).length?',':''} </>));
  }
}
function showCurrencies(object,property){
  if(object[property]!=undefined ) {
    let prop=object[property];
    return Object.keys(prop).map((mon,i)=> (<>{prop[mon].name}{i+1!=Object.keys(prop).length?',':''} </>));
  }
}
//End functions format Object
//typeof object[obj] === 'object'?showObject(object[obj]):
const pruebatecnica =(IPruebatecnicaProps)=>{
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [infoSelect,setinfoSelect]=useState([]);
  //Start action Modal
  const handleOpen = (row) => {
    setinfoSelect([row])
    setOpen(true);
  };

  const handleClose = () => {
    setinfoSelect([]);
    setOpen(false);
  };
  //End action Modal

  //Execute Styles
  const ModalStyles = ModaluseStyles();
  const [modalStyle] = React.useState(getModalStyle);
  //End Execute Styles
  const getCountries = async ()=>{
        await axios.get('https://restcountries.com/v3.1/all').then(result=>{
        setCountries(result.data);        
       });    
  }
  useEffect(() => {
    getCountries();
  }, []);

  return(
    <div className={styles.pruebatecnica}>
      <h1>{IPruebatecnicaProps.description}</h1>
      <div className={styles.container}>
    <TableContainer component={Paper}>
      <Table  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>País</TableCell>
            <TableCell align="right">Idioma</TableCell>            
            <TableCell align="right">Moneda</TableCell>
            <TableCell align="right">Bandera</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((row) => (
            <TableRow key={row.name.official} onClick={()=>handleOpen(row)}>
              <TableCell component="th" scope="row" >
              {row.name.official}
              </TableCell>
              <TableCell align="right">{showObject(row,'languages')}</TableCell>
              <TableCell align="right">{showCurrencies(row,'currencies')} </TableCell>
              <TableCell align="right"><img src={row.flags.png} width={16}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   {infoSelect!=undefined ?
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
   
    <div style={modalStyle} className={ModalStyles.paper}>
    {infoSelect.map((country)=>{ return (<><h2 id="simple-modal-title">{country.name.official}</h2>
      <img src={country.flags.png}/>
     <ul>
       <li>Idiomas:{showObject(country,'languages')}</li>
       <li>Área:{country.area}</li>
       <li>Moneda:{showCurrencies(country,'currencies')}</li>
       <li>Poblacion:{country.population}</li>
       <li>Continente:{country.continents}</li>
       <li>Estatus:{country.status}</li>
       <li>Diferencia Horaria:{country.timezones}</li>
       <li>Latitud Longitud:{country.latlng}</li>
     </ul>
    </>  )  
})} 
     
    
    </div>
  
      </Modal>:""   
  
  }
    
      </div>
    </div>
  );

   
}
export default pruebatecnica;

