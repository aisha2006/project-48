const World=Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;

var car1, car2, cat, dog, tree, track1, track2, bg1sprite;
//images
var car1Img, car2Img, catImg, dogImg, bg1, bg2, trackImg, treeImg, bg1spriteImg,bg2spriteImg;

var groundCount1 = 0, groundCount2 = 0;
var count = 1000;

var lives1 = 3, charge = 3, trees=3, buildings=3;
var lives2 = 3;

var life;
var tree;
var building, buildingImg;
var gameState = "play";
var chargeImg;

var stray1Group, tree1Group, buildings1Group, livesGroup, chargeGroup;
var stray2Group, tree2Group, buildings2Group, livesGroup, chargeGroup;
var wr;

function preload(){
  car1Img = loadImage("photos/car1.png");
  car2Img = loadImage("photos/car1.png");
  bg1 = loadImage("photos/background1.jpeg");
  bg2 = loadImage("/photos/background2.jpeg");
  catImg = loadAnimation("photos/cat1.png", "photos/cat2.png", "photos/cat3.png", "photos/cat4.png");
  dogImg = loadAnimation("photos/dog1.png", "photos/dog2.png", "photos/dog3.png", "photos/dog4.png")
  treeImg = loadImage("photos/fallentree.png");
  trackImg = loadImage("photos/track.jpeg");
  life = loadImage("photos/lives.png");
  chargeImg = loadImage("photos/electricity.png");
  buildingImg = loadImage("photos/building.jpeg"); 
  wr = loadImage("photos/waterReservoir.jpeg")
}

function setup() {
  createCanvas(1400,800); 
  engine = Engine.create();
  world = engine.world;

  track1 = createSprite(350,750,500,400);
  track1.addImage(trackImg);
  track1.scale = 1;

  track2 = createSprite(1075,700,500,400);
  track2.addImage(trackImg);
  track2.scale = 0.7;

  background1 = createSprite(455, 275, 700, 1000);
  background1.addImage(bg1);
  background1.scale = 1.5;

  background2 = createSprite(1143, 295, 700, 1000);
  background2.addImage(bg2);
  background2.scale = 0.7;
  
  car1 = createSprite(350, 750, 50, 50);
  car1.addImage(car1Img);
  car1.debug=true;
  car1.setCollider("rectangle",0,0,80,100);
  
  car2 = createSprite(1050,750,50,50);
  car2.addImage(car2Img);
  car2.debug=true;
  car2.setCollider("rectangle", 0, 0, 80, 100);
  
  
  midEdge = createSprite(700,400,10,800);

  buildings1Group = new Group();
  tree1Group = new Group();
  stray1Group = new Group();

  buildings2Group = new Group();
  tree2Group = new Group();
  stray2Group = new Group();

  chargeGroup = new Group();
  livesGroup = new Group();
  
}

function draw() {
  background(0); 
  Engine.update(engine);
  if(gameState==="play"){

    //CONTROLS OF THE CAR1
    if(keyDown(UP_ARROW)&&track2.y<800){
      track2.y = track2.y+3;

      //RELOADING GROUND
      if(groundCount2 < count){
        if(track2.y>710){
          track2.y = 700;
          groundCount2++;
        }
      }
    }

    //CONTROLS OF THE CAR2
    if(keyDown("w")&&track1.y<800){
      track1.y = track1.y+3;
      
      if(groundCount1 < count){
        //RELOADING GROUND
        if(track1.y>710){
          track1.y = 700;
          groundCount1++;
        }
      }
    }
    

    if(keyDown(RIGHT_ARROW) && car2.x<1350){
      car2.x = car2.x + 3;
    }

    if(keyDown(LEFT_ARROW) && car2.x > 750){
      car2.x = car2.x - 3;
    }

    if(keyDown("a") && car1.x>50){
      car1.x = car1.x - 3;
    }

    if(keyDown("d") && car1.x < 650){
      car1.x = car1.x + 3;
    }

    
    if(groundCount1===25 || groundCount1 === 50|| groundCount1 === 75){
      strays1();
      groundCount1++
    }


    if(groundCount2===25 || groundCount2===50 || groundCount2===75){
      strays2();
      groundCount2++      
    }

    if(groundCount1=== 20 || groundCount1=== 60 || groundCount1=== 90){
      trees1();
      groundCount1++      
    }

    if(groundCount2=== 20 || groundCount2=== 60 || groundCount2=== 90){
      trees2();
      groundCount2++      
    }

    if(groundCount1=== 70){
      buildings1();
      groundCount1++      
    }

    if(groundCount2=== 70){
      buildings2();
      groundCount2++      
    }
    console.log("GC1: "+groundCount1 + "   GC2: " + groundCount2);
    
    
    

    
    //chargeBar1();
    //chargeBar2();

    if(stray1Group.isTouching(car1)){
      lives1--;
      stray1Group.destroyEach();
    }

    if(tree1Group.isTouching(car1)){
      lives1--;
      tree1Group.destroyEach();
    }


    if(buildings1Group.isTouching(car1)){
      lives1--;
      buildings1Group.destroyEach();
    }

    if(stray2Group.isTouching(car2)){
      lives2--;
      stray2Group.destroyEach();
    }

    if(tree2Group.isTouching(car2)){
      lives2--;
      tree2Group.destroyEach();
    }

    if(buildings2Group.isTouching(car2)){
      lives2--;
      buildings2Group.destroyEach();
    }

    lifeBar1();
    lifeBar2();

    if(groundCount1===100||groundCount2===100||lives1===0||lives2===0){
        gameState="end";
    }

  }
 else if(gameState==="end"){
   
   if(groundCount1!==groundCount2){
      imageMode(CENTER)
      image(wr,700,400,1400,800);
      
      track1.visible = false;
      background1.visible = false;
      
      track2.visible = false;
      background2.visible = false;
    
      if(groundCount1===100){
        
        console.log("player 1 wins!");
        car2.visible=false;
        car1.x= 700;
        car1.y = 400;
        
        
      }

      else if(groundCount2===100){
        console.log("player 2 wins!");  
        car1.visible = false; 
        car2.x= 700;
        car2.y = 400;     
      }

      else if(lives1===0){
        console.log("player 2 wins!");
        car1.visible=false;  
        car2.x= 700;
        car2.y = 400;  
      }

      else if(lives2===0){
        console.log("player 1 wins!");
        car2.visible = false;
        car1.x= 700;
        car1.y = 400;
      }

      midEdge.visible = false;
    }

    else{
      console.log("TIE");
    }
  } 
  
  drawSprites();
}
