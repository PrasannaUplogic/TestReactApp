import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Box, Container, TextField, Button } from '@material-ui/core';
import axios from 'axios';
// import { Alert } from '@material-ui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
toast.configure();
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [Login, setLogin] = React.useState({
    email: "",
    password: ""
  });
  const [Register, setRegister] = React.useState({
    email: "",
    password: "",
    phone: "",
    username: ""
  });
  const [Profile, setProfile] = React.useState({
    email: "",
    phone: "",
    username: ""
  });




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function on_login() {
    const logindata = {
      "email": Login.email,
      "password": Login.password
    };
    const url = "https://flutterapiapp.herokuapp.com/login";
    axios.post(url, logindata, {
      "headers": {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response.data);

        // toast(response.data.message);
        if(response.data.message =="Login successful"){
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else{
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        



      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function on_Register() {
    const registerdata = {
      "email": Register.email,
      "password": Register.password,
      "name": Register.username,
      "phone": Register.phone
    };
    const url = "https://flutterapiapp.herokuapp.com/register";
    axios.post(url, registerdata, {
      "headers": {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response.data);

        if(response.data.message =="Registered successfully"){
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }else{
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Login" {...a11yProps(0)} />
        <Tab label="Register" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        Login
        <div style={{ marginTop: "30px" }}>
          <TextField id="outlined-basic" label="Email" variant="outlined"
            value={Login.email}
            onChange={(val) => { setLogin({ ...Login, email: val.target.value }) }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField id="outlined-basic" label="Password" variant="outlined"
            value={Login.password}
            onChange={(val) => { setLogin({ ...Login, password: val.target.value }) }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <Button variant="contained" color="secondary"
            onClick={() => {
              on_login()
            }}
          >
            Login
  </Button>
        </div>


      </TabPanel>
      <TabPanel value={value} index={1}>
        Register
        <div style={{ marginTop: "30px" }}>
          <TextField id="outlined-basic" label="Username" variant="outlined"
            value={Register.username}
            onChange={(val) => { setRegister({ ...Register, username: val.target.value }) }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField id="outlined-basic" label="Email" variant="outlined"
            value={Register.email}
            onChange={(val) => { setRegister({ ...Register, email: val.target.value }) }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField id="outlined-basic" label="Phone" variant="outlined"
            value={Register.phone}
            onChange={(val) => { setRegister({ ...Register, phone: val.target.value }) }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField id="outlined-basic" label="Password" variant="outlined"
            value={Register.password}
            security={true}
            onChange={(val) => { setRegister({ ...Register, password: val.target.value }) }}
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <Button variant="contained" color="secondary"
            onClick={() => {
              on_Register()
            }}
          >
            Register
  </Button>
        </div>
      </TabPanel>

    </div>
  );
}
