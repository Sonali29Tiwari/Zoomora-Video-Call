// import * as React from 'react'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// // import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { AuthContext } from '../contexts/AuthContext';
// import Snackbar from '@mui/material/Snackbar';

// const defaultTheme = createTheme();

// export default function Authentication(){

//     const [username, setUsername]  = React.useState();
//     const [password, setPassword]  = React.useState();
//     const [name, setName]  = React.useState();
//     const [error, setError]  = React.useState();
//     const [message, setMessage]  = React.useState();

//     const [formState, setFormState] = React.useState(0);

//     const [open, setOpen] = React.useState(false)

//     const {handleRegister, handleLogin } = React.useContext(AuthContext);


//     let handleAuth = async () => {
//         try{
//             if(formState === 0){
                
//                 let result = await handleLogin(username,password);

//             }

//             if(formState === 1){
//                 let result = await handleRegister(name, username, password);
//                 console.log(result)
//                 setMessage(result)
//                 setOpen(true)
//                 setUsername("")
//                 setFormState(0)
//                 setPassword("")
//                   setError("")
//             }
//         }catch (err){
//             console.error("Auth Error:", err);
//             const message = err.response?.data?.message || err.message || "Something went wrong";
//             setError(message);
//         }
                
//     }
      

//     return(
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{height: '100vh'}}>
//                 <CssBaseline/>

//             <Grid 
//              item 
//              xs = {false}
//              sm = {4}
//              md = {7}
//              sx = {{
//                 minHeight:"100vh",
                
                
//                 // backgroundImage: `url("https://source.unsplash.com/random/1920x1080/?nature&sig=${new Date().getTime()}")`,
//               backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80")',
//             // backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,


//                 backgroundRepeat: 'no-repeat',
//                 backgroundColor: (t) =>
//                     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.green[900],
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     //  border: "2px solid red" //

//              }}
//              />

//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <Box
//                 sx={{
//                     my: 8,
//                     mx: 4,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//                 >

//                 <Avatar sx={{ m:1, bgcolor: 'secondary.main '}}>
//                     <LockOutlinedIcon />
//                 </Avatar>

// <div>
//     <Button variant={formState === 0 ? "contained": ""} onClick={() =>{ setFormState(0)} }>
//         Sign In
//     </Button>

//     <Button variant= {formState === 1 ? "contained": ""} onClick={() =>{ setFormState(1)} }>
//         Sign Up
//     </Button>
// </div>


//                 <Box component="form" noValidate sx={{ mt: 1}}>
//                 <p>{name}</p>
//                     {formState === 1 ?  <TextField 
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="username"
//                     label="Fullname"
//                     name="username"
//                     value={name}
//                     autoComplete="username"
//                     autoFocus
//                     onChange={(e) => setName(e.target.value)}
//                     /> : <></>}
                   

//                      <TextField 
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="username"
//                     label="Username"
//                     name="username"
//                     value={username}
//                     autoFocus
//                     onChange={(e) => setUsername(e.target.value)}
//                     />

//                 <TextField
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     value={password}
//                     id="password"
//                     // autoComplete="current-password"
//                     onChange={(e) => setPassword(e.target.value)}
                    
//                 />

//                 {/* <FormControlLabel
//                 control={<Checkbox value="remember" color='primary' />}
//                 label="Remember me"
//                 /> */}

//                 <p style={{color: "red"}}>{error}</p>

//                 <Button
//                     type="button"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb:2}}
//                     onClick={handleAuth}
//                 >
//                    {formState === 0 ? "Login" : "Register"}
//                 </Button>

//                 </Box>
//              </Box>
//             </Grid>
//           </Grid>

//             <Snackbar
            
//             open= {open}
//             autoHideDuration={4000}  
//             message={message}
            
//             />

//         </ThemeProvider>
//     );
// }



import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Snackbar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthPage() {
  const [formState, setFormState] = React.useState(0);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { handleLogin, handleRegister } = React.useContext(AuthContext);

  const handleAuth = async () => {
    console.log('Form Submitted:', { name, username, password });
    setError('');
    try {
      if (formState === 0) {
        const result = await handleLogin(username, password);
        setMessage(result);
        setOpen(true);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setUsername('');
        setPassword('');
        setName('');
        setFormState(0);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <CssBaseline />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        //   backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80")',
        backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/011/635/825/non_2x/abstract-square-interface-modern-background-concept-fingerprint-digital-scanning-visual-security-system-authentication-login-vector.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      />

      <Box
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 10,
          p: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant={formState === 0 ? 'contained' : 'outlined'}
            onClick={() => setFormState(0)}
          >
            Sign In
          </Button>
          <Button
            variant={formState === 1 ? 'contained' : 'outlined'}
            onClick={() => setFormState(1)}
          >
            Sign Up
          </Button>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          {formState === 1 && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleAuth}
          >
            {formState === 0 ? 'Login' : 'Register'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </Box>
  );
}
