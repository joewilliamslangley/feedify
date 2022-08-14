import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Track from './Track'

export default function TrackList(props) {
  return (
    <Container>
      <div className="trackList">
        {props.tracks.map(track => {
          return <Track track={track} />
        })}
      </div>
    </Container>

  )
}
