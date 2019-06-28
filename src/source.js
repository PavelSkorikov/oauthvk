<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <title>Доступ к ВК</title>
 </head>
 <body>
  <div id="vk_api_transport"></div>
  
<script type="text/javascript">
  window.vkAsyncInit = function() {
    VK.init({
      apiId: 7036301
    });
  };

  setTimeout(function() {
    var el = document.createElement("script");
    el.type = "text/javascript";
    el.src = "https://vk.com/js/api/openapi.js?161";
    el.async = true;
    document.getElementById("vk_api_transport").appendChild(el);
  }, 0);
</script>


//обработчик по нажатию "Авторизоваться"
<script>

function load(){
	//авторизация в ВК
   VK.Auth.login(authInfo, Vhdbiy2tV6qv9vqHwHYB)
	//функция callback для авторизации
   function authInfo(response){
    if(response.session){ // Авторизация успешна
     var user = response.session.user;
     getFriends();
    }else alert("Авторизоваться не удалось!");
   }
  }
  
//функция сбора информации о друзьях
 var getFriends: function(){
  VK.Api.call('friends.get', {fields: ['uid', 'first_name', 'last_name'], order: 'name'}, 
  function(r){
   if(r.response){
    r = r.response;
    var ol = $('#clientApi').add('ol');
    for(var i = 0; i < r.length; ++i){
     var li = ol.add('li').html(r[i].first_name+' '+r[i].last_name+' ('+r[i].uid+')')
    }
   }else alert("Не удалось получить список ваших друзей");
  })
 }

</script
 </body>
</html>