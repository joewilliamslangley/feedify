import React from "react"
import Button from 'react-bootstrap/Button'
import envUrls from "./urlSelector"
import './Login.css'

const params = new URLSearchParams({
  client_id: '0ab62b72024b4e79b14900920249deea',
  response_type: "code",
  redirect_uri: String(envUrls.redirectUrl),
  scope: "user-read-private playlist-modify-public playlist-read-private playlist-modify-private user-follow-read"
})

const AUTH_URL = (`https://accounts.spotify.com/authorize?${params.toString()}`)

export default function Login() {
  return (
    <div className="login">
      <Button variant="outline-primary" className="btn-blue" size="lg" href={AUTH_URL}>
        Login With Spotify
      </Button>
    </div>
  )
}
