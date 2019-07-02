<template>
<q-layout view="lHh Lpr lFf">
  <template v-if="visible">
  <q-tabs
    v-model="tab"
    inline-label
    class="bg-primary text-white shadow-2">
    <q-tab name="auth" @click="auth" icon="people" label="Авторизация" />
  </q-tabs>
  </template>

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
      user: '',
      friends: [],
      visible: false,
    }
  },
  //при создании компонента vue проверка авторизации 
  created() {
    var vm = this;
    function setBar(bool){
        vm.visible = bool;
      }
    function setLoad(response){
      vm.load(response)
    }
    VK.Auth.getLoginStatus(function(response){
      if(response.session){
        console.log(response.session)
        setBar(false)
        setLoad(response)
      }
      else {
        console.log('no session')
        setBar(true)
      }
    }, "Vhdbiy2tV6qv9vqHwHYB")
  },
    
  methods: {
    load(response) {
      var vm = this 
      if(response.session){ // Авторизация успешна
        setBar(false)
        var vk_user = response.session.user;
        console.log(vk_user);
        setUser(vk_user.first_name+' '+vk_user.last_name,+' Вы авторизованы!');
        getFriends();
      }else alert("Авторизоваться не удалось!");
      
      function setBar(bool){
        vm.visible = bool;
      }
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
    auth(){
      var vm = this
      VK.Auth.login(vm.load, '84365d6184365d6184365d61be845d00ec8843684365d61d9237ea9062da2b88bd2afe7')
    } 
  }
}
</script>

<style>
</style>
