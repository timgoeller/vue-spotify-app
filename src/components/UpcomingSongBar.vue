<template>
  <div>
    <song-item v-for="(song, index) in upcomingSongs" :key="index" :number="index"/>
  </div>
</template>

<script>
  import SongItem from "@/components/SongItem"

  export default {
    components: {SongItem},
    name: 'upcoming-song-bar',
    data: function() {
      return {
        upcomingSongs: []
      }
     
    }
  }
</script>

<style>

</style>
