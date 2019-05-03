<template>
    <div id="player">
        <div id="left-area">  
          <div v-on:click="playClicked">
            <font-awesome-icon v-if="isPaused" id="play-icon" :icon="['far', 'play-circle']" />
            <font-awesome-icon v-else id="play-icon" :icon="['far', 'pause-circle']" />
          </div>                
        </div>
        <div id="song-title-area">
          <h2>{{title}}</h2>
          <h3>{{artist}}</h3>
        </div>
        <img :src="albumImageURL"/>
    </div>
</template>

<script>
export default {
  name: 'player',
  data: function() {
    return {
      title:  'Loading...',
      artist: 'Loading...',
      albumImageURL: 'https://via.placeholder.com/150'
    }
  },
  watch: {
    currentTrack: function(val) {
      this.artist         = val.artists[0].name
      this.title          = val.name
      this.albumImageURL  = val.album.images[0].url
    }
  },
  props: {
    isPaused: {
      type: Boolean,
      default: false
    },
    currentTrack: {
      type: Object,
      default: null
    }
    
  },
  methods: {
      playClicked: function() {
          this.$emit('playClicked')
      }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/settings.scss';

  #player {
      width: 100%;
      height: 70px;
      background-color: $light-background;
      grid-template-columns: 70px auto 70px;
      grid-template-rows: 100%;
      display: grid;
      border-radius: 90px;
      margin: 15px 0 15px 0;

      &:hover {
        box-shadow: 2px 2px 20px -4px rgba(0,0,0,0.90);
      }      

      img {
        max-width:100%;
        width: auto;
        border-radius: 0 4px 4px 0;
      }

      
  }

  #left-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #song-title-area {
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    justify-self: left;

    h2 {
      font-size: 18px;
      margin: 0;
      font-weight: 400;
      color: $secondary-color;
    }
    h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }
  }

  #play-icon {
    font-size: 60px;
    color: $main-color;

    &:hover {
      color: $secondary-color;
      cursor: pointer;
    }
  }
</style>
