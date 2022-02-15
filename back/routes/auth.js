const router = require("express").Router()
const User = require("../model/user")
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//VALIDATION

router.post("/register", async (req, res) => {
  //VALIDATE
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }
  //Check unique
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send({ error: "Email already exists" })

  //HASH PASS

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //New user
  const user = new User({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  })
  try {
    const savedUser = await user.save()
    res.send({
      user: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      role: user.role,
    })
  } catch (err) {
    res.status(400).send({ error: err })
  }
})

//Login
router.post("/login", async (req, res) => {
  //VALIDATE
  const { error } = loginValidation(req.body)
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }
  //CHECKING IF EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ error: "Email doesn't exist" })
  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send({ error: "Invalid password" })

  res.send({
    user: user._id,
    firstName: user.firstName,
    secondName: user.secondName,
    email: user.email,
    role: user.role,
  })

  // //Create and assign a JWT token
  // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  // res.header("auth-token", token).send(token)
})

module.exports = router
