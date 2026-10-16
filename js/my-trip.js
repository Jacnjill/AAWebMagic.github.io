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

  var weather = document.getElementById('weather');
  if (weather) {
    if (!destination) {
      weather.textContent = 'Add a destination to this page link to see a weather forecast.';
    } else {
      weather.textContent = 'Loading the forecast…';
      fetch('https://geocoding-api.open-meteo.com/v1/search?count=1&name=' + encodeURIComponent(destination))
        .then(function (r) { return r.json(); })
        .then(function (geo) {
          if (!geo.results || !geo.results.length) throw new Error('none');
          var place = geo.results[0];
          return fetch('https://api.open-meteo.com/v1/forecast?latitude=' + place.latitude + '&longitude=' + place.longitude + '&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5')
            .then(function (r) { return r.json(); })
            .then(function (cast) { return { place: place, cast: cast }; });
        })
        .then(function (pack) {
          var days = pack.cast.daily;
          weather.innerHTML = '<p>Forecast for ' + TNTSite.escapeHtml(pack.place.name) + ', ' + TNTSite.escapeHtml(pack.place.country || '') + '.</p>' +
            days.time.map(function (day, i) {
              return '<div><span>' + TNTSite.escapeHtml(day) + '</span><span>' +
                Math.round(days.temperature_2m_min[i]) + '° to ' + Math.round(days.temperature_2m_max[i]) + '°</span></div>';
            }).join('');
        })
        .catch(function () { weather.textContent = 'A forecast could not be loaded for that destination just now.'; });
    }
  }

  var prayer = document.getElementById('trip-prayer');
  if (prayer) {
    if (!prayerOn) prayer.remove();
    else if (!destination) prayer.textContent = 'Add a destination as well as prayer=1 to load prayer times.';
    else {
      prayer.textContent = 'Loading prayer times…';
      fetch('https://api.aladhan.com/v1/timingsByAddress?address=' + encodeURIComponent(destination))
        .then(function (r) { if (!r.ok) throw new Error('bad'); return r.json(); })
        .then(function (data) {
          var t = data.data.timings;
          prayer.innerHTML = '<p>Prayer times are a guide from Aladhan for the place in this link. They are not a booking.</p>' +
            ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(function (key) {
              return '<div><span>' + key + '</span><span>' + TNTSite.escapeHtml(t[key] || '') + '</span></div>';
            }).join('');
        })
        .catch(function () { prayer.textContent = 'Prayer times could not be loaded for that place.'; });
    }
  }

  var refer = document.getElementById('refer');
  if (refer) {
    var share = destination
      ? ('Have a look at Trip N Travel for a holiday in ' + destination + ': ' + TNT.siteUrl)
      : ('Have a look at Trip N Travel: ' + TNT.siteUrl);
    refer.setAttribute('data-wa-text', share);
    TNTSite.refresh(refer.parentNode);
  }
})();
