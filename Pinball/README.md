
# Pinball

Pinball game developed in JavaScript implementing Phaser 2 and Box2d.
  
## Referenced from Phaser 2 using Box2d:

https://phaser.io/examples/v2/box2d/pinball

### *Summary and Information*

First and foremost, I did not have a plan as to what type of game I was going to build using JavaScript. I spent the first couple of days digging into examples and ran into this list of frameworks to use here to even start a game dev project, https://www.geeksforgeeks.org/8-best-javascript-game-engines. I had levitated toward Phaser since I understood most of the syntax and had a good feel for using encapsulation within my code on other starter projects.

I worked on the tutorial here for Phaser 3 which was pretty comprehensive, https://phaser.io/tutorials/making-your-first-phaser-3-game . It was decent enough to show me some key points such as how to handle objects on a canvas and deal with aspects like 'bounce' and 'bounds' in addition to animating sprites.

Taking what I learned from all the research for Phaser, and digging into other projects, I attempted my own 2-D platformer and 2-D shootemup using Phaser 3 specifically, but I did not get far before I was managing art details and trying to create assets with decent animation that I preferred. Realizing this was quite a lot of work for a 2-D game I was expected to produce within approximately 8 days, I hovered toward Pinball in Phaser 2 simply because I was able to uncover more documentation online using that specific version. They even have some short examples and walkthroughs like this one for 2-D shmups, https://phaser.io/tutorials/coding-tips-007 . Even though these walkthroughs are quite old, they still are useful today. I plan on taking on a 2-D metroidvania style platformer and 2-D shootemup later on when I have more time.

The final result is what you see here with the pinball game I chose using assets (free ones I combined, resized, etc.) I gathered online, customized, and put together on my own not creating too much overhead. I made the game continuous with a ball dropping into play automatically, and had time to add support to play on mobile devices. There is a high score kept, and the running score resets after the ball drops out of play (past the flippers). Sound and a single music track which loops have been added in addition.

## Sources of Assets

### Images:
https://opengameart.org/content/2d-pinball-sprites
https://www.pngitem.com/middle/mTxooJ_ilmenskie-cave-large-rock-1-clip-arts-hd/
https://clipartpng.com/?2712,waterfall-png-clip-art-image
### Sounds:
https://www.vpforums.org/Tutorials/Sounds/SndLib1.html
https://liquidmindmusic.com/mp3/download.html
### Controls:

#### Mobile: 
    A button = Left Flipper
    B button = Right Flipper

#### Computer: 
    A or <- = Left Flipper
    D or -> = Right Flipper

### Sounds:
    Click the 'music note' icon on the top to turn sound on and off

### Point Values:
    Big bumpers are worth 40 pts.
    Small bumpers are worth 20 pts.

#### Check out the game here:
https://voidmaelstrom.github.io/phaser-projects/Pinball/index.html