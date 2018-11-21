<template>
  <div class="bg-blue">
    <section class="hero-water">
      <div class="hero-water__text">
        <h3>86 <span>%</span></h3>
        <p>
          das crianças de 4 e 5 anos que vêm de famílias com renda até um quarto de salário mínimo estão na escola.
          Entre famílias que ganham pelo menos um salário mínimo, a taxa sobe para 94,8%
        </p>
        <button class="button button--dark-blue">Saiba mais</button>
      </div>
      <div class="hero-water__images">
        <Book class="book" />
        <Boat class="boat" />
      </div>
    </section>
  </div>
</template>

<script>
import Book from '@/assets/images/girl-with-book.svg'
import Boat from '@/assets/images/big-way.svg'


export default {
  name: 'HeroMain',

  components: {
    Book,
    Boat,
  },
};

</script>
