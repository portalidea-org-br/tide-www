<template>
  <div class="bg-red">
    <section class="hero-main">
      <div class="hero-main__text">
        <h1 class="h1">
          A desigualdade educacional no
          centro do debate
        </h1>
        <p>
          O projeto Indicador de Desigualdades Educacionais é movido por uma convicção: a defesa do direito à
          educação requer a construção de instrumentos de verificação da realização desse direito
        </p>
      </div>

      <div class="hero-main__images">
        <BooksGirl class="books-girl" />
      </div>

      <div class="dots">
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
          <i class="dots__dot"></i>
      </div>
    </section>
    <WaveYellow class="wave-yellow" />
  </div>
</template>

<script>
import BooksGirl from '@/assets/images/books-girl.svg'
import WaveYellow from '@/assets/images/wave-yellow.svg'


export default {
  name: 'HeroMain',

  components: {
    BooksGirl,
    WaveYellow,
  },
};

</script>
