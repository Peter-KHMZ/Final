"use strict";
var five    = require("johnny-five"),
    board   = new five.Board(),
    led     = null,
    express =require('express'),
    app     = express(),
    port    = 8000;
const Stepper = require('johnny-five');


board.on("ready", function(){
    console.log('### Board ready');
    led = new five.Led(13);

    const stepper = new Stepper({
        type: Stepper.TYPE.DRIVER,
        stepsPerRev: 200,
        pins : {
            step: 12,
            dir : 11
        }
    });
    stepper.rpm(180).ccw().accel(1600).decel(1600);
    stepper.step(2000, ()=>{
        console.log("Done moving CCW");
        stepper.step({
            steps : 2000,
            direction: Stepper.DIRECTION.CW
        }, ()=>console.log("Done moving CW"));
    });
});

app.get('/led/:mode', function(req, res){
    if(led)
    {
        var status = "OK";
        switch(req.params.mode)
        {
            case "on":
                led.on();
                break;
            case "off":
                led.off();
                break;
            case "blink":
                led.blink();
                break;
            case "stop":
                led.stop();
                break;
            default:
                status = "unknown:" +req.params.mode;
                break;
        }
        console.log(status);
        res.send(status);
    }
    else
    {
        res.send('Board NOT ready!');
    }
});

app.listen(port, function(){
    console.log('Listening on port '+ port);
});