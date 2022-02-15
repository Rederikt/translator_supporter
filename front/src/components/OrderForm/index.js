import React, { useState, useContext, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Alert from "@material-ui/lab/Alert"
import { Price } from "../Price"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/auth"
import { OrderContext } from "../../context/order"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "95%",
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 220,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

export const OrderForm = () => {
  const { userInfo } = useContext(AuthContext)
  const { handleMakeOrder, handleUploadFile, orderLength, orderInfo } =
    useContext(OrderContext)
  const classes = useStyles()
  const fileHolder = "Додайте ваш документ"
  const [error, setError] = useState(0)
  const [comment, setComment] = useState("")
  const [finishDate, setFinishDate] = useState("")
  const [file, setFile] = useState(fileHolder)
  const [fileContent, setFileContent] = useState(null)
  const [firstLang, setFirstLang] = useState("")
  const [secondLang, setSecondLang] = useState("")
  const [errorText, setErrorText] = useState("")
  const [orderPrice, setOrderPrice] = useState("")
  let history = useHistory()

  const handleClick = async (
    event,
    firstLang,
    secondLang,
    comment,
    file,
    finishDate,
    orderPrice
  ) => {
    debugger
    await handleMakeOrder(
      event,
      userInfo.user,
      firstLang,
      secondLang,
      comment,
      file,
      finishDate,
      orderPrice
    )
    history.push("/thank")
  }
  const handleFirstLang = (event) => {
    setFirstLang(event.target.value)
  }
  const handleComment = (event) => {
    setComment(event.target.value)
  }
  const handleSecondLang = (event) => {
    setSecondLang(event.target.value)
  }
  const handleFile = async (event) => {
    let f = event.target.files[0]
    await handleUploadFile(event, f)
    setFile(f.name)
    setFileContent(f)
    localStorage.removeItem("orderInfo")
  }
  const handleDate = (event) => {
    setFinishDate(event.target.value)
  }
  const handleNext = (event, userId) => {
    if (file != fileHolder) {
      setError(0)
      handleClick(
        event,
        firstLang,
        secondLang,
        comment,
        file,
        finishDate,
        orderPrice
      )
    } else if (!firstLang) {
      setErrorText("Виберіть мову з якої перекладати!")
      setError(1)
    } else if (!secondLang) {
      setErrorText("Виберіть мову на яку перекладати")
      setError(1)
    } else if (!finishDate) {
      setErrorText("Виберіть дату до якої бажаєте отримати переклад!")
      setError(1)
    } else {
      setErrorText("Прикріпіть файл для перекладу!")
      setError(1)
    }
  }
  const handleBack = (event) => {
    history.push("/")
  }

  useEffect(() => {
    setOrderPrice((orderLength * 0.12).toFixed(2).toString())
  }, [orderLength])

  return (
    <>
      {error ? <Alert severity="error">{errorText}</Alert> : ""}
      <Typography variant="h6" gutterBottom>
        Оформіть замовлення
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Перекласти з
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={firstLang}
              onChange={handleFirstLang}
              label="Перекласти з"
              required
            >
              <MenuItem value={"eng"}>Англійська</MenuItem>
              <MenuItem value={"ukr"}>Українська</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Перекласти на
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={secondLang}
              onChange={handleSecondLang}
              label="Перекласти на"
              required
            >
              <MenuItem value={"eng"}>Англійська</MenuItem>
              <MenuItem value={"ukr"}>Українська</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <input
            accept=".doc, .docx"
            className={classes.input}
            id="file"
            name="uploaded_file"
            multiple
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              {file ? file.split("\\").splice(-1) : "Додайте ваш документ"}
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Бажана кінцева дата (до)"
            type="date"
            defaultValue={finishDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDate}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Ціна замовлення
          </Typography>
          <List disablePadding>
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={file ? file : "Закріпіть файл"}
                secondary={
                  orderLength ? `${orderLength} символів` : "0 символів"
                }
              />
              <Typography variant="body2">
                {orderPrice ? `${orderPrice} грн.` : "0 грн"}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <TextField
            id="outlined-multiline-static"
            label="Коментар"
            multiline
            rows={6}
            defaultValue=""
            variant="outlined"
            onChange={handleComment}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {"Підтвердити"}
        </Button>
        <Button onClick={handleBack} className={classes.button}>
          Назад
        </Button>
      </div>
    </>
  )
}
