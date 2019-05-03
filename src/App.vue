<template>
  <div id="app">
    <div id="main">

      <div id="header">
          <h1>PlayNow.</h1>
      </div>
      <div v-if="isActiveDevice && tokenIsValid">
        <player @playClicked="onPlayButtonClicked" :currentTrack="currentlyPlaying" :isPrimary="true" :isPaused="isPaused"/>
        <div id="divider"></div>
        <upcoming-song-bar/>
      </div>

      <div v-else>
        <authorized-badge :isAuthorized="tokenIsValid"/>
        <authorize-button @clicked="onAuthorizeButtonClicked"/>
        <transfer-playback-button :isActive="tokenIsValid" @clicked="onTransferPlaybackButtonClicked"/>
      </div>
      
    </div>
  </div>

</template>

<script>

  import UpcomingSongBar from "@/components/UpcomingSongBar"
  import SongItem from "@/components/SongItem"
  import Player from "@/components/Player"
  import TransferPlaybackButton from "@/components/TransferPlaybackButton"
  import AuthorizeButton from "@/components/AuthorizeButton"
  import AuthorizedBadge from "@/components/AuthorizedBadge"
  import {isRejected} from 'q'
  import {SpotifyAPI, resolveSpotifyURL} from '@/spotify'

  export default {
    components: {UpcomingSongBar, SongItem, TransferPlaybackButton, AuthorizeButton, AuthorizedBadge, Player},
    name: 'app',
    mounted: function() {
      let spotifyWebSDKScript = document.createElement('script')
      spotifyWebSDKScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
      document.head.appendChild(spotifyWebSDKScript)

      window.onSpotifyWebPlaybackSDKReady = () => { 
        spotifyState.setReady()
      }
    },
    created: function() {

      let authInfo = resolveSpotifyURL() 

      if(authInfo['access_token']) {
        this.authToken = authInfo['access_token']
        this.spotifyAPI = SpotifyAPI(this.authToken)

        console.log("Token Set")
        this.spotifyAPI.getPlayerState().then((state) => {
          console.log(this.tokenIsValid)
          this.tokenIsValid = true
        }).catch((err) => {
          //TokenInvalid
        });
      }
      
    },
    data: function() {
      return {
        authToken:      "",
        spotifyAPI:     undefined,
        tokenIsValid:   false,
        deviceID:       "",
        isActiveDevice: false,
        isPaused:       false,
        currentTracks:  [],
        currentlyPlaying: null
      }
    },
    methods: {
      onAuthorizeButtonClicked: function() {
        let authorizeURL = 'https://accounts.spotify.com/authorize?client_id=eea843d7416f4a66bbf7192d8c817caf&response_type=token&redirect_uri=http://localhost:8080/&scope=user-read-private user-read-email streaming user-read-birthdate user-modify-playback-state user-read-playback-state' //TODO: Set state!     
      
        window.location = authorizeURL
      },
      onTransferPlaybackButtonClicked: function() {
         
        if(!spotifyState.isReady) {
          var vueContext = this

          spotifyState.listenForReady(function() {
            vueContext.createPlayer.call(vueContext)
          })
        }
        else {
          this.createPlayer.call(this)
        }
      },
      onPlayButtonClicked: function() {
        if(this.spotifyAPI) {
          if(this.isPaused) {
            this.spotifyAPI.play()
          }
          else {
            this.spotifyAPI.pause()
          }
        }
      },
      createPlayer: function() {
  
        var token = this.$data.authToken
        var vueContext = this      

        const player = new Spotify.Player({
          name: 'PlayNow.',
          getOAuthToken: cb => { cb(token); }
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // This listener is called, when the state of the player changes (Play/Pause/New Song)
        player.addListener('player_state_changed', state => { 
          console.log(state)
          
          // If the state is null, this device is not the active one
          if(state && !vueContext.isActiveDevice) {
            vueContext.isActiveDevice = true
          }
          else if(!state) {
            vueContext.isActiveDevice = false
          }
          
          if(state) {
            vueContext.isPaused = state.paused
          }
          
          let currentTrack = [state.track_window.current_track]
          this.currentTracks = currentTrack.concat(state.track_window.next_tracks)
          this.currentlyPlaying = currentTrack[0]
          console.log(this.currentlyPlaying)
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);

          vueContext.deviceID = device_id
          vueContext.isActiveDevice = true

          vueContext.spotifyAPI.transferPlayback(device_id)

        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();     
      }
    }

  }

  var spotifyState = {
      isReady: false,
      listener: function(){},
      setReady: function() {
        this.isReady = true
        this.listener()
      },
      listenForReady: function(listener) {
        this.listener = listener;
      }
  }

</script>

<style lang="scss">

  @import 'assets/settings.scss';

  html, body {
    
      margin: 0;
      padding: 0;    
  }

  html {
    background-color: $main-color;
  }
</style>

<style lang="scss" scoped>
  @import 'assets/settings.scss';

  #app {
    display: flex;
    justify-content: center;
    height: 100vh;
    
  }
  #main {
    @include md {
        width: 40vw;
    }
    width: 80vw;
    min-width: 300px;
    height: 80vh;
  }
  #header {
    display: flex;
    justify-content: center;
    color: white;    
    font-size: 21px;

    h1 {         
      margin-bottom: 25px;
      margin-top: 15px;
      padding-bottom: 2px;
      border: 2px solid white;
      padding: 9px;
      font-family: 'Didact Gothic';

      background-image: linear-gradient(to right, #845ec2, #7464c8, #6169cd, #4b6ed0, #2c73d2);
      text-shadow: 1px 2px #000000;
    }
  }

  #divider{
    margin-top: 35px;
    margin-bottom: 35px;
    border-radius: 6px;

    height: 4px;
    background-image: linear-gradient(to right, #845ec2, #7464c8, #6169cd, #4b6ed0, #2c73d2);
  }

</style>

