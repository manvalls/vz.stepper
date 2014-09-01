var Stepper,
    Property = require('vz.property'),
    c = require('vz.constants'),
    callback = new Property(),
    step = new Property();

Stepper = module.exports = function(cb){
  callback.of(this).set(cb);
};

function caller(){
  step.of(this.that).set(this.step);
  callback.of(this.that).get().apply(this.that,arguments);
}

Object.defineProperties(Stepper.prototype,{
  goTo: {value: function(step){
    return caller.bind({that: this,step: step});
  }},
  step: {
    get: function(){ return step.of(this).value; },
    set: c.NOOP
  }
});

