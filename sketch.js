let port; // object to hold serial port
let sensors = []; // input array
let bgCol, fgCol; // colors
let fgr = 122;
let fgg = 233;
let fgb = 100;

let senx = 100;
let seny = 100; // position of image
let connectButton; // connetcion button
let clear = false;

let colorslide = 5;

let otherrectx, otherrecty;
let shift,tilt;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //colors
  blendMode(SUBTRACT);
  
  
  // create instance of the lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  connectButton = createButton('Connect to Arduino');
  connectButton.position(10, 10);
  connectButton.mousePressed(connectBtnClick);

  smooth();
  bgColor = color(143, 111, 133);
  fgColor = color(fgr,fgg,fgb);

  otherrectx = random(200,(windowWidth-200));
  otherrecty = random(200,windowHeight-200);
  background(bgColor);

  shift = random(-200,200);
  tilt = random(-200,200);
}

function draw() {
  // if valid data
  if (port.availableBytes() > 0) {
    // read til newline
    let str = port.readUntil("\n");
    // trim whitespace
    str.trim();
    sensors = split(str, ",")
    //console.log(sensors);
    

    senx = map(sensors[0], 0, 1023, 0, width);
    seny = map(sensors[1], 0, 1023, 0, height);
   

    fgColor = color(fgr,fgg,fgb);
    
    
    // make sure something is actually there
    if (!str) {
      return;
    }
    
    
    // if (sensors.length > 2) {
    //   x = map(sensors[0], 0, 1023, 0, width);
    //   y = map(sensors[1], 0, 1023, 0, height);

    //   console.log(str);
    //   if (sensors[2] == 0) {
    //     fgColor = color(220, 100, 100);
    //   } else {
    //     fgColor = color(220, 0, 0);
    //   }
    // }

    // if it's the first time, get rid of extra stuff
    if (!clear) {
      // clare the buffer
      port.read();
      clear = true;
    }
    // send return byte
    port.write("A");
  }


  noStroke();
  //background(bgColor);
  fill(255);
  

  let thing = int(random(3));
  console.log(thing);
  
  
  if (fgr> 255 || fgr<=0){
    colorslide = -colorslide;
    fgr += colorslide;
  }
  if (fgg >255 || fgg<=0){
    colorslide = -colorslide;
    
  }
  if (fgb>=255 || fgb<=0){
    colorslide = -colorslide;
    
  }
  fgColor = color(fgr,fgg,fgb);
  if (thing == 0){
    fgr += colorslide;
  }
  if (thing == 1){
    fgr += colorslide;
  }
  if (thing == 2){
    fgr += colorslide;
  }
  textSize(20);
  //print(str);
  //text(str, windowWidth/2, windowHeight/2);

  
  strokeWeight(5);
  rectMode(CENTER);
  
  fill(fgColor);
  noStroke();
  rect(windowWidth/2+shift, windowHeight/2+tilt,int(senx),int(seny))

  fill(fgg,fgr,fgb,100);
  rect(otherrectx+(senx/3),otherrecty+(seny/8), seny/2, senx/3);

  fill(fgb,fgr,fgr,100);
  rect(otherrecty-(senx/3),otherrectx-(seny/2), senx*3, seny/2);
  // changes button label based on connection status

  fill(255);
  //text(senx, windowWidth/2,windowHeight/2);
  //text(seny, windowWidth/2,windowHeight/2+50);
  if (!port.opened()) {
    connectButton.html('Connect to Arduino');
  } else {
    connectButton.html('Disconnect');
  }


}
// if the connect button is clicked and there's
// no connection, look for something named
// "Arduino"
function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}