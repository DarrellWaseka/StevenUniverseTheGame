var StevenHealth = 20;
var score = 0;
var gameState="play";

function preload()
{
      bgimg = loadImage("Images/bgimg.jpg")
      stevenAnimation=loadImage("Images/steve2.png")
      jasperImage = loadImage("Images/jasper.png")
      cookieImage = loadImage("Images/cookie.png");
      fireImage = loadAnimation("Images/finalfire1.png","Images/finalfire2.png")
      sadstevenImage = loadImage("Images/stevensad1.jpg")
}

function setup() 
{
      createCanvas(1280,650);
      steven = createSprite(681, 444, 50, 50);
      jasper = createSprite(243, 472, 60, 60);
      ground = createSprite(640,535,1280,20);
      ground.visible= false;
      
      steven.addImage("Steven1",stevenAnimation)
      jasper.addImage("jasper", jasperImage)
      cookiesgroup = new Group()
      firesgroup = new Group()

      //steven.debug=true;
      steven.setCollider("rectangle",0,0,140,150);
    
     
}

function draw() 
{
  background(bgimg);  
  drawSprites();


  if(gameState==="play")
  {
      if(keyDown("left"))
      {
          steven.x = steven.x - 5
      }
    
      if(keyDown("right"))
      {
            steven.x = steven.x + 5
      }
    
      if(keyDown("up") && steven.y > 400)
      {
          steven.velocityY = - 10;
      }

      steven.velocityY = steven.velocityY + 0.3;

      spawnCookies()
      spawnFire()

      if(steven.isTouching(cookiesgroup))
      {
            score=score+1;
            cookiesgroup[0].destroy();
      }

      if(steven.isTouching(firesgroup))
      {
            StevenHealth=StevenHealth-1;
            firesgroup[0].destroy();
      }

      if(steven.isTouching(jasper))
      {
            StevenHealth=0;
      }

      if(StevenHealth===0)
      {
            gameState="end";
      }
    






  }
  else if(gameState==="end")
  {

     background(sadstevenImage)
     fill("black")
     textSize(35)
     text("You Died ! Press Reload Button to Restart", 338 , 116)
     

  }



  fill("black")
  text("HEALTH : "+StevenHealth,1076, 51 );
  text("SCORE : "+score,1076, 100 );
 
  steven.collide(ground);
}

function spawnCookies()
{
    if(frameCount%150===0)
    {
      cookie = createSprite(random(400,1200), 0, 20, 20);
      cookie.addImage("cookie", cookieImage);
      cookie.scale = 0.1;

      cookie.velocityY = 6; 
      cookiesgroup.add(cookie)


    }
}

function spawnFire()
{
  if(frameCount%150===0)
  {

      fireball = createSprite(333,375);
      fireball.addAnimation("fireimg",fireImage)
      fireball.scale = 0.5;

      fireball.velocityX=random(2,10);
      fireball.velocityY=random(-4,4);

      firesgroup.add(fireball)

 }
}