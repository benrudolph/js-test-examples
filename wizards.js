function go(fn) {
  fn();
}

function goBerserk(fn) {
  fn();
  fn();
  fn();
}

function goWizardBerserk() {
  goBerserk(castSpell);
}

function castSpell(spell) {
  spell = spell || 'lumos';
  console.log(spell);
}


function killHarry() {
  goBerserk(castSpell.bind(null, 'avada kedavra'));

  return false;
}

function getTrainPlatform(callback) {
  $.get('/hogwarts/train_schedule', callback);
}

function apparate(callback) {
  window.setTimeout(function() {
    console.log('kazam!');
    callback();
  }, 1000);
}
