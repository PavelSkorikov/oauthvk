<template>
<q-layout view="lHh Lpr lFf">
  <q-tabs
    v-model="tab"
    inline-label
    class="bg-primary text-white shadow-2">
    <q-tab v-if="visible" name="auth" @click="auth" icon="people" label="Авторизация" />
    <q-tab v-if="!visible" name="logout" @click="logout" icon="meeting_room" label="Выход" />
  </q-tabs>

  <div class="row">
    <div class="col-2"></div>
    <template v-if="!visible">
    <div class="col-8">
         <h4>{{user}}</h4><br>
         <div>
           <h6>Ваши 5 друзей из vk.com</h6>
           <ul>
            <li v-for="friend in friends"> 
              <p> <img :src="friend.photo_50"> {{friend.first_name}} {{friend.last_name}} (День рождения: <font color="blue">{{friend.bdate}}</font>)</p>
              </li>
          </ul>
         </div>
    </div>
    </template>
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
    VK.Auth.getLoginStatus((response)=>{
      if(response.session){
        console.log(response.session)
        this.visible=false
        this.load(response)
      }
      else {
        console.log('no session')
        this.visible=true
      }
    }, VK.access.FRIENDS)
  },
    
  methods: {
    //получение данных о пользователе и его друзьях
    load(response) {
      var vm = this 
      if(response.session){ // Авторизация успешна
        //setBar(false)
        this.visible = false
        var vk_user = response.session.user;
        console.log(vk_user);
        //setUser(vk_user.first_name+' '+vk_user.last_name+', Вы авторизованы!');
        this.user = vk_user.first_name+' '+vk_user.last_name+', Вы авторизованы!'
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
        VK.Api.call('friends.get', {fields: ['first_name', 'last_name', 'photo_50', 'bdate'], count: "5", order: "random", v: "5.8"}, 
        function(r){
        if(r.response){
          r = r.response.items;
          console.log(r);
          //setFriends(r);
          this.friends = r;
        }else alert("Не удалось получить список ваших друзей");
        })
      }
    },
    auth(){
      var vm = this
      VK.Auth.login(()=>load, VK.access.FRIENDS)
    },

    logout(){
      VK.Auth.logout(()=>{
       this.visible=true
      })
    } 
  }
}
</script>

<style>
</style>
