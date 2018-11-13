<template>
  <div id="app">
    <HeaderComponent />
    <HeroMain />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import HeroMain from '@/components/HeroMain'

export default {
  name: 'app',
  components: {
    HeaderComponent,
    HeroMain,
  }
}
</script>

<style src="@/stylesheets/main.scss" lang="scss"></style>
