'use strict';
(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var filterWifi = filters.querySelector('#filter-wifi');
  var filterDishwasher = filters.querySelector('#filter-dishwasher');
  var filterParking = filters.querySelector('#filter-parking');
  var filterWasher = filters.querySelector('#filter-washer');
  var filterElevator = filters.querySelector('#filter-elevator');
  var filterConditioner = filters.querySelector('#filter-conditioner');
  var pricesMiddle = 'middle';
  var pricesLow = 'low';
  var pricesHigh = 'high';

  function housingTypeFilter(element) {
    if (housingType.value === 'any' || housingType.value === element.offer.type) {
      return true;
    }
    return false;
  }
  function housingPriceFilter(element) {
    if (housingPrice.value === 'any') {
      return true;
    }
    if (housingPrice.value === pricesMiddle && element.offer.price >= 10000 && element.offer.price <= 50000 ||
    housingPrice.value === pricesLow && element.offer.price < 10000 ||
    housingPrice.value === pricesHigh && element.offer.price > 50000) {
      return true;
    }
    return false;
  }
  function housingRoomsFilter(element) {
    if (housingRooms.value === 'any' || housingRooms.value + '' === element.offer.rooms + '') {
      return true;
    }
    return false;
  }
  function housingGuestsFilter(element) {
    if (housingGuests.value === 'any' || housingGuests.value + '' === element.offer.guests + '') {
      return true;
    }
    return false;
  }
  function filterFeature(element, filters) {
    if (filters.checked === true) {
      if (element.offer.features.length !== 0) {
        for (var k = 0; k < element.offer.features.length; k++) {
          if (element.offer.features[k] === filters.value) {
            k = element.offer.features.length;
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
  function filtrateWifi(element) {
    return filterFeature(element, filterWifi);
  }
  function filtrateDish(element) {
    return filterFeature(element, filterDishwasher);
  }
  function filtratePark(element) {
    return filterFeature(element, filterParking);
  }
  function filtrateWash(element) {
    return filterFeature(element, filterWasher);
  }
  function filtrateElev(element) {
    return filterFeature(element, filterElevator);
  }
  function filtrateCond(element) {
    return filterFeature(element, filterConditioner);
  }

  window.filter = function (nearByAds) {
    return nearByAds.filter(function (item) {
      return housingTypeFilter(item) && housingPriceFilter(item) && housingRoomsFilter(item) &&
      housingGuestsFilter(item) && filtrateWifi(item) && filtrateDish(item) && filtratePark(item) &&
        filtrateWash(item) && filtrateElev(item) && filtrateCond(item) === true;
    });
  };
})();
