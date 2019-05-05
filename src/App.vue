<template>
  <div>
    <header-comp />
    <link-generator />
    <footer-comp />
  </div>
</template>

<script>
import HeaderComp from '@/components/Header'
import FooterComp from '@/components/Footer'
import LinkGenerator from '@/components/LinkGenerator'

export default {
  name: 'App',
  components: {
    HeaderComp,
    FooterComp,
    LinkGenerator,
  }
}
</script>

<style>
* {
  font-family: "Noto Sans CJK JP", Meiryo, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
