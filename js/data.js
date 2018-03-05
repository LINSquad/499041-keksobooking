'use strict';
(function () {
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var titlesCopy = TITLES.slice();
  var typesCopy = TYPES.slice();
  var checkinsCopy = CHECKINS.slice();
  var featuresCopy = FEATURES.slice();
  var photosCopy = PHOTOS.slice();
  var avatarsCopy = AVATARS.slice();

  var randomAvatarGeneration = function (array) {
    var randomNumber = Math.round((array.length - 1) * Math.random());
    var element = mass[randomNumber];
    array.splice(randomNumber, 1);

    return element;
  };

  var randomElementGeneration = function (array) {
    var randomNumber = Math.round((array.length - 1) * Math.random());
    return array[randomNumber];
  };

  var randomArrayGeneration = function () {
    var photoCopy = PHOTOS.slice();
    var len = photoCopy.length;
    var newArray = [];
    for (var i = 0; i < len; i++) {
      var randomsNumber = Math.round((photoCopy.length - 1) * Math.random());
      var element = photoCopy[randomsNumber];
      photoCopy.splice(randomsNumber, 1);
      newArray[i] = element;
    }

    return newArray;
  };

  var randomLenghtGeneration = function (array) {
    var len = Math.round(array.length * Math.random());
    var newArray = [];
    for (var i = 0; i < len; i++) {
      var randomNumber = Math.round((array.length - 1) * Math.random());
      var element = array[randomNumber];
      array.splice(randomNumber, 1);
      newArray[i] = element;
    }

    return newArray;
  };

  var randomNumberGeneration = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };


  window.data = function () {
    var coordX = randomNumber(900, 300);
    var coordY = randomNumber(500, 150);
    return {
      author: {
        avatar: randomAvatarGeneration(avatarsCopy)
      },

      offer: {
        title: randomElementGeneration(titlesCopy),
        address: (coordX + PIN_WIDTH / 2) + ', ' + (coordY + PIN_HEIGHT),
        price: randomNumberGeneration(1000000, 1000),
        type: randomElementGeneration(typesCopy),
        rooms: randomNumberGeneration(5, 1),
        guests: randomNumberGeneration(50, 1),
        checkin: randomElementGeneration(checkinsCopy),
        checkout: randomElementGeneration(checkinsCopy),
        features: randomLenghtGeneration(featuresCopy),
        description: '',
        photos: randomArrayGeneration(photosCopy)
      },

      locat: {
        x: coordX,
        y: coordY
      }
    };
  };
})();
