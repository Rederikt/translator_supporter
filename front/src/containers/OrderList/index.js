import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import CommentIcon from "@material-ui/icons/Comment"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { AuthContext } from "../../context/auth"
import { OrderContext } from "../../context/order"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}))

export const OrderList = () => {
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  let history = useHistory()
  const { userInfo } = useContext(AuthContext)
  const { getAllOrders, allOrders } = useContext(OrderContext)
  const handleClick = (event, value) => {
    event.preventDefault()
    localStorage.setItem("currentOrder", JSON.stringify(value))
    history.push(`/comment/${value._id}`)
  }
  useEffect(() => {
    getAllOrders()
  })
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Замовлення
          </Typography>
          <List className={classes.root}>
            {allOrders.map((value) => {
              const labelId = `checkbox-list-label-${value}`

              return (
                <ListItem
                  key={value._id}
                  role={undefined}
                  dense
                  button
                  onClick={(event) => handleClick(event, value)}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`Замовлення ${value.fileName} - ${
                      value.orderStatus == "pending" ? "в процесі" : "виконано"
                    } `}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </main>
    </React.Fragment>
  )
}
