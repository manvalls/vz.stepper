# vz Stepper

[![NPM](https://nodei.co/npm/vz.stepper.png?downloads=true)](https://nodei.co/npm/vz.stepper/)

No piece of software is ever completed, feel free to contribute and be humble

## Sample usage:

```javascript

var Stepper = require('vz.stepper'),
    fs = require('fs'),
    fileName = 'foo.bar';

// Lower case file

(new Stepper(function(args,vars){
  
  switch(this.step){
    case 'start':
      vars.name = args[0];
      fs.exists(this.name,this.goTo('checkFile',vars));
      break;
    case 'checkFile':
      if(args[0]) fs.readFile(vars.name,{
        encoding: 'utf8'
      },this.goTo('open',vars));
      else throw 'File doesn\'t exist';
      break;
    case 'open':
      if(args[0]) throw args[0];
      args[1] = args[1].toLowerCase();
      fs.writeFile(vars.name,args[1],this.goTo('end'));
      break;
    case 'end':
      if(args[0]) throw args[0];
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

#### Stepper.goTo(step[,callback][,vars])

Returns a function which executes *callback* or the internal callback of the stepper, with the stepper as the thisArg, seting the current step to *step* and passing as the first argument the supplied arguments to the function, and as the second *vars* or an empty object.
