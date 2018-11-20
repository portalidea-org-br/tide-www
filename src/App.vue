<template>
  <div id="app">
    <HeaderComponent />
    <div class="overflow">
      <HeroMain />
      <HeroSecondary />
      <HeroTertiary />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import HeroMain from '@/components/HeroMain'
import HeroSecondary from '@/components/HeroSecondary'
import HeroTertiary from '@/components/HeroTertiary'

export default {
  name: 'app',
  components: {
    HeaderComponent,
    HeroMain,
    HeroSecondary,
    HeroTertiary,
  }
}
</script>

<style src="@/stylesheets/main.scss" lang="scss"></style>
