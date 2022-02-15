import React, { useEffect, useState, useCallback } from "react"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentStatus, setStatus] = useState(true)
  const [userInfo, setUserInfo] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState("")

  console.log(currentUser, currentStatus)

  const handleLogin = async (event, email, password) => {
    event.preventDefault()
    const userInfo = { email: email, password: password }
    setError("")

    const res = await fetch(`api/user/login`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    } else {
      setUserInfo(data)
      console.log(data)
      setCurrentUser(data.user)
      localStorage.setItem("userInfo", JSON.stringify(data))
      setStatus(true)
      setError("")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userInfo")
    setUserInfo("")
    setCurrentUser(null)
  }

  const handleSignUp = async (
    event,
    firstName,
    secondName,
    email,
    password,
    role
  ) => {
    event.preventDefault()
    setError("")
    const userInfo = {
      firstName: firstName,
      secondName: secondName,
      email: email,
      password: password,
      role: role,
    }
    const res = await fetch(`api/user/register`, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    } else {
      setUserInfo(data)
      console.log(data)
      setCurrentUser(data.user)
      localStorage.setItem("userInfo", JSON.stringify(data))
      setStatus(true)
      setError("")
    }
  }
  //const handleSignUp = useCallback(async event => {
  //    event.preventDefault();
  //    const { email, password, passwordConfrmation } = event.target.elements;
  //    if (password.value !== passwordConfrmation.value) {
  //            console.log(password)
  //            console.log(passwordConfrmation)
  //            throw alert("Passwords not match")
  //        }
  //    else {
  //        try {
  //            await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
  //        }  catch (error) {
  //            alert(error);
  //        }
  //    }

  //}, [])

  //const handleLogin = useCallback(async event => {
  //    event.preventDefault();
  //    const { email, password } = event.target.elements;
  //    try {
  //        await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
  //    } catch (error) {
  //        alert(error);
  //    }
  //}, [])

  //const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if (user) {
      setCurrentUser(user.username)
      setUserInfo(user)
      setStatus(true)
    } else {
      setCurrentUser("")
      setUserInfo("")
    }

    // localStorage.setItem('userData', JSON.stringify(user));
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogin,
        currentStatus,
        setStatus,
        userInfo,
        handleLogout,
        handleSignUp,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
