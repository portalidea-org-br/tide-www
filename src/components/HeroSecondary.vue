<template>
  <div class="bg-yellow">
    <section class="hero-secondary">
      <div class="hero-secondary__text">
        <h2>56<span class="hero-secondary__percentage">%</span></h2>
        <p>
          dos recursos para investimento educacional é o que dispõe os municípios de nível socioeconômico baixo
          em relação aos municípios de nível socioeconômico mais alto
        </p>
      </div>
      <button class="button--black">Saiba mais</button>

      <Mug class="mug" />
      <LaderBoy class="lader-boy" />

      <div class="dots">
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
      </div>
    </section>
  </div>
</template>

<script>
import Mug from '@/assets/images/mug.svg'
import LaderBoy from '@/assets/images/lader-boy.svg'


export default {
  name: 'HeroMain',

  components: {
    Mug,
    LaderBoy,
  },
};

</script>
