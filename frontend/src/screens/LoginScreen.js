import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { ReactComponent as LoginImage } from '../assets/images/login-illu.svg';
import logo from '../assets/images/logo.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { BiArrowBack } from 'react-icons/bi';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.customize.centerFlex(),
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    height: '85vh',
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    boxShadow: '0px 0px 25px -18px rgba(0,0,0,0.75)',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(227, 65, 85, 0.08)',
  },
  content: {
    position: 'relative',
    ...theme.mixins.customize.flexMixin('flex-start', 'center', 'column'),
    padding: '24px 20%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: '24px 10%',
    },
  },
  form: {
    paddingTop: theme.spacing(6),
  },
  backIcon: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
  logo: {
    width: '120px',
    marginTop: 8,
  },
}));

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} square>
        <Grid container component={Paper} className={classes.container}>
          <Grid item sm={12} md={6}>
            <Box className={classes.content}>
              <Button
                component={RouterLink}
                to='/'
                startIcon={<BiArrowBack />}
                className={classes.backIcon}
              />
              <img src={logo} alt='' className={classes.logo} />
              {loading && <Loader />}
              {error && <Message mt={24}>{error}</Message>}
              <form className={classes.form} onSubmit={submitHandler}>
                <FormControl fullWidth style={{ marginBottom: 16 }}>
                  <InputLabel htmlFor='email' style={{ fontSize: 14 }}>
                    Email
                  </InputLabel>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth style={{ marginBottom: 8 }}>
                  <InputLabel htmlFor='password' style={{ fontSize: 14 }}>
                    Password
                  </InputLabel>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      password && (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <VscEye /> : <VscEyeClosed />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  />
                </FormControl>
                <Box display='flex' justifyContent='flex-end' pb={3} pt={1}>
                  <Link component={RouterLink} to='/forgot-pasword'>
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  fullWidth
                >
                  Sign in
                </Button>
              </form>
              <Box my={4}>
                New customer?{' '}
                <Link component={RouterLink} to='/register'>
                  Create Account
                </Link>
              </Box>
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item xs={6}>
              <LoginImage className={classes.image} />
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default LoginScreen;
