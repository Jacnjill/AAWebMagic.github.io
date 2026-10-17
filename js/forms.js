(function () {
  function status(node, text) {
    if (node) node.textContent = text;
  }

  function openWhatsApp(message) {
    window.open(TNTLogic.waHref(TNT.whatsapp, message), '_blank', 'noopener');
  }

  var LEAD_DESTINATIONS = ['Spain', 'Turkey', 'Greece', 'Not sure', 'Other'];

  /* Our own function. It sets no cookie and loads no HubSpot script, so this route does not depend on marketing-cookie consent. */
  function leadAllowed() {
    var endpoint = typeof TNT.leadEndpoint === 'string' ? TNT.leadEndpoint.trim() : '';
    return !!(TNT.hubspotEnabled && TNTLogic.isRealId(endpoint));
  }

  function enquiryLead(form) {
    var body = { firstname: form.firstname.value.trim() };
    var last = form.lastname ? form.lastname.value.trim() : '';
    if (last) body.lastname = last;
    body.phone = form.phone ? form.phone.value.trim() : '';
    var email = form.email ? form.email.value.trim() : '';
    if (email) body.email = email;
    var destination = form.destination ? form.destination.value : '';
    if (LEAD_DESTINATIONS.indexOf(destination) !== -1) body.tnt_destination = destination;
    body.whatsapp_marketing_consent = !!(form.tnt_marketing_consent && form.tnt_marketing_consent.checked);
    body.page_url = location.href;
    body.source = form.id || 'website-enquiry';
    body.company_website = form.company_website ? form.company_website.value : '';
    return body;
  }

  async function submitLead(opts) {
    var sent = false;
    var tried = false;
    if (opts.lead && leadAllowed()) {
      tried = true;
      try {
        var endpoint = TNT.leadEndpoint.trim();
        var res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(opts.lead)
        });
        sent = !!res.ok;
      } catch (e) {
        sent = false;
      }
    }
    if (sent) {
      status(opts.status, TNT.showContactHours
        ? 'Thank you. Your enquiry has been sent. We will reply during our contact hours. Nothing is booked yet.'
        : 'Thank you. Your enquiry has been sent. Nothing is booked yet.');
    } else if (tried) {
      openWhatsApp(opts.message);
      status(opts.status, 'We could not send the form. WhatsApp should open with your message. Please press send there.');
    } else {
      openWhatsApp(opts.message);
      status(opts.status, 'WhatsApp should open with your message. Please press send there. We have not stored this on a form tool.');
    }
    TNTConsent.lead({ method: sent ? 'email' : 'whatsapp', trip_type: opts.tripType || '' });
    if (opts.guide) TNTConsent.event('guide_download', { guide: 'Turkey on a Budget 2027' });
  }

  function enquiryMessage(form) {
    var destination = form.destination.value;
    var other = form.destinationOther ? form.destinationOther.value.trim() : '';
    var flightOnly = form.flightOnly && form.flightOnly.checked;
    var lines = [
      'Hi Trip N Travel 👋',
      'Enquiry from the website',
      'Name: ' + form.firstname.value.trim() + ' ' + form.lastname.value.trim(),
      'Email: ' + (form.email ? form.email.value.trim() : ''),
      'Phone: ' + (form.phone ? form.phone.value.trim() : ''),
      'Destination: ' + (destination === 'Other' ? ('Other: ' + other) : destination),
      'When: ' + (form.when ? form.when.value.trim() : ''),
      'Message: ' + (form.message ? form.message.value.trim() : ''),
      'Flights only: ' + (flightOnly ? 'Yes' : 'No'),
      'Holiday offers by WhatsApp: ' + (form.tnt_marketing_consent && form.tnt_marketing_consent.checked ? 'yes' : 'no')
    ];
    if (flightOnly || TNTLogic.needsAdviser(destination, flightOnly)) {
      lines.push('Chat to Trip N Travel on WhatsApp');
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
    if ((kind === 'contact' || kind === 'enquiry') && !(form.enquiryConsent && form.enquiryConsent.checked)) {
      status(box, 'Tick the box to agree to Trip N Travel contacting you about this enquiry.');
      return;
    }
    if (kind === 'guide' && form.guideConsent && !form.guideConsent.checked) {
      status(box, 'Tick the box if you want the guide when it is ready.');
      return;
    }
    var message = '';
    var fields = [];
    var lead = null;
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
      lead = enquiryLead(form);
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
    submitLead({
      message: message,
      fields: fields,
      lead: lead,
      status: box,
      guide: guide,
      tripType: kind
    });
  });

  var enquiryDest = document.getElementById('enquiry-destination');
  if (enquiryDest) {
    TNTLogic.coreDestinations(TNT.extraDestinations).extras.forEach(function (name) {
      var opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      enquiryDest.insertBefore(opt, enquiryDest.querySelector('[value="Not sure"]'));
    });
    var presetDest = new URLSearchParams(location.search).get('destination');
    if (presetDest && Array.prototype.some.call(enquiryDest.options, function (o) { return o.value === presetDest; })) {
      enquiryDest.value = presetDest;
    }
  }

  function linkPrivacyNotice() {
    var url = TNT.privacyUrl || '';
    if (!TNTLogic.isRealId(url) || !/^(https?:\/\/|\/)?[A-Za-z0-9._~/-]+$/.test(url)) return;
    document.querySelectorAll('[data-privacy-notice]').forEach(function (node) {
      var text = node.textContent || '';
      var phrase = 'Privacy Notice';
      var at = text.indexOf(phrase);
      if (at < 0) return;
      node.textContent = '';
      node.appendChild(document.createTextNode(text.slice(0, at)));
      var link = document.createElement('a');
      link.href = url;
      link.textContent = phrase;
      node.appendChild(link);
      node.appendChild(document.createTextNode(text.slice(at + phrase.length)));
    });
  }

  linkPrivacyNotice();
  window.TNTForms = { submitLead: submitLead, linkPrivacyNotice: linkPrivacyNotice, leadAllowed: leadAllowed };
})();
