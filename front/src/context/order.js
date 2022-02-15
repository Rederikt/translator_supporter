import React, { useEffect, useState, useCallback } from "react"
import { useHistory } from "react-router-dom"

export const OrderContext = React.createContext()

export const OrderProvider = ({ children }) => {
  const [orderInfo, setOrderInfo] = useState("")
  const [orderLength, setOrderLength] = useState(null)
  const [error, setError] = useState("")
  const [allOrders, setAllOrders] = useState([])
  let history = useHistory()
  const handleMakeOrder = async (
    event,
    userId,
    firstLang,
    secondLang,
    comment,
    file,
    finishDate,
    orderPrice
  ) => {
    event.preventDefault()

    let orderInfo = {
      userId: userId,
      firstLang: firstLang,
      secondLang: secondLang,
      comment: comment,
      fileName: file,
      finishDate: finishDate,
      orderPrice: orderPrice,
    }
    // let formData = new FormData()

    // for (const key in orderInfo) {
    //   formData.append(key, orderInfo[key])
    // }
    setError("")
    const res = await fetch(`api/order/order`, {
      method: "POST",
      body: JSON.stringify(orderInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    } else {
      setOrderInfo(data)
      console.log(data)
      localStorage.setItem("orderInfo", JSON.stringify(data))
      setError("")
    }
  }

  const getAllOrders = async () => {
    const res = await fetch(`/api/order/orders`)
    const ordersData = await res.json()
    setAllOrders(ordersData)
  }

  const getFile = async (event, fileName) => {
    const res = await fetch(`/api/order/download/${fileName}`)
    window.open(`http://localhost:4000/api/order/download/${fileName}`)
  }

  const handleUploadFile = async (event, file) => {
    event.preventDefault()

    // let orderInfo = {
    //   userId: userId,
    //   firstLang: firstLang,
    //   secondLang: secondLang,
    //   comment: comment,
    //   fileName: file,
    //   finishDate: finishDate,
    // }

    const formData = new FormData()
    formData.append("uploaded_file", file)

    const res = await fetch(`api/order/upload`, {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    } else {
      // setOrderInfo(data)
      console.log(data)
      setOrderLength(data.length)
      localStorage.setItem("orderLength", JSON.stringify(data))
      setError("")
    }
  }

  const handleUpdateStatus = async (
    orderId,
    status
  ) => {
    console.log(orderId)
    let updateInfo = {
      id: orderId,
      status: status
    }
    setError("")
    const res = await fetch(`/api/order/status`, {
      method: "PUT",
      body: JSON.stringify(updateInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // const data = await res.json()
    // console.log(data)
    // if (data.error) {
    //   setError(data.error)
    // } else {
    //   setOrderInfo(data)
    //   console.log(data)
    //   localStorage.setItem("orderInfo", JSON.stringify(data))
    //   setError("")
    // }
  }

  return (
    <OrderContext.Provider
      value={{
        error,
        handleMakeOrder,
        handleUploadFile,
        orderLength,
        getAllOrders,
        allOrders,
        getFile,
        handleUpdateStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
