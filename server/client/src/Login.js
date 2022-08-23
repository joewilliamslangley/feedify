import React from "react"
import Button from 'react-bootstrap/Button'
import './Login.css'

const params = new URLSearchParams({
  client_id: '0ab62b72024b4e79b14900920249deea',
  response_type: "code",
  redirect_uri: 'https://feedify-me.herokuapp.com/',
  scope: "user-read-private user-library-modify user-library-read streaming user-read-playback-state user-modify-playback-state playlist-modify-public playlist-read-private playlist-modify-private user-follow-read"
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
