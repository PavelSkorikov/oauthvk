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
         <q-btn color="white" text-color="black" :label="user" />
        
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
      user: '1',
      friends: {}
    }
  },
  methods: {
    load() {
      //функция сбора и вывода информации о друзьях
      function getFriends(){
        VK.Api.call('friends.get', {fields: ['uid', 'first_name', 'last_name'], 'count': 5}, 
        function(r){
        if(r.response){
          r = r.response;
          console.log(r);
          for(var i = 0; i < r.length; ++i){
          this.friends[i] = r[i].first_name+' '+r[i].last_name+' ('+r[i].uid+')'
          }
        }else alert("Не удалось получить список ваших друзей");
        })
      }
      //функция callback для авторизации
      function authInfo(response){
        if(response.session){ 
          // Авторизация успешна
          var vk_user = response.session.user;
          console.log(vk_user);
          this.user = 'Привет! '+vk_user.first_name+' '+vk_user.last_name;
          //getFriends();
        }else alert("Авторизоваться не удалось!");
      }
      //авторизация в ВК
      VK.Auth.login(authInfo(), 'Vhdbiy2tV6qv9vqHwHYB')
      console.log(this.user);
    } 
  }
}
</script>

<style>
</style>
