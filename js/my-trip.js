(function () {
  var params = new URLSearchParams(location.search);
  var destination = params.get('destination') || '';
  var departure = params.get('departure') || '';
  var prayerOn = params.get('prayer') === '1';

  var destEl = document.getElementById('trip-destination');
  if (destEl) destEl.textContent = destination || 'your holiday';

  var count = document.getElementById('countdown');
  if (count) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(departure);
    if (!match) {
      count.textContent = 'Add a departure date to this page link if you want a countdown. For example: my-trip.html?destination=Turkey&departure=2027-07-01';
    } else {
      var when = Date.UTC(+match[1], +match[2] - 1, +match[3]);
      var today = new Date();
      var start = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
      var days = Math.round((when - start) / 86400000);
      var label = (+match[3]) + ' ' + TNTLogic.MONTHS[+match[2] - 1] + ' ' + match[1];
      if (days > 1) count.textContent = days + ' days until ' + label + '.';
      else if (days === 1) count.textContent = '1 day until ' + label + '.';
      else if (days === 0) count.textContent = 'Departure is today, ' + label + '.';
      else count.textContent = 'This departure date (' + label + ') has passed.';
    }
  }

  var list = document.getElementById('packing');
  if (list) {
    var items = [
      'Passport or identity document',
      'Travel documents from your quote',
      'Medication you need',
      'Phone charger',
      'Clothing for the weather',
      'Swimwear, if you want it',
      'A modest outfit if you plan to visit a mosque or religious site',
      'Sunscreen'
    ];
    var key = 'tnt-packing:' + destination + ':' + departure;
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
    list.innerHTML = items.map(function (item, i) {
      return '<li><label class="choice"><input type="checkbox" data-pack="' + i + '"' + (saved.indexOf(i) !== -1 ? ' checked' : '') + '> ' + item + '</label></li>';
    }).join('');
    list.addEventListener('change', function () {
      var on = Array.prototype.map.call(list.querySelectorAll('[data-pack]:checked'), function (box) {
        return Number(box.getAttribute('data-pack'));
      });
      try { localStorage.setItem(key, JSON.stringify(on)); } catch (e) {}
    });
  }

  var COUNTRIES = { ES: 'Spain', TR: 'Turkey', GR: 'Greece' };
  var CITIES = {
    TR: ['antalya', 'bodrum', 'istanbul', 'dalaman', 'marmaris', 'izmir', 'side', 'belek', 'alanya', 'kusadasi', 'kalkan', 'fethiye', 'cappadocia', 'ankara'],
    GR: ['crete', 'rhodes', 'corfu', 'zakynthos', 'zante', 'santorini', 'athens', 'kos', 'halkidiki', 'mykonos', 'kefalonia', 'skiathos', 'thessaloniki'],
    ES: ['majorca', 'mallorca', 'ibiza', 'tenerife', 'barcelona', 'alicante', 'malaga', 'benidorm', 'lanzarote', 'fuerteventura', 'gran canaria', 'madrid', 'valencia', 'seville', 'sevilla']
  };

  function resolvePlace(text) {
    var lower = String(text || '').toLowerCase();
    var code = '';
    var city = '';
    Object.keys(CITIES).forEach(function (cc) {
      if (code) return;
      CITIES[cc].forEach(function (name) {
        if (city) return;
        if (lower.indexOf(name) !== -1) {
          code = cc;
          city = name.charAt(0).toUpperCase() + name.slice(1);
        }
      });
    });
    if (!code) {
      if (/\bspain\b/.test(lower)) code = 'ES';
      else if (/\bturkey\b/.test(lower) || /\btürkiye\b/.test(lower) || /\bturkiye\b/.test(lower)) code = 'TR';
      else if (/\bgreece\b/.test(lower)) code = 'GR';
    }
    if (!code) return null;
    return { code: code, city: city, countryName: COUNTRIES[code], query: city || COUNTRIES[code] };
  }

  function showForecast(place, cast) {
    var weather = document.getElementById('weather');
    var days = cast && cast.daily;
    if (!weather || !days || !days.time) {
      if (weather) weather.textContent = 'A forecast could not be loaded for that destination just now.';
      return;
    }
    weather.innerHTML = '<p>Forecast for ' + TNTSite.escapeHtml(place.name) + ', ' + TNTSite.escapeHtml(place.country || '') + '.</p>' +
      days.time.map(function (day, i) {
        return '<div><span>' + TNTSite.escapeHtml(day) + '</span><span>' +
          Math.round(days.temperature_2m_min[i]) + '° to ' + Math.round(days.temperature_2m_max[i]) + '°</span></div>';
      }).join('');
  }

  var loadBtn = document.getElementById('load-forecast');
  if (loadBtn) {
    loadBtn.addEventListener('click', function () {
      var weather = document.getElementById('weather');
      var prayer = document.getElementById('trip-prayer');
      loadBtn.disabled = true;
      if (!destination) {
        if (weather) weather.textContent = 'Add a destination to this page link to see a weather forecast.';
        return;
      }
      var place = resolvePlace(destination);
      if (!place) {
        if (weather) weather.textContent = 'We can only show a forecast for a place in Spain, Turkey or Greece.';
        if (prayer && prayerOn) prayer.textContent = 'Prayer times need a city in Spain, Turkey or Greece.';
        return;
      }
      if (weather) weather.textContent = 'Loading the forecast…';
      var geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?count=1&countryCode=' +
        encodeURIComponent(place.code) + '&name=' + encodeURIComponent(place.query);
      fetch(geoUrl)
        .then(function (r) { return r.json(); })
        .then(function (geo) {
          var hit = geo.results && geo.results[0];
          if (!hit || ['ES', 'TR', 'GR'].indexOf(hit.country_code) === -1) throw new Error('unreliable');
          return fetch('https://api.open-meteo.com/v1/forecast?latitude=' + hit.latitude + '&longitude=' + hit.longitude + '&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5')
            .then(function (r) { return r.json(); })
            .then(function (cast) { return { hit: hit, cast: cast }; });
        })
        .then(function (pack) { showForecast(pack.hit, pack.cast); })
        .catch(function () {
          if (weather) weather.textContent = 'We can’t show a reliable forecast for that place.';
        });
      if (prayer && prayerOn) {
        if (!place.city) {
          prayer.textContent = 'Prayer times need a city in Spain, Turkey or Greece. A country name alone is not specific enough.';
        } else {
          prayer.textContent = 'Loading prayer times…';
          fetch('https://api.aladhan.com/v1/timingsByCity?city=' + encodeURIComponent(place.city) + '&country=' + encodeURIComponent(place.countryName))
            .then(function (r) { if (!r.ok) throw new Error('bad'); return r.json(); })
            .then(function (data) {
              var t = data.data.timings;
              prayer.innerHTML = '<p>Prayer times are a guide from Aladhan for ' + TNTSite.escapeHtml(place.city) + '. They are not a booking.</p>' +
                ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(function (key) {
                  return '<div><span>' + key + '</span><span>' + TNTSite.escapeHtml(t[key] || '') + '</span></div>';
                }).join('');
            })
            .catch(function () { prayer.textContent = 'Prayer times could not be loaded for that place.'; });
        }
      }
    });
  }

  var prayerBox = document.getElementById('trip-prayer');
  if (prayerBox && !prayerOn) prayerBox.remove();

  var refer = document.getElementById('refer');
  if (refer) {
    var share = destination
      ? ('Have a look at Trip N Travel for a holiday in ' + destination + ': ' + TNT.siteUrl)
      : ('Have a look at Trip N Travel: ' + TNT.siteUrl);
    refer.setAttribute('data-wa-text', share);
    TNTSite.refresh(refer.parentNode);
  }
})();
