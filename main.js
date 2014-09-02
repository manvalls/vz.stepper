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
  (this.cb || callback.of(this.that).get()).call(this.that,arguments,this.vars);
}

Object.defineProperties(Stepper.prototype,{
  goTo: {value: function(step,cb,vars){
    var temp;
    
    if(!cb.apply){
      temp = vars;
      vars = cb;
      cb = temp;
    }
    
    vars = vars || {};
    
    return caller.bind({that: this,step: step,cb: cb,vars: vars});
  }},
  step: {
    get: function(){ return step.of(this).value; },
    set: c.NOOP
  }
});

