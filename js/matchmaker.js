(function () {
  var STEPS = ['Trip type', 'Destination', 'When', 'Flying from', 'Who is travelling', 'Budget'];
  var TRIPS = ['Budget adventure', 'Faith & heritage', 'Romantic', 'Family', 'Not sure'];
  var AIRPORTS = ['Bristol', 'Birmingham', 'Manchester', 'London (any)', 'Cardiff', 'Other'];
  var BUDGETS = ['Under £400', '£400–£700', '£700–£1,000', '£1,000+'];
  var EXTRAS = ['Halal food', 'Alcohol-free hotel', 'Private pool', 'All inclusive'];
  var state = {
    tripType: '',
    destination: '',
    destinationOther: '',
    flightOnly: false,
    month: '',
    flexible: false,
    from: '',
    fromOther: '',
    adults: 2,
    children: 0,
    ages: [],
    budget: '',
    extras: []
  };
  var step = 0;
  var lastTrigger = null;

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function choices(name, values, current) {
    return values.map(function (value) {
      var id = name + '-' + value.replace(/[^a-z0-9]+/gi, '-');
      return '<label class="option"><input type="radio" name="' + name + '" id="' + id + '" value="' + TNTSite.escapeHtml(value) + '"' +
        (value === current ? ' checked' : '') + '> <span>' + TNTSite.escapeHtml(value) + '</span></label>';
    }).join('');
  }

  function destinationChoices() {
    return TNTLogic.coreDestinations(TNT.extraDestinations).choices;
  }

  function overlay() {
    return document.getElementById('matchmaker');
  }

  function ensure() {
    if (overlay()) return;
    var node = el(
      '<div class="modal-overlay" id="matchmaker" hidden>' +
      '<div class="mm-dialog" role="dialog" aria-modal="true" aria-labelledby="mm-title">' +
      '<div class="mm-top"><h2 id="mm-title">Find your holiday</h2>' +
      '<button type="button" class="btn btn-ghost" id="mm-close">Close</button></div>' +
      '<p id="mm-progress-text"></p>' +
      '<div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="6" aria-valuenow="1" id="mm-bar"><span></span></div>' +
      '<div id="mm-step"></div>' +
      '<p id="mm-error" class="disclaimer" role="alert"></p>' +
      '<div class="mm-nav"><button type="button" class="btn btn-ghost" id="mm-back">Back</button>' +
      '<button type="button" class="btn btn-accent" id="mm-next">Next</button></div>' +
      '</div></div>'
    );
    document.body.appendChild(node);
    document.getElementById('mm-close').addEventListener('click', close);
    document.getElementById('mm-back').addEventListener('click', back);
    document.getElementById('mm-next').addEventListener('click', next);
    node.addEventListener('keydown', onKey);
  }

  function onKey(ev) {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      close();
      return;
    }
    if (ev.key !== 'Tab') return;
    var dialog = overlay().querySelector('.mm-dialog');
    var focusable = dialog.querySelectorAll('button, [href], input, select, textarea');
    var list = Array.prototype.filter.call(focusable, function (n) { return !n.disabled && n.offsetParent !== null; });
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  }

  function open(preset, trigger) {
    ensure();
    lastTrigger = trigger || document.activeElement;
    if (preset) state.tripType = preset;
    step = 0;
    TNTConsent.event('quiz_start', { page: location.pathname, preset: preset || '' });
    TNTConsent.event('quiz_step', { step: 1, name: STEPS[0] });
    overlay().hidden = false;
    document.body.classList.add('modal-open');
    render(true);
  }

  function close() {
    var node = overlay();
    if (!node) return;
    node.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }

  function readStep() {
    var root = document.getElementById('mm-step');
    if (step === 0) state.tripType = valueOf(root, 'trip') || state.tripType;
    if (step === 1) {
      state.destination = valueOf(root, 'dest');
      state.destinationOther = val('mm-dest-other');
      state.flightOnly = !!document.getElementById('mm-flights') && document.getElementById('mm-flights').checked;
    }
    if (step === 2) {
      state.month = val('mm-month');
      state.flexible = document.getElementById('mm-flex').checked;
    }
    if (step === 3) {
      state.from = valueOf(root, 'from');
      state.fromOther = val('mm-from-other');
    }
    if (step === 4) {
      state.adults = Number(val('mm-adults'));
      state.children = Number(val('mm-children'));
      state.ages = Array.prototype.map.call(root.querySelectorAll('[data-age]'), function (input) { return input.value; });
    }
    if (step === 5) {
      state.budget = valueOf(root, 'budget');
      state.extras = Array.prototype.map.call(root.querySelectorAll('[data-extra]:checked'), function (input) { return input.value; });
    }
  }

  function valueOf(root, name) {
    var picked = root.querySelector('input[name="' + name + '"]:checked');
    return picked ? picked.value : '';
  }

  function val(id) {
    var node = document.getElementById(id);
    return node ? node.value : '';
  }

  function validate() {
    if (step === 0 && !state.tripType) return 'Choose a trip type.';
    if (step === 1 && !state.destination) return 'Choose a destination.';
    if (step === 1 && state.destination === 'Other' && !String(state.destinationOther || '').trim()) return 'Tell us the other destination.';
    if (step === 2 && !state.flexible && !state.month) return 'Choose a month, or switch on Flexible.';
    if (step === 3 && !state.from) return 'Choose where you are flying from.';
    if (step === 3 && state.from === 'Other' && !String(state.fromOther || '').trim()) return 'Tell us the other airport.';
    if (step === 4) {
      if (!state.adults || state.adults < 1) return 'Add at least one adult.';
      if (state.children > 0 && state.ages.filter(function (a) { return String(a).trim() !== ''; }).length < state.children) {
        return 'Add an age for each child.';
      }
    }
    if (step === 5 && !state.budget) return 'Choose a budget per person.';
    return '';
  }

  function next() {
    if (step < 6) readStep();
    var error = step < 6 ? validate() : '';
    var box = document.getElementById('mm-error');
    if (error) {
      box.textContent = error;
      return;
    }
    box.textContent = '';
    if (step < 6) {
      step += 1;
      TNTConsent.event('quiz_step', { step: step < 6 ? step + 1 : 7, name: STEPS[step] || 'Confirmation' });
      render(true);
    }
  }

  function back() {
    if (step === 0) return;
    if (step < 6) readStep();
    step -= 1;
    document.getElementById('mm-error').textContent = '';
    render(true);
  }

  function answers() {
    return {
      tripType: state.tripType,
      destination: state.destination,
      destinationOther: state.destinationOther,
      flightOnly: state.flightOnly,
      month: state.month,
      monthLabel: TNTLogic.monthLabel(state.month),
      flexible: state.flexible,
      from: state.from,
      fromOther: state.fromOther,
      adults: state.adults,
      children: state.children,
      ages: state.ages,
      budget: state.budget,
      extras: state.extras
    };
  }

  function render(shouldFocus) {
    var body = document.getElementById('mm-step');
    var bar = document.getElementById('mm-bar');
    var shown = Math.min(step + 1, 6);
    bar.setAttribute('aria-valuenow', String(shown));
    bar.setAttribute('aria-valuetext', step < 6 ? ('Step ' + shown + ' of 6: ' + STEPS[step]) : 'Confirmation');
    bar.firstElementChild.style.width = (shown / 6 * 100) + '%';
    document.getElementById('mm-progress-text').textContent = step < 6 ? ('Step ' + shown + ' of 6') : 'Check this, then send it';
    document.getElementById('mm-back').hidden = step === 0;
    document.getElementById('mm-next').hidden = step === 6;
    if (step === 0) body.innerHTML = '<h3 id="mm-q" tabindex="-1">What sort of trip is it?</h3>' + choices('trip', TRIPS, state.tripType);
    if (step === 1) {
      body.innerHTML = '<h3 id="mm-q" tabindex="-1">Where would you like to go?</h3>' +
        '<p>Spain, Turkey and Greece can be quoted here. Surprise me, Other, and any destination outside those three is passed to a travel adviser.</p>' +
        choices('dest', destinationChoices(), state.destination) +
        '<label>Other destination <input id="mm-dest-other" value="' + TNTSite.escapeHtml(state.destinationOther) + '"></label>' +
        '<label class="choice"><input type="checkbox" id="mm-flights"' + (state.flightOnly ? ' checked' : '') + '> I only need flights</label>';
    }
    if (step === 2) {
      body.innerHTML = '<h3 id="mm-q" tabindex="-1">When would you like to go?</h3>' +
        '<label>Month <input id="mm-month" type="month" value="' + TNTSite.escapeHtml(state.month) + '"></label>' +
        '<label class="choice"><input type="checkbox" id="mm-flex"' + (state.flexible ? ' checked' : '') + '> Flexible</label>';
    }
    if (step === 3) {
      body.innerHTML = '<h3 id="mm-q" tabindex="-1">Where are you flying from?</h3>' +
        choices('from', AIRPORTS, state.from) +
        '<label>Other airport <input id="mm-from-other" value="' + TNTSite.escapeHtml(state.fromOther) + '"></label>';
    }
    if (step === 4) {
      var ages = '';
      for (var i = 0; i < Number(state.children || 0); i++) {
        ages += '<label>Child ' + (i + 1) + ' age <input data-age type="number" min="0" max="17" value="' + TNTSite.escapeHtml(state.ages[i] || '') + '"></label>';
      }
      body.innerHTML = '<h3 id="mm-q" tabindex="-1">Who is travelling?</h3>' +
        '<label>Adults <input id="mm-adults" type="number" min="1" max="12" value="' + state.adults + '"></label>' +
        '<label>Children <input id="mm-children" type="number" min="0" max="10" value="' + state.children + '"></label>' +
        '<div id="mm-ages">' + ages + '</div>';
      document.getElementById('mm-children').addEventListener('input', function () {
        readStep();
        render(false);
        var again = document.getElementById('mm-children');
        if (again) again.focus();
      });
    }
    if (step === 5) {
      body.innerHTML = '<h3 id="mm-q" tabindex="-1">What is your budget per person?</h3>' +
        choices('budget', BUDGETS, state.budget) +
        '<p>Optional. Tick only what you want us to ask about. We will not describe a hotel this way unless it is confirmed on the quote.</p>' +
        EXTRAS.map(function (extra) {
          var on = state.extras.indexOf(extra) !== -1;
          return '<label class="choice"><input type="checkbox" data-extra value="' + extra + '"' + (on ? ' checked' : '') + '> ' + extra + '</label>';
        }).join('');
    }
    if (step === 6) body.innerHTML = confirmation();
    var heading = document.getElementById('mm-q') || document.getElementById('mm-confirm-title');
    if (shouldFocus !== false && heading) heading.focus();
    if (step === 6) bindConfirm();
  }

  function confirmation() {
    var a = answers();
    var message = TNTLogic.buildQuoteMessage(a, TNTSite.utm());
    var adviser = TNTLogic.needsAdviser(a.destination, a.flightOnly);
    return '<h3 id="mm-confirm-title" tabindex="-1">Your enquiry</h3>' +
      (adviser ? '<p><strong>A travel adviser will reply to you.</strong></p>' : '<p>Send this on WhatsApp and we will come back with a quote.</p>') +
      '<dl class="summary">' +
      '<div><dt>Trip type</dt><dd>' + TNTSite.escapeHtml(a.tripType) + '</dd></div>' +
      '<div><dt>Destination</dt><dd>' + TNTSite.escapeHtml(a.destination === 'Other' ? a.destinationOther : a.destination) + '</dd></div>' +
      '<div><dt>When</dt><dd>' + TNTSite.escapeHtml(a.flexible && a.month ? (a.monthLabel + ' (flexible)') : (a.monthLabel || 'Flexible')) + '</dd></div>' +
      '<div><dt>From</dt><dd>' + TNTSite.escapeHtml(a.from === 'Other' ? a.fromOther : a.from) + '</dd></div>' +
      '<div><dt>Travellers</dt><dd>' + TNTSite.escapeHtml(TNTLogic.formatTravellers(a.adults, a.children, a.ages)) + '</dd></div>' +
      '<div><dt>Budget</dt><dd>' + TNTSite.escapeHtml(a.budget) + '</dd></div>' +
      '<div><dt>Extras</dt><dd>' + TNTSite.escapeHtml(a.extras.length ? a.extras.join(', ') : 'None') + '</dd></div>' +
      '</dl>' +
      '<p class="ai-note">' + TNTSite.escapeHtml(TNT.aiDisclosure) + '</p>' +
      '<p><a class="btn btn-wa" id="mm-send" data-location="matchmaker" target="_blank" rel="noopener noreferrer" href="' + TNTLogic.waHref(TNT.whatsapp, message) + '">Send to us on WhatsApp</a></p>' +
      '<p><button type="button" class="linkish" id="mm-email-toggle">Prefer email?</button></p>' +
      '<form id="mm-email" hidden>' +
      '<p>What happens next: if email sending is switched on, this goes to our form tool without the marketing tick. While that is switched off, we open WhatsApp with the same enquiry so you can send it yourself. Nothing is booked.</p>' +
      '<label>Name <input name="name" required></label>' +
      '<label>Email <input name="email" type="email" required></label>' +
      '<label class="choice"><input type="checkbox" name="offersEmail"> I\'d like to receive holiday offers by email. I can unsubscribe at any time.</label>' +
      '<p><a href="privacy.html">Read the privacy policy</a></p>' +
      '<button class="btn btn-accent" type="submit">Send the enquiry</button>' +
      '<p id="mm-email-status" role="status"></p>' +
      '</form>';
  }

  function bindConfirm() {
    var send = document.getElementById('mm-send');
    send.addEventListener('click', function () {
      TNTConsent.event('whatsapp_click', { page: location.pathname, button_location: 'matchmaker' });
      TNTConsent.lead({ method: 'whatsapp', trip_type: state.tripType });
    });
    document.getElementById('mm-email-toggle').addEventListener('click', function () {
      document.getElementById('mm-email').hidden = false;
    });
    document.getElementById('mm-email').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var form = ev.currentTarget;
      var message = TNTLogic.buildQuoteMessage(answers(), TNTSite.utm());
      message += '\nName: ' + form.name.value.trim();
      message += '\nEmail: ' + form.email.value.trim();
      message += '\nHoliday offers by email: ' + (form.offersEmail.checked ? 'yes' : 'no');
      window.TNTForms.submitLead({
        methodNote: 'email',
        tripType: state.tripType,
        message: message,
        fields: [
          { name: 'name', value: form.name.value.trim() },
          { name: 'email', value: form.email.value.trim() },
          { name: 'message', value: message }
        ],
        status: document.getElementById('mm-email-status')
      });
    });
  }

  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-open-matchmaker]');
    if (!btn) return;
    ev.preventDefault();
    open(btn.getAttribute('data-preset') || '', btn);
  });

  window.TNTMatchmaker = { open: open };
})();
