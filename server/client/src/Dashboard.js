import React, { useState, useEffect, } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackList from './TrackList'
import './Dashboard.css'

const spotifyApi = new SpotifyWebApi({
  clientID: "0ab62b72024b4e79b14900920249deea"
})

export default function Dashboard({code}) {
  const accessToken = useAuth(code)
  const [followedArtists, setFollowedArtists] = useState([])
  const [followedAlbums, setFollowedAlbums] = useState([])
  const [followedTracks, setFollowedTracks] = useState([])

  const getArtists = () => {
    spotifyApi.getFollowedArtists()
    .then(data => {
      const artists = data.body.artists.items.map(data => data.id)
      setFollowedArtists(artists)
      return artists
    })
  }

  const getAlbums = (artist) => {
    return spotifyApi.getArtistAlbums(artist)
    .then(data => {
      let albums = []
      data.body.items.forEach(album => {
        albums.push({
          id: album.id,
          artist_id: artist,
          name: album.name,
          url: album.external_urls.spotify,
          artist: album.artists[0].name,
          release_date: album.release_date,
          total_tracks: album.total_tracks,
          album_art_url: album.images[0].url
        })
      })
      return albums
    })
  }

  const getTracks = (album) => {
    return spotifyApi.getAlbumTracks(album.id)
    .then(data => {
      let tracks = []
      data.body.items.forEach(track => {
        if (track.artists.map(x => x.id).includes(album.artist_id)) {
        tracks.push({
          title: track.name,
          artist: track.artists.map(x => x.name).join(', '),
          album_name: album.name,
          album_release_date: album.release_date,
          id: track.id,
          album_art_url: album.album_art_url,
          audioSrc: track.preview_url
        })
        }
      })
      return tracks
    })
  }

  const resolvePromiseArray = (promiseArray) => {
    return Promise.all(promiseArray)
    .then(values => {
      let resolvedArray = []
      values.forEach(item => {
        resolvedArray.push(...item)
      })
      return resolvedArray
    })
  }

  useEffect(() => {
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    getArtists()
  }, [accessToken])

  useEffect(() => {
    let albumCalls = []
    followedArtists.forEach(artist => {
      albumCalls.push(
        getAlbums(artist)
      )
    })
    resolvePromiseArray(albumCalls)
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
        getTracks(album)
      )
      n += album.total_tracks
      if (n > 99) {
        break
      }
    }
    resolvePromiseArray(tracksCalls).then(tracks => {
      setFollowedTracks(tracks)
      console.log(tracks[0])
    })
  }, [followedAlbums])

  return (
    <div className='dashboard'>
      <TrackList tracks={followedTracks} />
    </div>
  )
}
