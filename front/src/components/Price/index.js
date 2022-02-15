import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"

const products = [{ name: "Product 1", desc: "A nice thing", price: "$9.99" }]

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}))

export const Price = ({ orderPrice, orderLength, file }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ціна замовлення
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary={file ? file : "Закріпіть файл"}
            secondary={orderLength ? `${orderLength} символів` : "0 символів"}
          />
          <Typography variant="body2">{orderPrice} грн.</Typography>
        </ListItem>
      </List>
    </React.Fragment>
  )
}
