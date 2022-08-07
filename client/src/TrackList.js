import React from 'react'

export default function TrackList(props) {
  console.log('hello')
  return (
    <div className="trackList">
      {props.tracks.map(track => {
        return <p>{track.name} - {track.artist} - {track.url}</p>
      })}
    </div>
  )
}
