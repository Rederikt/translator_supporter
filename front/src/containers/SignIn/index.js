import React, { useState, useContext, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { AuthContext } from "../../context/auth"
import Alert from "@material-ui/lab/Alert"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Бюро перекладу
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const SignIn = () => {
  const { handleLogin, currentUser, userInfo, error, setError } =
    useContext(AuthContext)
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Увійти
        </Typography>
        <form
          className={classes.form}
          onSubmit={(event) => handleLogin(event, email, password)}
          noValidate
        >
          {error ? <Alert severity="error">{error}</Alert> : ""}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адреса"
            name="email"
            autoComplete="email"
            onChange={handleEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            onChange={handlePassword}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Увійти
          </Button>
          <Grid container>
            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Забули пароль?
                </Link>
              </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Немає акаунту? Зареєструватися"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
