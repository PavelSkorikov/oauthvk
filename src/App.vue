<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
        window.vkAsyncInit = function() {
          VK.init({
            apiId: 7036301
          });
        };
        setTimeout(function() {
          var el = document.createElement("script");
          el.type = "text/javascript";
          el.src = "//vk.com/js/api/openapi.js?161";
          el.async = true;
          document.getElementById("vk_api_transport").appendChild(el);
        }, 0);
  }
}
</script>

<style>
</style>
