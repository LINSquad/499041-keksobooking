'use strict';
(function () {
  var fieldsets = document.querySelectorAll('fieldset');

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', true);
  }

  var typeHome = document.querySelector('#type');
  var priceHome = document.querySelector('#price');

  priceHome.min = '1000';

  typeHome.addEventListener('change', function () {
    if (typeHome.value === 'bungalo') {
      priceHome.min = '0';
    } else if (typeHome.value === 'flat') {
      priceHome.min = '1000';
    } else if (typeHome.value === 'house') {
      priceHome.min = '5000';
    } else {
      priceHome.min = '10000';
    }
  }
  );

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    if (timeIn.value === '12:00') {
      timeOut.value = '12:00';
    } else if (timeIn.value === '13:00') {
      timeOut.value = '13:00';
    } else {
      timeOut.value = '14:00';
    }
  }
  );

  var roomNumber = document.querySelector('#room_number');
  var options = document.querySelector('#capacity').querySelectorAll('option');
  var capacity = document.querySelector('#capacity');

  capacity.value = '1';
  options[0].disabled = 'disabled';
  options[1].disabled = 'disabled';
  options[2].disabled = '';
  options[3].disabled = 'disabled';

  roomNumber.addEventListener('change', function () {
    if (roomNumber.value === '1') {
      capacity.value = '1';
      options[0].disabled = 'disabled';
      options[1].disabled = 'disabled';
      options[2].disabled = '';
      options[3].disabled = 'disabled';
    } else if (roomNumber.value === '2') {
      capacity.value = '2';
      options[0].disabled = 'disabled';
      options[1].disabled = '';
      options[2].disabled = '';
      options[3].disabled = 'disabled';
    } else if (roomNumber.value === '3') {
      capacity.value = '3';
      options[0].disabled = '';
      options[1].disabled = '';
      options[2].disabled = '';
      options[3].disabled = 'disabled';
    } else {
      capacity.value = '0';
      options[0].disabled = 'disabled';
      options[1].disabled = 'disabled';
      options[2].disabled = 'disabled';
      options[3].disabled = '';
    }
  }
  );
})();
