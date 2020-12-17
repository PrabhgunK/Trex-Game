var trex_1,Trex,edges,invisible_gnd,cloud1,randno,score=0,gamestate="play";

function preload (){
  trex_1=loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_1=loadImage("ground2.png")
  cloud_img=loadImage("cloud.png")
  obst1=loadImage("obstacle1.png")
  obst2=loadImage("obstacle2.png")
  obst3=loadImage("obstacle3.png") 
  obst4=loadImage("obstacle4.png")
  obst5=loadImage("obstacle5.png")
  obst6=loadImage("obstacle6.png")
  collide=loadAnimation("trex_collided.png")
  regame=loadImage("restart.png")
  end=loadImage("gameOver.png")
  Milestone=loadSound("checkPoint.mp3")
  Dead=loadSound("die.mp3")
  Jump=loadSound("jump.mp3")
  }//end function preload 

function setup() {
  createCanvas(600, 400);
  Trex=createSprite(50,365,20,60);
  Trex.addAnimation("run",trex_1)
  Trex.scale=0.7;
  Trex.addAnimation("collide",collide)
  ground=createSprite(200,380,400,20);
  ground.addImage(ground_1)
  edges=createEdgeSprites()
    
  invisible_gnd=createSprite(200,390,400,10);
  invisible_gnd.visible=false
  obstaclegroup=new Group()
  cloudgroup=new Group()
 Trex.setCollider("circle",0,-15,70)
//Trex.debug=true  
  Restart=createSprite(300,200,20,20)
  Restart.addImage("re",regame)
  Restart.scale=0.5
  Gameover=createSprite(300,100,10,10)
  Gameover.addImage("over",end)
  
}//End of function setup 

function draw() {
  background("white");
  console.log("world"+5);
  Trex.collide(invisible_gnd);
  text("Score:"+score,200,50)
  //Gamestate play starts from here
  if(gamestate=="play"){
  
  cloud();
  obstacle();
  if(keyDown("space")&&Trex.y>=346){
  Trex.velocityY=-10 ;
  Jump.play();
  }
  ground.velocityX=-20;
  
  //If condition to make the ground scroll 
  if (ground.x<0){
    ground.x=200 
  }
  
  // For gravity 
  Trex.velocityY=Trex.velocityY+0.5;
  score=score+Math.round(getFrameRate()/60)
  Restart.visible=false
  Gameover.visible=false
    //if condition to land in the end state
  if(Trex.isTouching(obstaclegroup)){
   gamestate="end"
   Dead.play(); 
  }
  }//End of play state and start of end state
  else if (gamestate=="end"){
   ground.velocityX=0
   obstaclegroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);
   Trex.velocityY=0;
   Trex.changeAnimation("collide",collide) 
   Restart.visible=true;
   Gameover.visible=true;
    if(mousePressedOver(Restart)){
  reset ();
  }
  }//end of Trex.addImagethe end state
  //console.log(Trex.y)
 if(score %100==0) {
  Milestone.play(); 
 } 
  
  drawSprites();
  
  
   
}// End of function draw 
function cloud (){
  //if condition to place clouds randomly 
  if(frameCount %70==0){
    randno=Math.round(random(0,150)    )
    cloud1=createSprite(500,randno,20,20) 
    cloud1.velocityX=-5
    cloud1.addImage(cloud_img)
    cloud1.scale=0.5
    console.log(cloud1.depth )
    Trex.depth=cloud1.depth;
    Trex.depth=Trex.depth+1
    cloudgroup.add(cloud1)  
    cloudgroup.setLifetimeEach(-1)
   }
}
  function obstacle(){
    //If condition to make the obstacles come randomly 
    if(frameCount %170==0){
         randno1=Math.round(random(1,6))
         obstc_sprite=createSprite(700,360,10,70) 
          switch(randno1){
          case 1:obstc_sprite.addImage(obst1);
          break;
          case 2:obstc_sprite.addImage(obst2);
          break;
          case 3:obstc_sprite.addImage(obst3);
          break;
          case 4:obstc_sprite.addImage(obst4);
          break;
         case 5:obstc_sprite.addImage(obst5);
         break;
         case 6:obstc_sprite.addImage(obst6);
         break;
         default:break;
      }
  obstaclegroup.add(obstc_sprite)    
  obstc_sprite.scale=0.5
  //obstc_sprite.velocityX=-20
  obstaclegroup.setLifetimeEach(-1) 
  obstc_sprite.velocityX=-(20+score/100)
    } 
}
function reset (){
gamestate="play"
obstaclegroup.destroyEach()
cloudgroup.destroyEach()
Trex.changeAnimation("run",trex_1)
score=0
}
