(function () {
  function quoteCard(interest) {
    var label = interest || document.body.getAttribute('data-wa-interest') || 'Trip N Travel holidays';
    return '<article class="card quote-card">' +
      '<h3>Ask for a current quote</h3>' +
      '<p>We do not have a price on this page that is fresh enough to show. Tell us what you want and we will reply on WhatsApp. Nothing is booked until you agree.</p>' +
      '<p><a class="btn btn-wa" data-wa data-location="quote-card" data-wa-interest="' + TNTSite.escapeHtml(label) + '">Ask for a current quote</a></p>' +
      '<p class="ai-note">' + TNTSite.escapeHtml(TNT.aiDisclosure) + '</p>' +
      '</article>';
  }

  function card(deal) {
    var bits = [
      '<article class="card">',
      '<h3>' + TNTSite.escapeHtml(deal.title) + '</h3>',
      '<p class="price">' + TNTSite.escapeHtml(TNTLogic.priceLine(deal)) + '</p>',
      '<ul class="meta">',
      '<li>' + TNTSite.escapeHtml(String(deal.nights)) + ' nights</li>',
      '<li>' + TNTSite.escapeHtml(deal.board || '') + '</li>',
      '<li>Flying from ' + TNTSite.escapeHtml(deal.departureAirport || '') + '</li>',
      '</ul>',
      '<p>Price checked: ' + TNTSite.escapeHtml(TNTLogic.formatChecked(deal.priceCheckedDate)) + '</p>'
    ];
    if (deal.flightInclusive === true && TNT.showAtolWording) {
      bits.push('<p>' + TNTSite.escapeHtml(TNT.atolDealLine) + '</p>');
    }
    var notes = [];
    if (deal.halalFood === true) notes.push('Halal food marked on this deal');
    if (deal.alcoholFree === true) notes.push('Alcohol-free stay marked on this deal');
    if (deal.privatePool === true) notes.push('Private pool marked on this deal');
    if (notes.length) bits.push('<p>' + TNTSite.escapeHtml(notes.join('. ')) + '.</p>');
    if (deal.highlights && deal.highlights.length) {
      bits.push('<ul class="meta">' + deal.highlights.map(function (h) {
        return '<li>' + TNTSite.escapeHtml(h) + '</li>';
      }).join('') + '</ul>');
    }
    bits.push('<p><a class="btn btn-ghost" href="deal.html?id=' + encodeURIComponent(deal.id) + '">View the ' + TNTSite.escapeHtml(deal.title) + ' deal</a></p>');
    bits.push('</article>');
    return bits.join('');
  }

  function renderList(deals, host) {
    var niche = host.getAttribute('data-niche');
    var limit = Number(host.getAttribute('data-limit') || 3);
    var rows = deals.filter(function (d) { return !niche || d.niche === niche; }).slice(0, limit);
    if (!rows.length) {
      if (!host.querySelector('.quote-card')) host.innerHTML = quoteCard(host.getAttribute('data-interest'));
      TNTSite.refresh(host);
      return;
    }
    host.innerHTML = rows.map(card).join('');
    TNTSite.refresh(host);
  }

  function renderDealPage(deals) {
    var host = document.getElementById('deal-detail');
    if (!host) return;
    var id = new URLSearchParams(location.search).get('id');
    var deal = deals.filter(function (d) { return d.id === id; })[0];
    if (!deal) {
      host.innerHTML = quoteCard();
      TNTSite.refresh(host);
      return;
    }
    host.innerHTML = card(deal);
    var h1 = document.querySelector('h1');
    if (h1) h1.textContent = deal.title;
    document.title = deal.title + ' | ' + TNT.tradingName;
    TNTSite.refresh(host);
  }

  function init() {
    var hosts = document.querySelectorAll('[data-deals]');
    var page = document.getElementById('deal-detail');
    if (!hosts.length && !page) return;
    fetch('data/deals.json')
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        var today = new Date();
        var showable = (rows || []).filter(function (d) {
          return TNTLogic.isDealShowable(d, today, TNT.priceMaxAgeDays);
        });
        hosts.forEach(function (host) { renderList(showable, host); });
        if (page) renderDealPage(showable);
      })
      .catch(function () {
        hosts.forEach(function (host) {
          if (!host.querySelector('.quote-card')) host.innerHTML = quoteCard(host.getAttribute('data-interest'));
          TNTSite.refresh(host);
        });
      });
  }

  init();
})();
