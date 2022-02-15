import React, { useContext } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { BusinessTwoTone } from "@material-ui/icons"
import { AuthContext } from "../../context/auth"
import { OrderContext } from "../../context/order"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    zIndex: 1,
  },
  translator: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: "#a7aecc",
    maxWidth: "100%",
    // float: 'left',
  },
  sender: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: "#b2a7cc",
    maxWidth: "100%",
    // float: 'right',
  },
  files: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}))

export const Message = ({
  name,
  fileName,
  message,
  role,
  firstLang,
  secondLang,
}) => {
  const classes = useStyles()
  const { getFile } = useContext(OrderContext)
  const userName = <div className={"color: red"}>{name}</div>
  const handleDownload = (event, fileName) => {
    event.preventDefault()
    getFile(event, fileName)
  }

  return (
    <div className={classes.root}>
      <SnackbarContent
        message={message}
        action={userName}
        className={role == "translator" ? classes.translator : classes.sender}
      />{" "}
      {fileName ? (
        <div className={classes.file}>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => handleDownload(event, fileName)}
          >
            {fileName}
            <div>{firstLang ? `\xa0 ${firstLang} - ${secondLang}` : ""}</div>
          </Button>
        </div>
      ) : (
        ""
      )}{" "}
    </div>
  )
}
