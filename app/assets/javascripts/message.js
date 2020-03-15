$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="messages__box">
         <div class="messages__box__top">
           <div class="messages__box__top--name">
             ${message.user_name}
           </div>
           <div class="messages__box__top--date">
             ${message.created_at}
           </div>
         </div>
         <div class="messages__box__bottom">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="messages__box">
        <div class="messages__box__top">
          <div class="messages__box__top--name">
            ${message.user_name}
          </div>
          <div class="messages__box__top--date">
            ${message.created_at}
          </div>
        </div>
        <div class="messages__box__bottom">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
     return html;
   };
 }

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".submit-btn").prop("disabled", false);
    })
    // $(".submit-btn").prop("disabled", false);の代わりにreturn false;でもいける
    // return false;
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});