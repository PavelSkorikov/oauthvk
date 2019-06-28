<template>
<q-layout view="lHh Lpr lFf">
  <q-tabs
    v-model="tab"
    inline-label
    class="bg-primary text-white shadow-2">
    <q-tab name="auth" @click="load" icon="people" label="Авторизация" />
  </q-tabs>

  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <q-page-container>
        {{friends}}  
      </q-page-container>
    </div>
    <div class="col-2"></div>
  </div>

  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      friends: ''
    }
  },
  methods: {
    load() {
      //функция сбора и вывода информации о друзьях
      function getFriends(){
        VK.Api.call('friends.get', {fields: ['uid', 'first_name', 'last_name'], order: 'name'}, 
        function(r){
        if(r.response){
          r = r.response;
          var ol = $('#clientApi').add('ol');
          for(var i = 0; i < r.length; ++i){
          var li = ol.add('li').html(r[i].first_name+' '+r[i].last_name+' ('+r[i].uid+')')
          }
          this.friends = li
        }else alert("Не удалось получить список ваших друзей");
        })
      }
      //функция callback для авторизации
      function authInfo(response){
        if(response.session){ // Авторизация успешна
          var user = response.session.user;
          getFriends();
        }else alert("Авторизоваться не удалось!");
      }
      //авторизация в ВК
      VK.Auth.login(authInfo, 'Vhdbiy2tV6qv9vqHwHYB')
    } 
  }
}
</script>

<style>
</style>
