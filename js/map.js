'use strict';
(function () {
  var WIDTH_MAP = 1200;
  var HEIDHT_MAP = 500;
  var ESC_KEYCODE = 27;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var onLoad = function (array) {
    for (var i = 0; i < array.length; i++) {
      nearByAds[i] = array[i];
    }
    mapsPinGenerate(nearByAds);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 17em 28em; text-align: center; ' +
      'background-color: red; position: absolute; padding-top: 70px;' +
      'width: 300px; height: 100px; border: 2px solid white';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.loader(onLoad, onError);

  var nearByAds = [];

  var docElem = document.querySelector('.map__pin--main');
  var mapLocat = docElem.getBoundingClientRect();
  var map = document.querySelector('.map');
  var fragments = document.createDocumentFragment();
  var fieldsets = document.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');
  var filters = document.querySelector('.map__filters');

  var mapsPinGenerate = function (array) {
    for (var i = 0; i < array.length; i++) {
      fragments.appendChild(window.renderingPin(array[i]));
    }
    map.appendChild(fragments);
  };

  var locationOfAnElementGenerate = function (docElement) {
    var body = document.body;
    var mapLocats = map.getClientRects();
    var mapLocation = docElem.getBoundingClientRect();
    var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
    for (var i = 0; i < mapLocats.length; i++) {
      var mapLocateX = mapLocation.x + scrollLeft + mapLocation.width / 2 - mapLocats[i].x;
      var mapLocateY = mapLocation.y + scrollTop + mapLocation.height;
    }

    return Math.round(mapLocateX) + ', ' + Math.round(mapLocateY);
  };

  var locationCoordinatesPinGenerate = function (docElement) {
    var body = document.body;
    var mapLocats = map.getClientRects();
    var mapLocation = docElem.getBoundingClientRect();
    var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
    var i = 0;
    return ('left: ' + (mapLocation.x + scrollLeft + mapLocation.width / 2 - mapLocats[i].x) + 'px; top: ' + (mapLocation.y + scrollTop + mapLocation.height) + 'px;');
  };

  var initialCoordinatesPin = locationOfAnElementGenerate(docElem);
  var initialCoordinates = locationCoordinatesPinGenerate(docElem);

  document.querySelector('#address').value = locationOfAnElementGenerate(docElem);

  var enableFieldsets = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled');
    }
  };

  docElem.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    enableFieldsets(fieldsets);
    filters.reset();
    var mapPin = document.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPin.length; i++) {
      if (i <= 5) {
        mapPin[i].style.display = '';
      } else {
        mapPin[i].style.display = 'none';
      }
    }
    document.querySelector('#address').setAttribute('readonly', true);
  }
  );

  docElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (docElem.offsetTop - shift.y > HEIDHT_MAP - mapLocat.height / 2) {
        docElem.style.top = HEIDHT_MAP - mapLocat.height / 2 + 'px';
      } else if (docElem.offsetTop - shift.y < 150 - mapLocat.height / 2) {
        docElem.style.top = 150 - mapLocat.height / 2 + 'px';
      } else {
        docElem.style.top = (docElem.offsetTop - shift.y) + 'px';
      }

      if (docElem.offsetLeft - shift.x > WIDTH_MAP) {
        docElem.style.left = (WIDTH_MAP) + 'px';
      } else if (docElem.offsetLeft - shift.x < 0) {
        docElem.style.left = 0 + 'px';
      } else {
        docElem.style.left = (docElem.offsetLeft - shift.x) + 'px';
      }
      noticeForm.querySelector('#address').value = locationOfAnElementGenerate(docElem);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  map.addEventListener('click', function (evt) {
    var activeElement = evt.target;
    var mapPins = document.querySelectorAll('.map__pin');
    var imgPins = map.querySelectorAll('img');
    var mapCard = document.querySelector('.map__card');
    if (activeElement.src + '' !== 'undefined') {
      var activeElemsrc = activeElement.src.split('/');
      for (var i = 0; i < imgPins.length - 1; i++) {
        var imgPinsrc = imgPins[i + 1].src.split('/');  
        if (activeElemsrc[activeElemsrc.length - 1] === imgPinsrc[imgPinsrc.length - 1]) {
          for(var j = 0; j < nearByAds.length; j++) {      
            if(mapPins[i + 1].style.left === (nearByAds[j].location.x + PIN_WIDTH / 2)  + 'px' &&
              mapPins[i + 1].style.top === (nearByAds[j].location.y + PIN_HEIGHT) + 'px') {
              if (mapCard !== null) {
                var sp1 = map.appendChild(window.card(nearByAds[j]));
                map.replaceChild(sp1, mapCard);
              } else {
                map.appendChild(window.card(nearByAds[j]));
              }
            }
          }
        }
      }
    }
    if (activeElement.style === mapPins[0].style || activeElement.src === imgPins[0].src) {
      if (mapCard !== null) {
        map.removeChild(mapCard);
      }
    }
    mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      var mapCardClose = mapCard.querySelector('.popup__close');

      var closePopup = function () {
        map.removeChild(mapCard);
      };

      mapCardClose.addEventListener('click', function () {
        closePopup();
      });

      mapCardClose.addEventListener('keydown', function () {
        if (evt.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      });
    }
  }
  );

  filters.addEventListener('click', function () {
    var mapPin2 = document.querySelectorAll('.map__pin');
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      map.removeChild(mapCard);
    }
    for (var i = 1; i < mapPin2.length; i++) {
      map.removeChild(mapPin2[i]);
    }
    var newMassPin = window.filter(nearByAds);
    mapsPinGenerate(newMassPin);
    var mapPins = document.querySelectorAll('.map__pin');
    for (i = 0; i < mapPins.length; i++) {
      if (i < 6) {
        mapPins[i].style.display = '';
      }
    }
  });

  noticeForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(noticeForm), function () {
      noticeForm.reset();
      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');
      var mapPins = document.querySelectorAll('.map__pin');
      for (var i = 1; i < mapPins.length; i++) {
        mapPins[i].style.display = 'none';
      }
      var sp2 = document.querySelector('.map__card');
      if (sp2 !== null) {
        map.removeChild(map.querySelector('.map__card'));
      }
      for (i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
      mapLocat.style = initialCoordinates;
      document.querySelector('#address').value = initialCoordinatesPin;
    }, onError);
    evt.preventDefault();
  });

})();
