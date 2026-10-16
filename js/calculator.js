(function () {
  var form = document.getElementById('cost-form');
  if (!form) return;
  var used = false;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var plan = TNTLogic.balancePlan({
      price: form.price.value,
      deposit: form.deposit.value,
      departureMonth: form.departure.value,
      weeks: TNT.balanceDueWeeksDefault,
      today: new Date()
    });
    var out = document.getElementById('cost-result');
    if (!plan.ok) {
      out.textContent = plan.reason;
      return;
    }
    var extra = plan.dueLabel ? (' Balance due date used here: ' + plan.dueLabel + ', which is the 1st of the departure month minus ' + TNT.balanceDueWeeksDefault + ' weeks (' + TNT.balanceDueWeeksLabel + ').') : '';
    out.textContent = plan.text + extra;
    if (!used && plan.kind === 'plan') {
      used = true;
      TNTConsent.event('calculator_used', { departure_month: form.departure.value });
    }
  });
})();
