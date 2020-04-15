<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#nprogress .bar{
  background: #1465b7 !important;
}
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #fff;
}
::-webkit-scrollbar-thumb {
     border-radius:5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, .1)
}
</style>
