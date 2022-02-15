import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { fade, makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import Link from "@material-ui/core/Link"
import { AuthContext } from "../../context/auth"

const useStyles = makeStyles((theme) => ({
  paddingTop: {
    paddingTop: theme.spacing(8),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  name: {
    paddingTop: 13,
    paddingRight: 5,
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

export const Header = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const { handleLogout, currentUser, userInfo } = useContext(AuthContext)

  let history = useHistory()

  const handleClickLogo = () => {
    history.push("/")
  }

  const handleClickSignin = () => {
    history.push("/signin")
  }

  const handleClickNotification = () => {
    history.push("/orderlist")
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userInfo ? (
        <div>
          <MenuItem onClick={handleClickNotification}>Мої замовлення</MenuItem>
          <MenuItem onClick={handleLogout}>Вийти</MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleClickSignin}>Увійти</MenuItem>
      )}
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userInfo ? (
        <div>
          <MenuItem>
            <IconButton color="inherit" onClick={handleClickNotification}>
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Мої замовлення</p>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Вийти</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleClickSignin}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Увійти</p>
        </MenuItem>
      )}
    </Menu>
  )
  const preventDefault = (event) => event.preventDefault()

  return (
    <div className={classes.grow}>
      <div className={classes.paddingTop} />
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Button size="large" onClick={handleClickLogo} color="inherit">
              Бюро перекладу
            </Button>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography className={classes.name} variant="h7" noWrap>
              {userInfo.firstName}
            </Typography>
            {userInfo ? (
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClickNotification}
              >
                <Badge color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            ) : (
              ""
            )}

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
