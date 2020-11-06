var Firmata = require('firmata').Board();
var EtherPortClient = require('etherport-client').EtherPortClient;
var board = new Firmata(new EtherPortClient({
    host: "192.168.1.103",
    port: 3030
}));

board.on("ready", function(){
    console.log('Ready');
    console.log(
        board.firmware.name + "-" +
        board.firmware.version.major + "." +
        board.firmware.version.minor
    );

    var state = 1;
    var lastVal = 0;

    this.pinMode(2, this.MODES.OUTPUT);
    setInterval(function(){
        //blinks the LED on a HUZZAH ESP8266 board
        //for other boards, wire an LED to pin 2 or change
        //the pin number below
        this.digitalWrite(13, (state ^=1));

    }.bind(this), 500);
    //this does not seem to be working-need to look into it
    //one other thing is ESP uses a 1V reference for analog so
    //once this works, it will need scaling
    this.analogRead(0, function(value){
        if(value!= lastVal );
    });
});