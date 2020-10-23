var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here
var bg;
function preload()

{
  dogimg1 = loadImage("images/dog.png");
  dogimg2 = loadImage("images/dog1.png");
  bg = loadImage("images/download (1).jpg");
  bark = loadSound("preview (mp3cut.net).mp3");
  moo = loadSound("Cow-moo-sound (mp3cut.net).mp3");
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food();
  dog = createSprite(550,300,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DOG")
  feed.position(900,60)
  feed.mousePressed(FeedDog);
 // feed.mousePressed(bark.play());

  add = createButton("ADD FOOD")
  add.position(800,60)
  add.mousePressed(AddFood)

} 

function draw(){
 background(bg);

 foodobject.display()
 
 
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
moo.play();
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){
bark.play();
dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
