import axios from 'axios'

//https://alligator.io/vuejs/rest-api-axios/
export const SpotifyAPI = function(token) {
    const Spotify = axios.create({
        baseURL: `https://api.spotify.com/v1/`,
        headers: {
          Authorization: `Bearer ${token}`
        }
    })

    return {
        getAlbum: (album_id) => {
            return Spotify.get(`albums/${album_id}`)
        },
        getPlayerState: () => {
            return Spotify.get('me/player')
        },
        transferPlayback: (device_id) => {
            return Spotify.put('me/player', {
                device_ids: [device_id],
                play: true
            })
        },
        play: () => {
            return Spotify.put('me/player/play')
        },
        pause: () => {
            return Spotify.put('me/player/pause')
        }
    }
  }

export const resolveSpotifyURL = function() {
    let hash = window.location.hash.substr(1);    
    let hashArguments = hash.split('&');
    let hashParameters = {}
    for(const argument of hashArguments) {
      let parameter = argument.split('=')
      hashParameters[parameter[0]] = parameter[1]
    }
    return hashParameters
}