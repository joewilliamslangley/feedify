import React from 'react'

export default function Track({ track }) {
  return (
    <div className="d-flex m-2 align-items-center">
      <img src={track.album_art_url} alt="Album art" style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
    )
}
