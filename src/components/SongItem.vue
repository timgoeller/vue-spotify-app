<template>
    <div :class="{'is-primary': isPrimary}" id="song-item">
        <div id="left-area">         
          <h1 v-if="!isPrimary">{{number}}.</h1>
          <div v-if="isPrimary"><font-awesome-icon id="play-icon" :icon="['far', 'play-circle']" /></div>
        </div>
        <div id="song-title-area">
          <h2 :class="{'is-primary': isPrimary}">{{title}}</h2>
          <h3>{{artist}}</h3>
        </div>
        <img src='https://via.placeholder.com/150'/>
    </div>
</template>

<script>
export default {
  name: 'song-item',
  props: {
    isPrimary: {
      type: Boolean,
      default: false
    },
    number: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "Loading..."
    },
    artist: {
      type: String,
      default: "Loading..."
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

      &.is-primary {
        border-radius: 90px;
      }
  }

  #left-area {
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-family: 'Nunito';
    }
  }

  #song-title-area {
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    justify-self: left;

    h2 {
      font-size: 18px;
      font-family: 'Nunito';
      margin: 0;
      font-weight: 400;

      &.is-primary {
        color: $secondary-color;
      }
    }
    h3 {
      margin: 0;
      font-family: 'Nunito';
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
