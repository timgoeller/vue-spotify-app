<template>
    <div :class="{'is-primary': isPrimary}" id="song-item">
        <div id="left-area">         
          <h1>{{number + 1}}.</h1>
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
  name: 'song-item',
  data: function() {
    return {
      title:  'Loading...',
      artist: 'Loading...',
      albumImageURL: 'https://via.placeholder.com/150'
    }
  },
  watch: {
    song: function(val) {
      this.artist         = val.artists[0].name
      this.title          = val.name
      this.albumImageURL  = val.album.images[0].url
    }
  },
  props: {
    number: {
      type: Number,
      default: 0
    },  
    song: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/settings.scss';

  #song-item {
      width: 100%;
      height: 70px;
      background-color: $light-background;
      grid-template-columns: 70px auto 70px;
      grid-template-rows: 100%;
      display: grid;
      border-radius: 4px;
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
    }
    h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }
  }

  #play-icon {
    color: $secondary-color;
    font-size: 60px;
    color: $main-color;
  }
</style>
