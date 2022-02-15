import React, { useState, useEffect, useContext } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { Message } from "../../components"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"
import { AuthContext } from "../../context/auth"
import { OrderContext } from "../../context/order"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",

    backgroundColor: theme.palette.background.paper,
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: "100%",
    },
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    minHeight: 500,
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(8),
    },
  },
  paperIn: {
    marginTop: theme.spacing(3),
    minHeight: 350,
    backgroundColor: "#f5f5f5",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(3),
    },
  },
  button: {
    float: "right",
  },
  buttonLeft: {
    float: "left",
    marginRight: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}))

export const OrderComment = () => {
  const classes = useStyles()
  const [messageValue, setMessageValue] = useState("")
  const { userInfo } = useContext(AuthContext)
  const { handleUpdateStatus } = useContext(OrderContext)
  const values = JSON.parse(localStorage.getItem("currentOrder"))
  const handleChange = (event) => {
    setMessageValue(event.target.value)
  }
  const [messages, setMessages] = useState([
    {
      name: "Замовник",
      fileName: values.fileName,
      message: values.comment,
      role: "sender",
      firstLang: values.firstLang,
      secondLang: values.secondLang,
    },
  ])
  const handleSubmit = () => {
    setMessages([
      ...messages,
      {
        name: "Перекладач",
        message: messageValue,
        role: userInfo.role,
        firstLang: "",
        secondLang: "",
      },
    ])
    setMessageValue("")
  }
  const handlePending = () => {
    const id = values._id
    const status = "pending"
    handleUpdateStatus(id, status)
  }
  const handleFinish = () => {
    const id = values._id
    const status = "finished"
    handleUpdateStatus(id, status)
  }
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Замовлення 1
          </Typography>

          {messages.map((value, i) => {
            return (
              <Message
                name={value.name}
                fileName={value.fileName}
                message={value.message}
                role={value.role}
                firstLang={value.firstLang}
                secondLang={value.secondLang}
                key={i}
              />
            )
          })}

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-multiline-flexible"
              label="Введіть ваше повідомлення"
              multiline
              rowsMax={6}
              className={classes.TextField}
              value={messageValue}
              onChange={handleChange}
            />
            <input
              accept=".doc, .docx"
              className={classes.input}
              id="file"
              name="uploaded_file"
              multiple
              type="file"
            />
            <label htmlFor="file">
              <Button variant="contained" color="primary" component="span">
                File
              </Button>
            </label>
            {userInfo.role == "translator" ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonLeft}
                  onClick={handleFinish}
                >
                  Finish
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonLeft}
                  onClick={handlePending}
                >
                  Pending
                </Button>
              </>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </form>
        </Paper>
      </main>
    </>
  )
}
