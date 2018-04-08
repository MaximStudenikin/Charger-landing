$(document).ready(function () {

  $('.h__menu').on('click', function (e) {
    e.preventDefault();
    
    $('.h__block').toggleClass('h__open');
  });

});