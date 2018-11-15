<template>
  <div class="header-bg">
    <header>
          <h1 class="logo"><i>Edu</i>Quidade</h1>
          <a href="https://fundacaotidesetubal.org.br/" class="setubal-logo">Fundação Tide Setubal</a>
          <nav class="main-nav">
              <button @click="toggleMenu">Menu</button>
              <ul :class="menuIsVisible ? 'active' : ''">
                  <li><a href="">Home</a></li>
                  <li><a href="">Pesquisa</a></li>
                  <li><a href="">Sobre</a></li>
                  <li><a href="">Biblioteca</a></li>
                  <li><a href="">Contato</a></li>
              </ul>
          </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      menuIsVisible: false,
    }
  },

  methods: {
    toggleMenu () {
      this.menuIsVisible = !this.menuIsVisible;
    },
  },
};

</script>
