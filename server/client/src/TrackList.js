import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Track from './Track'
import './TrackList.css'

export default function TrackList(props) {
  return (
    <Container className="tracklist-container">
      <div className="tracklist">
        {props.tracks.map(track => {
          return <Track track={track} />
        })}
      </div>
    </Container>
  )
}
