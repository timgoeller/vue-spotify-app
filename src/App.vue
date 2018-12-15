<template>
  <div id="app">
    <div id="main">

      <div id="header">
          <h1>PlayNow.</h1>
      </div>
      <song-item :isPrimary="true"/>
      <div id="divider"></div>
      <upcoming-song-bar/>
      
      
    </div>
  </div>

</template>

<script>



  import UpcomingSongBar from "@/components/UpcomingSongBar"
  import SongItem from "@/components/SongItem"
import { isRejected } from 'q';

  export default {
    components: {UpcomingSongBar, SongItem},
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

      var resolveSpotifyURL = function() {
        let hash = window.location.hash.substr(1);    
        let hashArguments = hash.split('&');
        let hashParameters = {}
        for(const argument of hashArguments) {
          let parameter = argument.split('=')
          hashParameters[parameter[0]] = parameter[1]
        }
        return hashParameters
      }
 
      var createPlayer = function() {
        console.log("Player Create")
        
        var token = this.$data.authToken
        const player = new Spotify.Player({
          name: 'PlayNow.',
          getOAuthToken: cb => { cb(token); }
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);

          	
          player.getCurrentState().then(state => {
            if (!state) {
              console.error('User is not playing music through the Web Playback SDK');
              return;
            }

            let {
              current_track,
              next_tracks: [next_track]
            } = state.track_window;

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
          });
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      }

      let scopes = ['user-read-private', 'user-read-email']
      let authorizeURL = 'https://accounts.spotify.com/authorize?client_id=eea843d7416f4a66bbf7192d8c817caf&response_type=token&redirect_uri=http://localhost:8080/&scope=user-read-private user-read-email streaming user-read-birthdate' //TODO: Set state!     
      
      let authInfo = resolveSpotifyURL()

      if(!authInfo['access_token']) {
        window.location = authorizeURL
      }

      this.$data.authToken = authInfo['access_token']
      
      if(!spotifyState.isReady) {
        console.log("Not ready")
        var vueContext = this
        spotifyState.listenForReady(function() {
         createPlayer.call(vueContext)
        })
      }
      else {
        console.log("Create Player")
        createPlayer.call(this)
      }
      
    },
    data: function() {
      return {
        authToken: ""
      }
    },
    methods: {
      
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
    font-family: 'Didact Gothic';
    font-size: 21px;

    h1 {         
      margin-bottom: 25px;
      margin-top: 15px;
      padding-bottom: 2px;
      border: 2px solid white;
      padding: 9px;
    }
  }

  #divider{
    border: 2px solid white;
    margin-top: 35px;
    margin-bottom: 35px;
    border-radius: 6px;
  }

</style>

