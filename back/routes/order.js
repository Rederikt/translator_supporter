const router = require("express").Router()
const multer = require("multer")
var mammoth = require("mammoth")

const Order = require("../model/order")
const { orderValidation } = require("../validation")
// const bcrypt = require("bcryptjs")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })
//VALIDATION

router.post("/order", async (req, res) => {
  // VALIDATE
  const { error } = orderValidation(req.body)
  if (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  // console.log(req.body)
  // console.log(req.file)

  //Check unique
  // const emailExist = await User.findOne({ email: req.body.email })
  // if (emailExist) return res.status(400).send({ error: "Email already exists" })
  //HASH PASS
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(req.body.password, salt)
  //New user
  const order = new Order({
    userId: req.body.userId,
    firstLang: req.body.firstLang,
    secondLang: req.body.secondLang,
    comment: req.body.comment,
    fileName: req.body.fileName,
    finishDate: req.body.finishDate,
    orderPrice: req.body.orderPrice,
  })
  try {
    const savedOrder = await order.save()

    res.send({
      orderId: order._id,
      userId: order.userId,
      firstLang: order.firstLang,
      secondLang: order.secondLang,
      comment: order.comment,
      fileName: order.fileName,
      finishDate: order.finishDate,
      orderStatus: order.orderStatus,
      orderPrice: order.orderPrice,
    })
  } catch (err) {
    res.status(400).send({ error: err })
  }
})

router.post("/upload", upload.single("uploaded_file"), async (req, res) => {
  try {
    // res.send(req.file)
    // fileText = textract.fromFileWithPath(
    //   `/upload/${req.file.originalname}`,
    //   function (error, text) {
    //     console.log(text)
    //   }
    // )
    // console.log(fileText)
    //
    const textLength = (
      await mammoth.extractRawText({
        path: `D:/coursework/back/uploads/${req.file.originalname}`,
      })
    ).value.match(/\S/g).length
    res.send({ length: textLength })
  } catch (err) {
    res.send(400)
  }
})

router.get("/orders", async (req, res) => {
  Order.find().then((orders, err) => {
    if (err) {
      res.send(err)
    }
    console.log(orders)
    res.json(orders)
  })
})

router.get("/download/:fileName", async (req, res) => {
  console.log(req.params.fileName)
  try {
    const file = `D:/coursework/back/uploads/${req.params.fileName}`
    console.log(file)
    res.download(file) // Set disposition and send it.
  } catch (err) {
    res.status(400).send({ error: err })
  }
})

router.put("/status", async (req, res) => {
  console.log(req.body.id)
  const id = req.body.id
  const status = req.body.status
  try {
    Order.findByIdAndUpdate(
      { _id: id },
      { orderStatus: status },
      function (err, docs) {
        if (err) {
          console.log(err)
        } else {
          console.log("Updated order : ", docs)
        }
      }
    )
    res.send(status)
  } catch {
    res.send(500)
  }
})

module.exports = router
