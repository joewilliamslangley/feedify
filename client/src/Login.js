import React from "react"
import { Container } from "react-bootstrap"

const params = new URLSearchParams({
  client_id: '0ab62b72024b4e79b14900920249deea',
  response_type: "code",
  redirect_uri: 'http://localhost:3000',
  scope: "user-read-private user-library-modify user-library-read streaming user-read-playback-state user-modify-playback-state playlist-modify-public playlist-read-private playlist-modify-private user-follow-read"
})

const AUTH_URL = (`https://accounts.spotify.com/authorize?${params.toString()}`)

export default function Login() {
  return (
    <a href={AUTH_URL}>
      Login With Spotify
    </a>
  )
}
