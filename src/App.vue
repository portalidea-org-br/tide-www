<template>
  <div id="app">
    <HeaderComponent />
    <HeroMain />
    <HeroSecondary />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import HeroMain from '@/components/HeroMain'
import HeroSecondary from '@/components/HeroSecondary'

export default {
  name: 'app',
  components: {
    HeaderComponent,
    HeroMain,
    HeroSecondary,
  }
}
</script>

<style src="@/stylesheets/main.scss" lang="scss"></style>
