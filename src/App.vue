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
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <!--<router-view/>-->
    
  </div>

</template>

<script>
  import UpcomingSongBar from "@/components/UpcomingSongBar"
  import SongItem from "@/components/SongItem"

  export default {
    components: {UpcomingSongBar, SongItem},
    name: 'app',
    created: function() {

      let scopes = ['user-read-private', 'user-read-email']
      console.log(this.spotify)
      let authorizeURL = 'https://accounts.spotify.com/authorize?client_id=eea843d7416f4a66bbf7192d8c817caf&response_type=code&redirect_uri=http://localhost:8080/&scope=user-read-private%20user-read-email' //TODO: Set state!
      let searchParams = new URLSearchParams(window.location.search)
      let code = searchParams.get('code')
      
      if(!code) {
        window.location = authorizeURL;
      }
      else {
        this.spotify.authorizationCodeGrant(code).then(function(data) {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);
        })
      }

      if(!spotifyState.isReady) {
        spotifyState.listenForReady(function() {
          console.log("SPÖTIFY");
        })
      }
      else {
        console.log("SPÖTIFY");
      }
        

        /*const token = '[My Spotify Web API access token]';
        const player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
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
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();*/
      
    },
    data: function() {
      return {
        authToken: ""
      }
    },
    methods: {
      createPlayer: function() {

      }
    }

  }

  var spotifyState = {
      isReady: false,
      listenForReady: function(listener) {
        this.isReady = listener;
      }
  }

  window.onSpotifyWebPlaybackSDKReady = () => { 
    spotifyState.isReady = true;
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

