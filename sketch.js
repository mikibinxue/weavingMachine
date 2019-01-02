var drawPatch;
var cv;
var randomSelection=[];







function setup() {
  cv = createCanvas(windowWidth*0.7, windowHeight);
  cv.parent("cvs_div");


  drawPatch = new DrawPatch();

  //replace gui with dom element
  // var gui = new dat.GUI();
  // var colController = gui.add(drawPatch, 'col', 0, 15).step(1);
  // var rowController = gui.add(drawPatch, 'row', 15, 40).step(1);
  // rowController.onChange(drawPatch.rowColChanged.bind(drawPatch));
  // colController.onChange(drawPatch.rowColChanged.bind(drawPatch));

for(var i=0;i<15;i++){
  randomSelection.push(floor(random(0,10)));
}



}



function draw() {
  background(235,247,240);

    drawPatch.run();

}

//create a class that stores the information of the canvas
function DrawPatch() {
  //x,y pos
  //treadling
  this.x1=height/50;
  this.y1=height/4;

  //tieup
  this.x2=height/50;
  this.y2=height/50;

  //threading
  this.x3=height/4+2*height/50;
  this.y3=height/50;




  //final DrawPatc
  this.x4=height/4+2*height/50;
  this.y4=height/4;


  //box
  this.size=height/50;

  //width and height
  this.col=10;   //col smaller than row
  this.row=35;

  //mouse interaction
  //treadling
  this.wMin1;
  this.wMax1;
  this.hMin1;
  this.hMax1;
  this.m1=math.zeros(this.row,this.col);
  this.mArray1=this.m1.valueOf();

  //tieup
  this.wMin2;
  this.wMax2;
  this.hMin2;
  this.hMax2;
  this.m2=math.zeros(this.col,this.col);
  this.mArray2=this.m2.valueOf();

  //threading
  this.wMin3;
  this.wMax3;
  this.hMin3;
  this.hMax3;
  this.m3=math.zeros(this.col,this.row);
  this.mArray3=this.m3.valueOf();

    //transposed tie up
    this.transpose=math.zeros(this.col,this.col);
    this.transposeArray=this.transpose.valueOf();






//final DrawPatch
this.m4=math.zeros(this.row,this.row);
this.mArray4=this.m4.valueOf();

  //store mouse pos
  this.mouseC;
  this.mouseR;

//for pattern
this.treadlingPattern = 0;
this.threadingPattern = 0;
this.tieupPattern=0;



  this.rowColChanged = function() {
    console.log("here");

    //treadling
    this.m1=math.zeros(this.row,this.col);
    this.mArray1=this.m1.valueOf();
//tieup
    this.m2=math.zeros(this.col,this.col);
    this.mArray2=this.m2.valueOf();
//threading
    this.m3=math.zeros(this.col,this.row);
    this.mArray3=this.m3.valueOf();

    //final DrawPatch
    this.m4=math.zeros(this.row,this.row);
    this.mArray4=this.m4.valueOf();

    //transposed tie up
    this.transpose=math.zeros(this.col,this.col);
    this.transposeArray=this.transpose.valueOf();


  }

this.treadling=function(){
  if(this.treadlingPattern==0){
    //zig zag
for(var j=0;j<this.row;j++){
  for(var i=0;i<this.col;i++){
    if(j%this.col ==i){
      this.mArray1[j][i]=1;
    }
  }
}

  }else if(this.treadlingPattern==1){
    //math generate
  this.trail();

  }

  this.m1 = math.matrix(this.mArray1);

}



this.tieup=function(){

  if(this.tieupPattern==0){
    //zig zag
for(var j=0;j<this.col;j++){
  for(var i=0;i<this.col;i++){
    if(i%this.col ==j){
      this.mArray2[j][i]=1;
    }
  }
}

}else if(this.tieupPattern==1){
    //math generate
  this.trail();

  }
  this.m2 = math.matrix(this.mArray2);

}

this.threading=function(){
  if(this.threadingPattern==0){
    //zig zag
for(var j=0;j<this.col;j++){
  for(var i=0;i<this.row;i++){
    if(i%this.col ==j){
      this.mArray3[j][i]=1;
    }
  }
}

  }else if(this.threadingPattern==1){
    //math generate
  this.trail();

  }
  this.m3 = math.matrix(this.mArray3);

}


  this.run=function(){
    this.updateRange();
    // this.trail();
    this.treadling();
    this.tieup();
    this.threading();
    this.generate();
    this.display();
  }



  this.updateRange=function(){
    //treadling
  this.wMin1 = this.x1;
  this.wMax1 = this.x1+this.col*this.size;
  this.hMin1=this.y1;
  this.hMax1=this.y1+this.row*this.size;
  //update Matrix
  this.m1= math.matrix(this.mArray1);

  //tie up
  this.wMin2 = this.x2;
  this.wMax2 = this.x2+this.col*this.size;
  this.hMin2=this.y2;
  this.hMax2=this.y2+this.col*this.size;
  //update Matrix
    this.m2= math.matrix(this.mArray2);

    //update transpose
    this.updateTrans();


  //threading
  this.wMin3 = this.x3;
  this.wMax3 = this.x3+this.row*this.size;
  this.hMin3=this.y3;
  this.hMax3=this.y3+this.col*this.size;
  //update matrix
  this.m3= math.matrix(this.mArray3);
  this.mArray4=this.m4.valueOf();

  }

  this.updateTrans=function(){

for(var j=0;j<this.col;j++){
  for(var i=0;i<this.col;i++){
    this.transposeArray[j][i]=this.mArray2[this.col-1-j][this.col-1-i];
  }
}

this.transpose=math.matrix(this.transposeArray);
  }


  this.display=function(){
    strokeWeight(2);
    fill(255);

    //go through each box in the array to fill in the beox
//translate
//treadling
push();
translate(this.x1,this.y1);
for(var j=0;j<this.row;j++){
  for(var i=0;i<this.col;i++){
  fill(255-255*this.mArray1[j][i]);
  rect(i*this.size,j*this.size,this.size,this.size);
  }
}
pop();

//tie up
push();
translate(this.x2,this.y2);
for(var j=0;j<this.col;j++){
  for(var i=0;i<this.col;i++){
  fill(255-255*this.mArray2[j][i]);
  rect(i*this.size,j*this.size,this.size,this.size);
  }
}
pop();

//threading
push();
translate(this.x3,this.y3);
for(var j=0;j<this.col;j++){
  for(var i=0;i<this.row;i++){
  fill(255-255*this.mArray3[j][i]);
  rect(i*this.size,j*this.size,this.size,this.size);
  }
}
pop();

//final DrawPatch
push();
translate(this.x4,this.y4);
for(var j=0;j<this.row;j++){
  for(var i=0;i<this.row;i++){
  fill(255-255*this.mArray4[j][i]);
  rect(i*this.size,j*this.size,this.size,this.size);
  }
}
pop();

  }

  this.trail=function(){

  if(this.checkMouse()!=0){
    // console.log("in the frame");
//check the position of the Mouse
//if it is in the grid, draw the cell green
    push();
    fill(0,255,0);
ellipse(mouseX,mouseY,50,50);
    pop();
if(this.checkMouse()==1){
  this.mouseC = floor(map(mouseX, this.wMin1, this.wMax1, 0, this.col));
  this.mouseR = floor(map(mouseY, this.hMin1, this.hMax1, 0, this.row));

  this.mArray1[this.mouseR][this.mouseC]=1;

}else if(this.checkMouse()==2){
  this.mouseC = floor(map(mouseX, this.wMin2, this.wMax2, 0, this.col));
  this.mouseR = floor(map(mouseY, this.hMin2, this.hMax2, 0, this.col));

  this.mArray2[this.mouseR][this.mouseC]=1;

}else if(this.checkMouse()==3){
  this.mouseC = floor(map(mouseX, this.wMin3, this.wMax3, 0, this.row));
  this.mouseR = floor(map(mouseY, this.hMin3, this.hMax3, 0, this.col));

  this.mArray3[this.mouseR][this.mouseC]=1;
}

this.display();

  }
}


//check if the mouse is in the canvas
  this.checkMouse = function(){
    this.updateRange();
    //return 0" not in the frame
    // return 1: in threading
    // return 2: in the tie up
    //return 3: in threading
    if((mouseX>this.wMin1)&&(mouseX<this.wMax1)&&(mouseY>this.hMin1)&&(mouseY<this.hMax1)){
      return 1;
    }else if((mouseX>this.wMin2)&&(mouseX<this.wMax2)&&(mouseY>this.hMin2)&&(mouseY<this.hMax2)){
      return 2;
    }else if((mouseX>this.wMin3)&&(mouseX<this.wMax3)&&(mouseY>this.hMin3)&&(mouseY<this.hMax3)){
      return 3;
    }else{
      return 0;
    }

  }


  this.generate = function(){
    //calculate the matrix for treadling x tie up
var temp1 = math.multiply(this.m1,this.transpose);


//calculate the matrix for threading
this.m4 = math.multiply(temp1,this.m3);
// this.m4=math.matrix(this.mArray4);

  }
}



function savePattern(){
  saveCanvas('myPattern', 'png');
}
