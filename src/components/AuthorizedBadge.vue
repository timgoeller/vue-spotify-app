<template>
  <div id="authorized-badge" :class="{'unauthorized': !isAuthorized}" v-on:click="click">
     <div>
        <h2 v-if="isAuthorized">Successfully authorized! <font-awesome-icon id="play-icon" :icon="['far', 'check']" /></h2>
        <h2 v-else>Authorization required! <font-awesome-icon id="play-icon" :icon="['far', 'times']" /></h2>
      </div>
  </div>
</template>

<script>
export default {
  name: 'authorized-badge',
  methods: {
      click: function() {
          this.$emit('clicked')
      }
  },
  props: {
    isAuthorized: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style lang="scss" scoped>

  @import '../assets/settings.scss';              

  #authorized-badge{
    width: 100%;
    height: 40px;
    background-color: $secondary-color;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 90px;
    margin: 15px 0 15px 0;
    border:none;
    outline: none;
    margin-bottom: 40px;

    h2 {
      @include md {
        font-size: 1.5em;
      }
      font-size: 1.2em;
      margin: 0;
      font-weight: 400;
      color: $light-background;

      svg {
        vertical-align: -0.150em;
      }
    }

    &.unauthorized {
      background-color: $error-color;
    }

    

  }
</style>
