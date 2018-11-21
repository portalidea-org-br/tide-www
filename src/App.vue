<template>
  <div id="app">
    <HeaderComponent />
    <div class="overflow">
      <HeroMain />
      <HeroSecondary />
      <HeroTertiary />
      <HeroWater />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import HeroMain from '@/components/HeroMain'
import HeroSecondary from '@/components/HeroSecondary'
import HeroTertiary from '@/components/HeroTertiary'
import HeroWater from '@/components/HeroWater'

export default {
  name: 'app',
  components: {
    HeaderComponent,
    HeroMain,
    HeroSecondary,
    HeroTertiary,
    HeroWater,
  }
}
</script>

<style src="@/stylesheets/main.scss" lang="scss"></style>
