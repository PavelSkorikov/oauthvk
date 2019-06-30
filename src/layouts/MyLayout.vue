<template>
<q-layout view="lHh Lpr lFf">
  <q-tabs
    v-model="tab"
    v-show="visible"
    inline-label
    class="bg-primary text-white shadow-2">
    <q-tab name="auth" @click="load" icon="people" label="Авторизация" />
  </q-tabs>

  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
         <h4>{{user}}</h4><br>
         {{friends}}

        
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
      visible: true,
      user: '',
      friends: []
    }
  },
  methods: {
    beforeUpdate(){
      var vs = this
      function hideVisibleBar(){
        vs.visible = false;
        vs.load;
      }
      VK.Auth.getLoginStatus(function(response){
        if (response.status == 'connected'){
          console.log('user_autorised')
          hideVisibleBar
        }
      })
    },
    load() {
      function setFriends(data){
        vm.friends = data;
      }
      //функция сбора и вывода информации о друзьях
      function getFriends(){
        VK.Api.call('friends.get', {fields: ['uid', 'first_name', 'last_name'], count: "5", v: "5.8"}, 
        function(r){
        if(r.response){
          r = r.response.items;
          console.log(r);
          var vk_friends = [];
          for(var i = 0; i < 5; ++i){
            vk_friends[i] = r[i]["first_name"]+' '+r[i]["last_name"]+' ('+r[i]["id"]+')';
          }
          console.log(vk_friends);
          setFriends(vk_friends);
        }else alert("Не удалось получить список ваших друзей");
        })
      }
      function setUser(data){
        vm.user = data;
      }
      //функция callback для авторизации
      function authInfo(response){
        if(response.session){ 
          // Авторизация успешна
          var vk_user = response.session.user;
          console.log(vk_user);
          console.log(response.status);
          setUser(vk_user.first_name+' '+vk_user.last_name+' Вы авторизованы!');
          getFriends();
        }else alert("Авторизоваться не удалось!");
      }
      //авторизация в ВК
      var vm = this
      VK.Auth.login(authInfo, "Vhdbiy2tV6qv9vqHwHYB")
      
      
    } 
  }
}
</script>

<style>
</style>
