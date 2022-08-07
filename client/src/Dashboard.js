import React, { useState, useEffect, } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackList from './TrackList'

const spotifyApi = new SpotifyWebApi({
  clientID: "0ab62b72024b4e79b14900920249deea"
})

export default function Dashboard({code}) {
  const accessToken = useAuth(code)
  const [followedArtists, setFollowedArtists] = useState([])
  const [followedAlbums, setFollowedAlbums] = useState([])
  const [followedTracks, setFollowedTracks] = useState([])

  useEffect(() => {
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)

    spotifyApi.getFollowedArtists()
    .then(data => {
      const artists = data.body.artists.items.map(data => data.id)
      setFollowedArtists(artists)
      return artists
    })
  }, [accessToken])

  useEffect(() => {
    let albumCalls = []
    followedArtists.forEach(artist => {
      albumCalls.push(
        spotifyApi.getArtistAlbums(artist)
        .then(data => {
          let albums = []
          data.body.items.forEach(album => {
            albums.push({
              id: album.id,
              name: album.name,
              url: album.external_urls.spotify,
              artist: album.artists[0].name,
              release_date: album.release_date,
              total_tracks: album.total_tracks
            })
          })
          return albums
        })
      )
    })
    Promise.all(albumCalls)
    .then(values => {
      let albums = []
      values.forEach(array => {
        albums.push(...array)
      })
      return albums
    })
    .then(albums => {
      albums = albums.filter((album, index, self) => index === self.findIndex((t) => t.id === album.id))
      const filteredAlbums = albums.filter(album => album.artist !== 'Various Artists')
      const sortedAlbums = filteredAlbums.sort((a,b) => new Date(a.release_date) - new Date(b.release_date)).reverse()
      setFollowedAlbums(sortedAlbums)
    })
  }, [followedArtists])

  useEffect(() => {
    let tracksCalls = []
    let n = 0
    for (const album of followedAlbums) {
      tracksCalls.push(
        spotifyApi.getAlbumTracks(album.id)
        .then(data => {
          let tracks = []
          data.body.items.forEach(track => {
            console.log(track)
            tracks.push({
              name: track.name,
              artist: track.artists[0].name,
              album_name: album.name,
              album_release_date: album.release_date,
              id: track.id,
              url: album.url
            })
          })
          return tracks
        })
      )
      n += album.total_tracks
      console.log(n)
      if (n > 99) {
        break
      }
    }
    Promise.all(tracksCalls).then(values => {
      let tracks = []
      values.forEach(array => {
        tracks.push(...array)
      })
      setFollowedTracks(tracks)
    })
  }, [followedAlbums])

  return (
    <div className='dashboard'>
      <TrackList tracks={followedTracks} />
    </div>
  )
}
