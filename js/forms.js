(function () {
  function status(node, text) {
    if (node) node.textContent = text;
  }

  function openWhatsApp(message) {
    window.open(TNTLogic.waHref(TNT.whatsapp, message), '_blank', 'noopener');
  }

  async function submitLead(opts) {
    var hubspotOk = false;
    if (TNT.hubspotEnabled && TNTLogic.isRealId(TNT.hubspotPortalId) && TNTLogic.isRealId(TNT.hubspotFormId)) {
      try {
        /* Marketing consent is not included. Nothing may write that consent to HubSpot yet. */
        var payload = {
          fields: (opts.fields || []).filter(function (field) {
            return field.name !== 'offersEmail' && field.name !== 'offersWhatsapp' && field.name !== 'marketing';
          }),
          context: { pageUri: location.href, pageName: document.title }
        };
        var url = 'https://api.hsforms.com/submissions/v3/integration/submit/' +
          encodeURIComponent(TNT.hubspotPortalId) + '/' + encodeURIComponent(TNT.hubspotFormId);
        var res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        hubspotOk = res.ok;
      } catch (e) {
        hubspotOk = false;
      }
    }
    if (!hubspotOk) {
      openWhatsApp(opts.message);
      status(opts.status, 'WhatsApp should open with your message. Please press send there. We have not stored this on a form tool.');
    } else {
      status(opts.status, 'Thank you. Your enquiry has been sent. We will reply during our contact hours. Nothing is booked yet.');
    }
    TNTConsent.lead({ method: hubspotOk ? 'email' : 'whatsapp', trip_type: opts.tripType || '' });
    if (opts.guide) TNTConsent.event('guide_download', { guide: 'Turkey on a Budget 2027' });
  }

  function enquiryMessage(form) {
    var destination = form.destination.value;
    var other = form.destinationOther ? form.destinationOther.value.trim() : '';
    var flightOnly = form.flightOnly && form.flightOnly.checked;
    var lines = [
      'Hi Trip N Travel 👋',
      'Enquiry from the website',
      'Name: ' + form.name.value.trim(),
      'Email: ' + (form.email ? form.email.value.trim() : ''),
      'Phone: ' + (form.phone ? form.phone.value.trim() : ''),
      'Destination: ' + (destination === 'Other' ? ('Other: ' + other) : destination),
      'When: ' + (form.when ? form.when.value.trim() : ''),
      'Message: ' + (form.message ? form.message.value.trim() : ''),
      'Flights only: ' + (flightOnly ? 'Yes' : 'No'),
      'Holiday offers by email: ' + (form.offersEmail && form.offersEmail.checked ? 'yes' : 'no'),
      'Holiday offers by WhatsApp: ' + (form.offersWhatsapp && form.offersWhatsapp.checked ? 'yes' : 'no')
    ];
    if (flightOnly || TNTLogic.needsAdviser(destination, flightOnly)) {
      lines.push('A travel adviser will reply to you');
    }
    var utm = TNTSite.utm();
    lines.push('Ref: ' + utm.source + '/' + utm.campaign);
    return lines.join('\n');
  }

  document.addEventListener('submit', function (ev) {
    var form = ev.target.closest('[data-form]');
    if (!form) return;
    ev.preventDefault();
    var kind = form.getAttribute('data-form');
    var box = form.querySelector('[data-status]');
    if (kind === 'guide' && form.guideConsent && !form.guideConsent.checked) {
      status(box, 'Tick the box if you want the guide when it is ready.');
      return;
    }
    var message = '';
    var fields = [];
    var guide = false;
    if (kind === 'contact') {
      message = [
        "Hi, I'm interested in speaking to Trip N Travel",
        'Name: ' + form.name.value.trim(),
        'Phone: ' + form.phone.value.trim(),
        'Message: ' + form.message.value.trim(),
        'Holiday offers by WhatsApp: ' + (form.offersWhatsapp.checked ? 'yes' : 'no')
      ].join('\n');
      fields = [
        { name: 'name', value: form.name.value.trim() },
        { name: 'phone', value: form.phone.value.trim() },
        { name: 'message', value: form.message.value.trim() }
      ];
    } else if (kind === 'enquiry') {
      if (form.destination.value === 'Other' && !form.destinationOther.value.trim()) {
        status(box, 'Tell us the other destination.');
        return;
      }
      message = enquiryMessage(form);
      fields = [
        { name: 'name', value: form.name.value.trim() },
        { name: 'email', value: form.email.value.trim() },
        { name: 'phone', value: form.phone.value.trim() },
        { name: 'message', value: message }
      ];
    } else if (kind === 'guide') {
      guide = true;
      message = [
        'Hi Trip N Travel 👋',
        'Please send the Free guide: Turkey on a Budget 2027 when it is ready.',
        'Name: ' + form.name.value.trim(),
        'Email: ' + form.email.value.trim(),
        'WhatsApp: ' + form.phone.value.trim(),
        'Guide consent: yes',
        'Holiday offers by email: ' + (form.offersEmail.checked ? 'yes' : 'no'),
        'Holiday offers by WhatsApp: ' + (form.offersWhatsapp.checked ? 'yes' : 'no')
      ].join('\n');
      fields = [
        { name: 'name', value: form.name.value.trim() },
        { name: 'email', value: form.email.value.trim() },
        { name: 'phone', value: form.phone.value.trim() },
        { name: 'message', value: message }
      ];
    } else if (kind === 'umrah') {
      message = [
        'Hi Trip N Travel 👋',
        'Umrah interest only. This is not a booking.',
        'Name: ' + form.name.value.trim(),
        'Phone: ' + form.phone.value.trim(),
        'Holiday offers by WhatsApp: ' + (form.offersWhatsapp.checked ? 'yes' : 'no')
      ].join('\n');
      fields = [
        { name: 'name', value: form.name.value.trim() },
        { name: 'phone', value: form.phone.value.trim() },
        { name: 'message', value: message }
      ];
    } else return;
    submitLead({ message: message, fields: fields, status: box, guide: guide, tripType: kind });
  });

  var enquiryDest = document.getElementById('enquiry-destination');
  if (enquiryDest) {
    TNTLogic.coreDestinations(TNT.extraDestinations).extras.forEach(function (name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      enquiryDest.insertBefore(opt, enquiryDest.querySelector('[value="Surprise me"]'));
    });
    var presetDest = new URLSearchParams(location.search).get('destination');
    if (presetDest && Array.prototype.some.call(enquiryDest.options, function (o) { return o.value === presetDest; })) {
      enquiryDest.value = presetDest;
    }
  }

  window.TNTForms = { submitLead: submitLead };
})();
