//create shield power up
//High speed power up
//repair power up - life again - not right now
//create electric coins - increases charge
//fallen trees
//broken buildings

//create stray animals - moving (crossing the street)
function strays1(){
    
      var animal = createSprite(0,600);
      animal.debug = true;
      var rand = Math.round(random(1,2));
      if(rand===1){
           animal.addAnimation("walk cat",catImg);
           animal.scale=0.5;
      }
      else{
          animal.addAnimation("walk dog",dogImg);
          animal.scale=0.5;
      }
      animal.velocityX = 3;
      animal.velocityY = 0.5;
      animal.lifetime = 230;
      stray1Group.add(animal);

      console.log("strays1");
     
}

function strays2(){
    
    var animal = createSprite(750,600);
    animal.debug = true;
    var rand = Math.round(random(1,2));
    if(rand===1){
        animal.addAnimation("walk cat",catImg);
        animal.scale=0.5;
    }
    else{
        animal.addAnimation("walk dog",dogImg);
        animal.scale=0.5;
    }
    animal.velocityX = 3;
    animal.velocityY = 0.5;
    animal.lifetime = 230;
    stray2Group.add(animal);
    console.log("strays2")
}

function trees1(){
    var tree = createSprite(400,600);
    tree.debug = true;
    tree.addImage(treeImg);
    tree.scale=0.5;
    tree.velocityY=0.5;
    tree.lifetime = 230;
    tree1Group.add(tree);
    console.log("trees1")

}

function trees2(){
    var tree = createSprite(1000,600);
    tree.debug = true;
    tree.addImage(treeImg);
    tree.scale=0.5;
    tree.velocityY=0.5;
    tree.lifetime = 230;
    tree2Group.add(tree);
    console.log("trees2");
}

function buildings1(){
    var building = createSprite(500,600);
    building.debug = true;
    building.addImage(buildingImg);
    building.lifetime = 230;
    building.velocityY=0.5;
    buildings1Group.add(building);
    console.log("buildings1");
}

function buildings2(){
    var building = createSprite(random(1100),600);
    building.debug = true;
    building.addImage(buildingImg);
    building.lifetime = 230;
    building.velocityY=0.5;
    buildings2Group.add(building);  
    console.log("buildings2");
}