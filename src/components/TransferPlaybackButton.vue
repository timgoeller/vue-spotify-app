<template>
  <button id="transfer-playback-button">
    <div>
      <h2>Transfer Playback</h2>
      <span>Stop playback on active device and start playback here</span>
    </div>
    
  </button>
</template>

<script>
export default {
  name: 'transfer-playback-button',
}
</script>

<style lang="scss" scoped>

  @import '../assets/settings.scss';              

  #transfer-playback-button {
    width: 100%;
    height: 70px;
    background-color: $light-background;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 90px;
    margin: 15px 0 15px 0;
    border:none;
    outline: none;

    &:hover, &:focus {
      box-shadow: 2px 2px 20px -4px rgba(0,0,0,0.90);
    }  

    h2 {
      @include md {
        font-size: 2em;
      }
      font-size: 1.8em;
      margin: 0;
      font-weight: 400;
      color: $secondary-color;
    }

    span {
      @include md {
        font-size: 1em;
      }
      font-size: 0.8em;

      
    }

    &:hover, &:focus {
      border: 3px solid $secondary-color;
      cursor: pointer;
    }

  }
</style>
