import { useState, useEffect } from "react"
import axios from "axios"
import envUrls from "./urlSelector"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [, setRefreshToken] = useState()
  const [, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post(`${envUrls.apiUrl}login`, {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)

        window.history.pushState({}, null, "/")
      })
      .catch(err => {
        console.log(err)
      })
  }, [code])

  return accessToken
}
