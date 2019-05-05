<template>
  <div>
    <div v-for="(song, index) in upcomingSongs" :key="index">
      <song-item :number="index" :song="song"/>
    </div>  
  </div>
</template>

<script>
  import SongItem from "@/components/SongItem"

  export default {
    components: {SongItem},
    name: 'upcoming-song-bar',
    props: {
      upcomingSongs: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style>

</style>
