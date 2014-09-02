# vz Stepper

[![NPM](https://nodei.co/npm/vz.stepper.png?downloads=true)](https://nodei.co/npm/vz.stepper/)

## Sample usage:

```javascript

var Stepper = require('vz.stepper'),
    fs = require('fs'),
    fileName = 'foo.bar';

// Lower case file

(new Stepper(function(){
  
  switch(this.step){
    case 'start':
      this.name = arguments[0];
      fs.exists(this.name,this.goTo('checkFile'));
      break;
    case 'checkFile':
      if(arguments[0]) fs.readFile(this.name,{
        encoding: 'utf8'
      },this.goTo('open'));
      else throw 'File doesn\'t exist';
      break;
    case 'open':
      if(arguments[0]) throw arguments[0];
      arguments[1] = arguments[1].toLowerCase();
      fs.writeFile(this.name,arguments[1],this.goTo('end'));
      break;
    case 'end':
      if(arguments[0]) throw arguments[0];
      console.log('Success');
      break;
  }
  
})).goTo('start')(fileName);

```

## Reference:

### Stepper object

#### Constructor([callback])

Creates and initializes a stepper with *callback* as its internal callback.

#### Stepper.step

The current step of the stepper

#### Stepper.goTo(step[,callback])

Returns a function which executes *callback* or the internal callback of the stepper, with the stepper as the thisArg, seting the current step to *step*.
