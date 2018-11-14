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
        <Trophy class="trophy" />
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
  </div>
</template>

<script>
import Trophy from '@/assets/images/trophy.svg'
import BooksGirl from '@/assets/images/books-girl.svg'


export default {
  name: 'HeroMain',

  components: {
    Trophy,
    BooksGirl,
  },
};

</script>
