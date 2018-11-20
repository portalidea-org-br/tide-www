<template>
  <div class="bg-green">
    <section class="hero-tertiary">
      <div class="hero-tertiary__text">
        <h3>300 <span>reais</span></h3>
        <p>
          é o custo médio mensal de um aluno do ensino médio na rede pública.
          Enquanto que em uma escola particular esse custo salta para, em média, R$ 700 por aluno
        </p>
        <button class="button button--white">Saiba mais</button>
      </div>
      <div class="hero-tertiary__images">
        <GirlWithBook class="girl-with-book" />
        <BigWay class="big-way" />
      </div>

      <div class="dots">
          <i class="dots__dot"></i>
      </div>
    </section>
    <WaveBlue class="wave-blue" />
  </div>
</template>

<script>
import GirlWithBook from '@/assets/images/girl-with-book.svg'
import BigWay from '@/assets/images/big-way.svg'
import WaveBlue from '@/assets/images/wave-yellow.svg'


export default {
  name: 'HeroMain',

  components: {
    GirlWithBook,
    WaveBlue,
    BigWay,
  },
};

</script>
