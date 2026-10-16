(function () {
  var root = document.getElementById('prayer');
  if (!root) return;
  var cities = [
    { city: 'Istanbul', country: 'Turkey' },
    { city: 'Antalya', country: 'Turkey' },
    { city: 'Cairo', country: 'Egypt' },
    { city: 'Marrakech', country: 'Morocco' },
    { city: 'Dubai', country: 'United Arab Emirates' }
  ];
  var select = document.createElement('select');
  select.id = 'prayer-city';
  select.setAttribute('aria-label', 'City for prayer times');
  cities.forEach(function (c) {
    var opt = document.createElement('option');
    opt.value = c.city + '|' + c.country;
    opt.textContent = c.city;
    select.appendChild(opt);
  });
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-ghost';
  button.textContent = 'Show prayer times';
  var out = document.createElement('div');
  out.className = 'prayer-times';
  out.setAttribute('aria-live', 'polite');
  root.appendChild(select);
  root.appendChild(button);
  root.appendChild(out);

  function render(data) {
    var t = data.data.timings;
    var method = data.data.meta && data.data.meta.method ? data.data.meta.method.name : 'the method returned by Aladhan';
    var keys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    out.innerHTML = '<p>Times for ' + TNTSite.escapeHtml(data.data.meta.timezone || 'the selected city') + ' on ' +
      TNTSite.escapeHtml((data.data.date && data.data.date.readable) || '') + '. Calculation: ' +
      TNTSite.escapeHtml(method) + '. This is a guide only.</p>' +
      keys.map(function (key) {
        return '<div><span>' + key + '</span><span>' + TNTSite.escapeHtml(t[key] || '') + '</span></div>';
      }).join('');
  }

  button.addEventListener('click', function () {
    var parts = select.value.split('|');
    out.textContent = 'Loading prayer times…';
    var url = 'https://api.aladhan.com/v1/timingsByCity?city=' + encodeURIComponent(parts[0]) + '&country=' + encodeURIComponent(parts[1]);
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('bad'); return r.json(); })
      .then(render)
      .catch(function () { out.textContent = 'Prayer times could not be loaded just now. You can try again in a moment.'; });
  });
})();
