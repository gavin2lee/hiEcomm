function login(){
  var data = $('form').serialize();

  //alert('data:'+data);

  $.ajax({
    url:'/login',
    type:'POST',
    data:data,
    success:function(data,status){
      if(status == 'success'){
        location.href = 'home';
      }
    },
    error:function(data, status){
      if(status == 'error'){
        location.href = 'login';
      }
    }
  });
}

$(function(){
  $('input[name=login]').click(login);
});
