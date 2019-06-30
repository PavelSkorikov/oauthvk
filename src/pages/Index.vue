<template>
  <q-page class="flex flex-center">
    <h4>{{user}}</h4><br>
         {{friends}}
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      user: '',
      friends: []
    }
  },
  created(){
    vm = this
    VK.Auth.getLoginStatus(vm.load(response), "Vhdbiy2tV6qv9vqHwHYB")
  },
  
  methods: {
    load(response) {
      var vm = this 
      if(response.session){ 
          // Авторизация успешна
          var vk_user = response.session.user;
          console.log(vk_user);
          setUser(vk_user.first_name+' '+vk_user.last_name+' Вы авторизованы!');
          getFriends();
        }else alert("Авторизоваться не удалось!");
      function setUser(data){
        vm.user = data;
      }
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
    },
  }
}
</script>
