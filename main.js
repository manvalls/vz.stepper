var Stepper,
    Property = require('vz.property'),
    c = require('vz.constants'),
    callback = new Property(),
    step = new Property(),
    
    USE_BIND = false;

Stepper = module.exports = function(cb){
  callback.of(this).set(cb);
};

function caller(){
  step.of(this.that).set(this.step);
  (this.cb || callback.of(this.that).get()).call(this.that,arguments,this.vars);
}

Object.defineProperties(Stepper.prototype,{
  goTo: {value: function(step,cb,vars){
    var temp,that = this;
    
    if(!cb.apply){
      temp = vars;
      vars = cb;
      cb = temp;
    }
    
    vars = vars || {};
    
    if(USE_BIND) return caller.bind({that: this,step: step,cb: cb,vars: vars});
    else return function(){
      return caller.apply({that: that,step: step,cb: cb,vars: vars},arguments);
    };
  }},
  step: {
    get: function(){ return step.of(this).value; },
    set: c.NOOP
  }
});

