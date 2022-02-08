// Set divs for beginning animation of splash screen components (div:nth-child entries in style.css)
let divider = document.createElement("div");

for (let i = 0; i < 12; i++) {
  document.getElementsByClassName("lds-spinner").appendChild(divider);
}

let Pinball = {
	showDebug: false
};

Pinball.Preloader = function() {};

Pinball.Preloader.prototype = {

	init: function() {
			// Applying the max pointers value
			this.input.maxPointers = 2;

			// Setting the roundPixels property to true (keep this setting)
			this.game.renderer.renderSession.roundPixels = true;

			// Scaling the canvas size for the game
			let scaleX = window.innerWidth / 335;
			let scaleY = window.innerHeight / 600;
			let scale = Math.min(scaleX, scaleY);
			this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
			this.scale.setUserScale(scale, scale);
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.refresh();
	},

	preload: function() {
			let imageBackground = "assets/imagebackground.png";
			let imageBoard = "assets/imageboard.png";
			let imageBall = "/assets/ball.png";
			let imageLargeCircle = "/assets/imagelargecircle.png";
			let imageMediumCircle = "/assets/imagemediumcircle.png";
			let imageLauncher = "/assets/imagelauncher.png";
			let imageHighScore = "/assets/imagehighscore.png";
			let imageSoundOn = "assets/imagesoundon.png";
			let imageSoundOff = "assets/imagesoundoff.png";
			let imageButtonANormal = "assets/imagebuttonANormal.png";
			let imageButtonAPressed = "assets/imagebuttonAPressed.png";
			let imageButtonBNormal = "assets/imagebuttonBNormal.png";
			let imageButtonBPressed = "assets/imagebuttonBPressed.png";
			let imageBlock = "assets/imageblock.png";
			let imageLogoPart1 = "assets/imagelogopart1.png";
			let imageLogoPart2 = "assets/imagelogopart2.png";

			// Load sounds
			let soundLauncher = "assets/ballLauncher.mp3";
			let soundFlipper = "assets/flipper.mp3";
			let soundHit = "assets/pinHit.mp3";
			let soundHitLarge = "assets/largePinHit.mp3";
			let backGroundMusic = "assets/backgroundmusic.mp3";

			// Load images
			this.load.image("imageBackground", imageBackground);
			this.load.image("imageBoard", imageBoard);
			this.load.image("imageBall", imageBall);
			this.load.image("imageLargeCircle", imageLargeCircle);
			this.load.image("imageMediumCircle", imageMediumCircle);
			this.load.image("imageLauncher", imageLauncher);
			this.load.image("imageHighScore", imageHighScore);
			this.load.image("imageSoundOn", imageSoundOn);
			this.load.image("imageSoundOff", imageSoundOff);
			this.load.image("imageButtonANormal", imageButtonANormal);
			this.load.image("imageButtonAPressed", imageButtonAPressed);
			this.load.image("imageButtonBNormal", imageButtonBNormal);
			this.load.image("imageButtonBPressed", imageButtonBPressed);
			this.load.image("imageBlock", imageBlock);
			this.load.image("imageLogoPart1", imageLogoPart1);
			this.load.image("imageLogoPart2", imageLogoPart2);

			// Load the sounds
			this.load.audio("soundLauncher", soundLauncher);
			this.load.audio("soundFlipper", soundFlipper);
			this.load.audio("soundHit", soundHit);
			this.load.audio("soundHitLarge", soundHitLarge);
			this.load.audio("backGroundMusic", backGroundMusic);

			// Load the font
			game.load.bitmapFont("ArialBlackWhite", "assets/ArialBlackWhite.png", "assets/font.xml");
	},

	create: function() {
			// Start the game
			this.state.start("Pinball.Splash");
	}
};

Pinball.Splash = function() {};

Pinball.Splash.prototype = {

	init: function() {},

	preload: function() {
			this.imageLogoPart1 = null;
			this.imageLogoPart1Handler = null;
			this.imageLogoPart2 = null;
			this.imageLogoPart2Handler = null;
	},

	create: function() {
			// Apply logo offset
			let logoOffset = 20;

			// Apply the background color
			this.stage.backgroundColor = "#FFFFFF";

			this.imageLogoPart1 = game.add.sprite(0, 0, "imageLogoPart1");
			this.imageLogoPart1.scale.x = 0.7;
			this.imageLogoPart1.scale.y = 0.7;
			this.imageLogoPart1.position.x = game.width / 2 - this.imageLogoPart1.width / 2;
			this.imageLogoPart1.position.y = game.height / 2 - this.imageLogoPart1.height / 2 - logoOffset;
			this.imageLogoPart1.alpha = 0;

			// Apply the logo
			this.imageLogoPart2 = game.add.sprite(0, 0, "imageLogoPart2");
			this.imageLogoPart2.scale.x = 0.7;
			this.imageLogoPart2.scale.y = 0.7;
			this.imageLogoPart2.position.x = game.width / 2 - this.imageLogoPart2.width / 2;
			this.imageLogoPart2.position.y = -this.imageLogoPart2.height + 75;

			// Wait 500ms
			game.time.events.add(500, function() {
					// Gradually show the URL
					this.imageLogoPart1Handler = game.add.tween(game.state.states["Pinball.Splash"].imageLogoPart1).to({
							alpha: 1
					}, 1500, Phaser.Easing.Linear.None, true);
			});

			// Wait 1500ms
			game.time.events.add(1500, function() {
					// Apply the logo to the scene
					this.imageLogoPart2Handler = game.add.tween(game.state.states["Pinball.Splash"].imageLogoPart2).to({
							y: game.height / 2 - game.state.states["Pinball.Splash"].imageLogoPart2.height / 2 - logoOffset
					}, 2000, Phaser.Easing.Quadratic.InOut, true);
			});

			// Wait 4750ms
			game.time.events.add(4750, function() {
					// Start the game
					game.state.start("Pinball.Game", Phaser.Plugin.StateTransition.Out.SlideLeft);
			});
	}
};

Pinball.Game = function(game) {
	this.outlineVertices = [1440, -3687, 1023, -2194, 1345, -1961, 1345, -663, 638, -480, 160, -154, 150, 971, -330, 970, -335, -153, -800, -480, -1519, -619, -1518, -1988, -1147, -2175, -1429, -3152, -1500, -3195, -1492, -3399, -1438, -3867, -1309, -4132, -1112, -4351, -787, -4540, -389, -4670, 139, -4778, 655, -4846, 872, -4837, 1067, -4792, 1236, -4700, 1374, -4584, 1480, -4440, 1557, -4271, 1601, -3992, 1601, -3712, 1600, -171, 1442, -169, 1440, -3687];
	this.launcherVertices = [1401, -500, 1631, -500];
	this.guide1Vertices = [-825, -746, -771, -853, -1280, -1120, -1280, -1759, -1360, -1759, -1360, -959, -825, -746];
	this.guide2Vertices = [663, -743, 614, -855, 1119, -1121, 1123, -1760, 1200, -1759, 1200, -959, 663, -743];
	this.guide3Vertices = [-1116, -1753, -1118, -1277, -838, -1110, -1116, -1753];
	this.guide4Vertices = [671, -1110, 956, -1282, 956, -1762, 671, -1110];
	this.gutterVertices = [-480, 413, 293, 413];
	this.smallCircles = [-1320, -1759, 1160, -1759];
	this.mediumCircles = [-1500, -3132, -866, -3163, -290, -3074, 187, -3415, 614, -3074, -451, -2232, 396, -2242];
	this.largeCircles = [-446, -3704, 309, -4133, 990, -3750];
	this.leftFlipperVertices = [560, 32, 560, -32, 0, -64, 0, 64];
	this.rightFlipperVertices = [0, 64, 0, -64, -560, -32, -560, 32];
	this.ballStart = [15.2016, -30];
	this.PTM = 100; // CONVERSION RATIO FOR VALUES IN ARRAYS ABOVE

	this.pinballBoard = null;
	this.pinballBoardMask = null;

	this.gutterFixture = null;
	this.launcherSprite = null;
	this.launcherFixture = null;
	this.launcherIsMoving = null;
	this.launcherGoingUp = null;
	this.launcherContainer = null;
	this.launcherContainerMask = null;

	this.leftBorderMask = null;
	this.leftBorderSprite = null;
	this.leftBorderLine = null;
	this.leftFlipper = null;
	this.leftBounceMask = null;
	this.leftBounceSprite = null;
	this.leftBounceLine = null;

	this.rightBorderMask = null;
	this.rightBorderSprite = null;
	this.rightBorderLine = null;
	this.rightFlipper = null;
	this.rightBounceMask = null;
	this.rightBounceSprite = null;
	this.rightBounceLine = null;

	this.cursors = null;

	this.scoreBackground = null;
	this.scoreValue = null;
	this.scoreLabel = null;
	this.scoreLabelShadow = null;

	this.highScoreBackground = null;
	this.highScoreIcon = null;
	this.highScoreIconShadow = null;
	this.highScoreLabel = null;
	this.highScoreLabelShadow = null;

	this.soundHandlerOnBackground = null;
	this.soundHandlerOnSprite = null;
	this.soundHandlerOffBackground = null;
	this.soundHandlerOffSprite = null;
	this.soundEnabled = false;

	this.ballBody = null;
	this.ballSprite = null;
	this.gameOver = false;
	this.flipperJoints = [];
	this.mediumCirclesList = [];
	this.mediumCirclesHitList = [];
	this.mediumCirclesGlowList = [];
	this.largeCirclesList = [];
	this.largeCirclesHitList = [];
	this.largeCirclesGlowList = [];

	this.keyA = null;
	this.keyD = null;
	this.buttonANormal = null;
	this.buttonAPressed = null;
	this.buttonAHandler = null;
	this.buttonBNormal = null;
	this.buttonBPressed = null;
	this.buttonBHandler = null;

	this.isMobileDevice = null;

	this.audioPlayer = null;

	// Canvas scaling to size
	function resizeF() {
			let scaleX = window.innerWidth / 335;
			let scaleY = window.innerHeight / 600;
			let scale = Math.min(scaleX, scaleY);
			game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
			game.scale.setUserScale(scale, scale);
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.refresh();
	}

	window.addEventListener("resize", resizeF);
};

Pinball.Game.prototype = {

	init: function() {
			this.pinballBoard = null;
			this.pinballBoardMask = null;

			this.gutterFixture = null;
			this.launcherSprite = null;
			this.launcherFixture = null;
			this.launcherIsMoving = false;
			this.launcherGoingUp = null;
			this.launcherContainer = null;
			this.launcherContainerMask = null;

			this.leftBorderMask = null;
			this.leftBorderSprite = null;
			this.leftBorderLine = null;
			this.leftFlipper = null;
			this.leftBounceMask = null;
			this.leftBounceSprite = null;
			this.leftBounceLine = null;

			this.rightBorderMask = null;
			this.rightBorderSprite = null;
			this.rightBorderLine = null;
			this.rightFlipper = null;
			this.rightBounceMask = null;
			this.rightBounceSprite = null;
			this.rightBounceLine = null;

			this.cursors = null;
			this.scoreBackground = null;
			this.scoreValue = 0;
			this.scoreLabel = null;
			this.scoreLabelShadow = 0;

			this.highScoreBackground = null;
			this.highScoreIcon = null;
			this.highScoreIconShadow = null;
			this.highScoreLabel = null;
			this.highScoreLabelShadow = null;

			this.soundHandlerOnBackground = null;
			this.soundHandlerOnSprite = null;
			this.soundHandlerOffBackground = null;
			this.soundHandlerOffSprite = null;
			this.soundEnabled = false;

			this.ballBody = null;
			this.ballSprite = null;
			this.gameOver = false;
			this.flipperJoints = [];
			this.mediumCirclesList = [];
			this.mediumCirclesHitList = [];
			this.mediumCirclesGlowList = [];
			this.largeCirclesList = [];
			this.largeCirclesHitList = [];
			this.largeCirclesGlowList = [];

			this.keyA = null;
			this.keyD = null;
			this.buttonANormal = null;
			this.buttonAPressed = null;
			this.buttonAHandler = null;
			this.buttonBNormal = null;
			this.buttonBPressed = null;
			this.buttonBHandler = null;

			this.isMobileDevice = null;

			this.audioPlayer = null;
			this.backGroundMusic = null;
	},

	create: function() {
			// See if this game is running on a mobile device
			this.isMobileDevice = isMobileDevice();

			// Apply the game bounds
			game.world.setBounds(-430, -552, 600, 335);

			// Apply background image
			this.add.tileSprite(-170, -555, 600, 835, "imageBackground");

			// Apply the pinball board background mask
			this.pinballBoardMask = game.add.graphics(0, 0);
			this.pinballBoardMask.beginFill(0x000000);
			for (let i = 0; i < this.outlineVertices.length; i = i + 2) {
					if (i == 0) {
							this.pinballBoardMask.moveTo(this.outlineVertices[i] * 0.10 - 0.0000001, this.outlineVertices[i + 1] * 0.10 - 0.0000001);
					}
					this.pinballBoardMask.lineTo(this.outlineVertices[i] * 0.10, this.outlineVertices[i + 1] * 0.10);
			}
			this.pinballBoardMask.endFill();

			// Apply the pinball board background image
			this.pinballBoardImage = this.add.sprite(-150, -540, "imageBoard");
			this.pinballBoardImage.mask = this.pinballBoardMask;

			// Apply the background pinball board background line
			this.pinballBoardLine = game.add.graphics(0, 0);
			this.pinballBoardLine.lineStyle(2.05, 0x343434, 1);
			for (let i = 0; i < this.outlineVertices.length; i = i + 2) {
					if (i == 0) {
							this.pinballBoardLine.moveTo(this.outlineVertices[i] * 0.10 - 0.0000001, this.outlineVertices[i + 1] * 0.10 - 0.0000001);
					}
					this.pinballBoardLine.lineTo(this.outlineVertices[i] * 0.10, this.outlineVertices[i + 1] * 0.10);
			}
			this.pinballBoardLine.endFill();

			// Create the left border mask
			this.leftBorderMask = game.add.graphics(0, 0);
			this.leftBorderMask.beginFill(0xFFFFFF);
			for (let i = 0; i < this.guide1Vertices.length; i = i + 2) {
					if (i == 0) {
							this.leftBorderMask.moveTo(this.guide1Vertices[i] * 0.10 - 0.0000001, this.guide1Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.leftBorderMask.lineTo(this.guide1Vertices[i] * 0.10, this.guide1Vertices[i + 1] * 0.10);
			}
			this.leftBorderMask.endFill();

			// Apply the left border sprite
			this.leftBorderSprite = this.add.sprite(-143, -178, "imageBackground");
			this.leftBorderSprite.mask = this.leftBorderMask;

			// Apply the left border line
			this.leftBorderLine = game.add.graphics(0, 0);
			this.leftBorderLine.lineStyle(2, 0x343434, 1);
			for (let i = 0; i < this.guide1Vertices.length; i = i + 2) {
					if (i == 0) {
							this.leftBorderLine.moveTo(this.guide1Vertices[i] * 0.10 - 0.0000001, this.guide1Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.leftBorderLine.lineTo(this.guide1Vertices[i] * 0.10, this.guide1Vertices[i + 1] * 0.10);
			}

			// Create the right border mask
			this.rightBorderMask = game.add.graphics(0, 0);
			this.rightBorderMask.beginFill(0xFFFFFF);
			for (let i = 0; i < this.guide2Vertices.length; i = i + 2) {
					if (i == 0) {
							this.rightBorderMask.moveTo(this.guide2Vertices[i] * 0.10 - 0.0000001, this.guide2Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.rightBorderMask.lineTo(this.guide2Vertices[i] * 0.10, this.guide2Vertices[i + 1] * 0.10);
			}
			this.rightBorderMask.endFill();

			// Apply the right border sprite
			this.rightBorderSprite = this.add.sprite(-3, -179, "imageBackground");
			this.rightBorderSprite.mask = this.rightBorderMask;

			// Apply the right border line
			this.rightBorderLine = game.add.graphics(0, 0);
			this.rightBorderLine.lineStyle(2, 0x343434, 1);
			for (let i = 0; i < this.guide2Vertices.length; i = i + 2) {
					if (i == 0) {
							this.rightBorderLine.moveTo(this.guide2Vertices[i] * 0.10 - 0.0000001, this.guide2Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.rightBorderLine.lineTo(this.guide2Vertices[i] * 0.10, this.guide2Vertices[i + 1] * 0.10);
			}

			// Create the left bounce mask
			this.leftBounceMask = game.add.graphics(0, 0);
			this.leftBounceMask.beginFill(0xFFFFFF);
			for (let i = 0; i < this.guide3Vertices.length; i = i + 2) {
					if (i == 0) {
							this.leftBounceMask.moveTo(this.guide3Vertices[i] * 0.10 - 0.0000001, this.guide3Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.leftBounceMask.lineTo(this.guide3Vertices[i] * 0.10, this.guide3Vertices[i + 1] * 0.10);
			}
			this.leftBounceMask.endFill();

			// Apply the left bounce sprite
			this.leftBounceSprite = this.add.sprite(-153, -174, "imageBackground");
			this.leftBounceSprite.mask = this.leftBounceMask;

			// Apply the left bounce line
			this.leftBounceLine = game.add.graphics(0, 0);
			this.leftBounceLine.lineStyle(2, 0x343434, 1);
			for (let i = 0; i < this.guide3Vertices.length; i = i + 2) {
					if (i == 0) {
							this.leftBounceLine.moveTo(this.guide3Vertices[i] * 0.10 - 0.0000001, this.guide3Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.leftBounceLine.lineTo(this.guide3Vertices[i] * 0.10, this.guide3Vertices[i + 1] * 0.10);
			}

			// Create the right bounce mask
			this.rightBounceMask = game.add.graphics(0, 0);
			this.rightBounceMask.beginFill(0xFFFFFF);
			for (let i = 0; i < this.guide4Vertices.length; i = i + 2) {
					if (i == 0) {
							this.rightBounceMask.moveTo(this.guide4Vertices[i] * 0.10 - 0.0000001, this.guide4Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.rightBounceMask.lineTo(this.guide4Vertices[i] * 0.10, this.guide4Vertices[i + 1] * 0.10);
			}
			this.rightBounceMask.endFill();

			// Apply the right bounce sprite
			this.rightBounceSprite = this.add.sprite(5, -174, "imageBackground");
			this.rightBounceSprite.mask = this.rightBounceMask;

			// Apply the right bounce line
			this.rightBounceLine = game.add.graphics(0, 0);
			this.rightBounceLine.lineStyle(2, 0x343434, 1);
			for (let i = 0; i < this.guide4Vertices.length; i = i + 2) {
					if (i == 0) {
							this.rightBounceLine.moveTo(this.guide4Vertices[i] * 0.10 - 0.0000001, this.guide4Vertices[i + 1] * 0.10 - 0.0000001);
					}
					this.rightBounceLine.lineTo(this.guide4Vertices[i] * 0.10, this.guide4Vertices[i + 1] * 0.10);
			}

			// Enable Box2d Physics
			game.physics.startSystem(Phaser.Physics.BOX2D);
			game.physics.box2d.ptmRatio = 500;
			game.physics.box2d.gravity.y = 5000; // LARGE GRAVITY TO MAKE SCENE FEEL SMALLER
			game.physics.box2d.friction = 0.1;

			// Create the pinball board
			this.pinballBoard = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);

			// Apply 'bounce-less' pieces
			game.physics.box2d.restitution = 0.1;
			this.pinballBoard.addLoop(this.outlineVertices);
			this.pinballBoard.addLoop(this.guide1Vertices);
			this.pinballBoard.addLoop(this.guide2Vertices);
			this.pinballBoard.addChain(this.guide3Vertices);
			this.pinballBoard.addChain(this.guide4Vertices);

			// Apply the circle restitution
			game.physics.box2d.restitution = 1;

			// Apply the small circles
			for (let i = 0; i < this.smallCircles.length / 2; i++) {
					this.pinballBoard.addCircle(0.35 * this.PTM, this.smallCircles[2 * i + 0], this.smallCircles[2 * i + 1]);
			}

			// Apply the medium circles
			for (let i = 0; i < this.mediumCircles.length / 2; i++) {
					let mediumCircleX = Math.floor(this.mediumCircles[2 * i + 0] * 0.10 - 11.75);
					let mediumCircleY = Math.floor(this.mediumCircles[2 * i + 1] * 0.10 - 11.75);

					// Apply to the circles to the medium circle list
					this.mediumCirclesList[i] = this.pinballBoard.addCircle(1 * this.PTM, this.mediumCircles[2 * i + 0], this.mediumCircles[2 * i + 1]);
					this.mediumCirclesList[i].circleIndex = i;

					// Apply the medium circle shadow
					let tempCircleShadow = this.add.sprite(mediumCircleX + 1, mediumCircleY + 1, "imageMediumCircle");
					tempCircleShadow.tint = 0x343434;
					tempCircleShadow.alpha = 0.8;

					// Apply the medium circle hit sprite
					this.mediumCirclesHitList[i] = game.add.graphics(mediumCircleX, mediumCircleY);
					this.mediumCirclesHitList[i].beginFill(0xFFFF00, 0.5);
					this.mediumCirclesHitList[i].drawCircle(12, 12, 27);
					this.mediumCirclesHitList[i].visible = false;

					// Apply the medium circle sprite
					this.add.sprite(mediumCircleX, mediumCircleY, "imageMediumCircle");

					// Apply the medium circle glow sprite
					this.mediumCirclesGlowList[i] = game.add.graphics(mediumCircleX, mediumCircleY);
					this.mediumCirclesGlowList[i].beginFill(0xFFFFFF, 0.4);
					this.mediumCirclesGlowList[i].drawCircle(12, 12, 24);
					this.mediumCirclesGlowList[i].visible = false;
			}

			// Apply the large circles
			for (let i = 0; i < this.largeCircles.length / 2; i++) {
					let largeCircleX = Math.floor(this.largeCircles[2 * i + 0] * 0.10 - 26.45);
					let largeCircleY = Math.floor(this.largeCircles[2 * i + 1] * 0.10 - 26.45);

					// Apply the circle to the large circle list
					this.largeCirclesList[i] = this.pinballBoard.addCircle(2.8 * this.PTM, this.largeCircles[2 * i + 0], this.largeCircles[2 * i + 1]);
					this.largeCirclesList[i].circleIndex = i;

					// Apply the large circle shadow
					let tempCircleShadow = this.add.sprite(largeCircleX + 1, largeCircleY + 1, "imageLargeCircle");
					tempCircleShadow.tint = 0x343434;

					// Apply the large circle hit sprite
					this.largeCirclesHitList[i] = game.add.graphics(largeCircleX, largeCircleY);
					this.largeCirclesHitList[i].beginFill(0xFFFF00, 0.4);
					this.largeCirclesHitList[i].drawCircle(27.5, 27.5, 58);
					this.largeCirclesHitList[i].visible = false;

					// Apply the large circle sprite
					this.add.sprite(largeCircleX, largeCircleY, "imageLargeCircle");

					// Apply the large circle glow sprite
					this.largeCirclesGlowList[i] = game.add.graphics(largeCircleX, largeCircleY);
					this.largeCirclesGlowList[i].beginFill(0xFFFFFF, 0.5);
					this.largeCirclesGlowList[i].drawCircle(27, 27, 54);
					this.largeCirclesGlowList[i].visible = false;
			}

			// Apply the gutter fixture
			this.gutterFixture = this.pinballBoard.addEdge(this.gutterVertices[0], this.gutterVertices[1], this.gutterVertices[2], this.gutterVertices[3]);
			this.gutterFixture.SetSensor(true);

			// Apply the restitution for the launcher
			game.physics.box2d.restitution = 2.5;
			this.launcherFixture = this.pinballBoard.addEdge(this.launcherVertices[0], this.launcherVertices[1], this.launcherVertices[2], this.launcherVertices[3]);

			// Apply Box2d to the ball body
			game.physics.box2d.restitution = 0.1;
			this.ballBody = new Phaser.Physics.Box2D.Body(this.game, null, this.ballStart[0] * this.PTM, this.ballStart[1] * this.PTM);
			this.ballBody.setCircle(0.64 * this.PTM);
			this.ballBody.bullet = true;

			// Apply a callback when the ball hits the gutter
			this.ballBody.setFixtureContactCallback(this.gutterFixture, function() {
					// Clear the score
					this.updateScore(0);

					// Apply game is over state
					this.gameOver = true;
			}, this);

			// Apply a callback when the ball hits the launcher
			this.ballBody.setFixtureContactCallback(this.launcherFixture, function() {
					// Set the launcher as a moving piece
					this.launcherIsMoving = true;

					// Set launcher as moving up
					this.launcherGoingUp = true;

					// Check if sound is enabled and apply to launcher if it is
					if (this.soundEnabled == true) {
							// Apply launcher sound
							this.audioPlayer = this.add.audio("soundLauncher");
							this.audioPlayer.play();
					}
			}, this);

			// Apply the ball container
			this.launcherContainer = game.add.sprite(148.5, 50, "imageBlock");

			// Apply the ball launcher container mask
			this.launcherContainerMask = game.add.graphics();
			this.launcherContainerMask.beginFill(0xFFFFFF, 1)
			this.launcherContainerMask.drawRect(-5, -150, 16, 82);
			this.launcherContainer.addChild(this.launcherContainerMask);
			this.launcherContainer.mask = this.launcherContainerMask;

			// Apply the ball launcher sprite
			this.launcherSprite = this.add.sprite(0, -100, "imageLauncher");
			this.launcherContainer.addChild(this.launcherSprite);

			// Apply the ball sprite
			this.ballSprite = this.add.sprite(0, 0, "imageBall");

			// Ball sprite should follow the box2d ball body
			this.ballSprite.position.x = this.ballBody.x * 0.10 - 6;
			this.ballSprite.position.y = this.ballBody.y * 0.10 - 6;

			// Loop all the medium circle bumpers in order and apply a callback as the ball hits one of them
			for (let i = 0; i < this.mediumCirclesList.length; i++) {
					// Set the callback and results when the ball hits a medium circle bumper
					this.ballBody.setFixtureContactCallback(this.mediumCirclesList[i], function(a, b, c, d, e) {
							// Check if sound is enabled
							if (this.soundEnabled == true) {
									// Apply hit sound for the bumper
									this.audioPlayer = this.add.audio("soundHit");
									this.audioPlayer.play();
							}

							// Show the medium circle hit sprite
							this.mediumCirclesHitList[d.circleIndex].visible = true;

							// Show the medium circle glow sprite
							this.mediumCirclesGlowList[d.circleIndex].visible = true;

							// Apply 10 points to the score
							this.updateScore(this.scoreValue + 10);

							// Wait for 200 MS
							game.time.events.add(200, function() {
									// Hide away the medium circle hit sprite
									game.state.states["Pinball.Game"].mediumCirclesHitList[d.circleIndex].visible = false;

									// Hide away the medium circle glow sprite
									game.state.states["Pinball.Game"].mediumCirclesGlowList[d.circleIndex].visible = false;
							});
					}, this);
			}

			// Loop all the large circles in order and apply a callback as the ball hits one of them
			for (let i = 0; i < this.largeCirclesList.length; i++) {
					// Set the callback and results when the ball hits a large circle bumper
					this.ballBody.setFixtureContactCallback(this.largeCirclesList[i], function(a, b, c, d, e) {
							// Check if sound is enabled
							if (this.soundEnabled == true) {
									// Apply the hit sound for the bumper
									this.audioPlayer = this.add.audio("soundHitLarge");
									this.audioPlayer.play();
							}

							// Show the large circle hit sprite
							this.largeCirclesHitList[d.circleIndex].visible = true;

							// Show the large circle glow sprite
							this.largeCirclesGlowList[d.circleIndex].visible = true;

							// Add 20 points to the score
							this.updateScore(this.scoreValue + 20);

							// Wait for 200 MS
							game.time.events.add(200, function() {
									// Hide away the large circle hit sprite
									game.state.states["Pinball.Game"].largeCirclesHitList[d.circleIndex].visible = false;

									// Hide away the large circle glow sprite
									game.state.states["Pinball.Game"].largeCirclesGlowList[d.circleIndex].visible = false;
							});
					}, this);
			}

			// Apply the restitution for the flippers
			game.physics.box2d.restitution = 0.1;

			// Apply the left flipper
			this.leftFlipper = new Phaser.Physics.Box2D.Body(this.game, null, -8 * this.PTM, -7.99956 * this.PTM, 2);
			this.leftFlipper.addPolygon(this.leftFlipperVertices);

			// Apply the left flipper sprite
			this.leftFlipperSprite = game.add.graphics(0, 0);
			this.leftFlipperSprite.beginFill(0xFFFFFF);
			this.leftFlipperSprite.lineStyle(2, 0x343434, 1);
			for (let i = 0; i < this.leftFlipperVertices.length; i = i + 2) {
					if (i == 0) {
							this.leftFlipperSprite.moveTo(this.leftFlipperVertices[i] * 0.10 - 0.0000001, this.leftFlipperVertices[i + 1] * 0.10 - 0.0000001);
					}
					this.leftFlipperSprite.lineTo(this.leftFlipperVertices[i] * 0.10, this.leftFlipperVertices[i + 1] * 0.10);
			}
			this.leftFlipperSprite.endFill();
			this.leftFlipperSprite.position.x = this.leftFlipper.x * 0.10;
			this.leftFlipperSprite.position.y = this.leftFlipper.y * 0.10;

			// Apply the right flipper
			this.rightFlipper = new Phaser.Physics.Box2D.Body(this.game, null, 6.4 * this.PTM, -7.99956 * this.PTM, 2);
			this.rightFlipper.addPolygon(this.rightFlipperVertices);

			// Apply the right flipper sprite
			this.rightFlipperSprite = game.add.graphics(0, 0);
			this.rightFlipperSprite.beginFill(0xFFFFFF);
			this.rightFlipperSprite.lineStyle(2, 0x343434, 1);
			for (let i = 0; i < this.rightFlipperVertices.length; i = i + 2) {
					if (i == 0) {
							this.rightFlipperSprite.moveTo(this.rightFlipperVertices[i] * 0.10 - 0.0000001, this.rightFlipperVertices[i + 1] * 0.10 - 0.0000001);
					}
					this.rightFlipperSprite.lineTo(this.rightFlipperVertices[i] * 0.10, this.rightFlipperVertices[i + 1] * 0.10);
			}
			this.rightFlipperSprite.endFill();
			this.rightFlipperSprite.position.x = this.rightFlipper.x * 0.10;
			this.rightFlipperSprite.position.y = this.rightFlipper.y * 0.10;

			// Apply the flipper joints (BODYA, BODYB, AX, AY, BX, BY, MOTORSPEED, MOTORTORQUE, MOTORENABLED, LOWERLIMIT, UPPERLIMIT, LIMITENABLED)
			this.flipperJoints[0] = game.physics.box2d.revoluteJoint(this.pinballBoard, this.leftFlipper, -8 * this.PTM, -7.99956 * this.PTM, 0, 0, 2, 100, false, -25, 25, true);
			this.flipperJoints[1] = game.physics.box2d.revoluteJoint(this.pinballBoard, this.rightFlipper, 6.4 * this.PTM, -7.99956 * this.PTM, 0, 0, 2, 100, false, -25, 25, true);

			// Lower left flipper
			this.leftFlipper.angle = 27;

			// Lower the right flipper
			this.rightFlipper.angle = -27;

			// Apply the score background
			this.scoreBackground = game.add.graphics();
			this.scoreBackground.beginFill(0x000000, 0.7);
			this.scoreBackground.lineStyle(2, 0x383838, 1);
			this.scoreBackground.drawRoundedRect(-155, -540, 113.5, 40, 10);

			// Apply the score label shadow
			this.scoreLabelShadow = game.add.bitmapText(-145, -531.25, "ArialBlackWhite", "0", 27);
			this.scoreLabelShadow.height = 32;
			this.scoreLabelShadow.tint = 0x000000;

			// Apply the score label
			this.scoreLabel = game.add.bitmapText(-148, -533.25, "ArialBlackWhite", "0", 27);
			this.scoreLabel.height = 32;

			// Apply the high score background
			this.highScoreBackground = game.add.graphics();
			this.highScoreBackground.beginFill(0x022C5C, 1);
			this.highScoreBackground.lineStyle(2, 0x0046A9, 1);
			this.highScoreBackground.drawRoundedRect(30.5, -540, 129, 40, 10);

			// Apply the high score icon shadow
			this.highScoreIconShadow = game.add.sprite(39, -531, "imageHighScore");
			this.highScoreIconShadow.tint = 0x000000;

			// Add the high score icon
			this.highScoreIcon = game.add.sprite(37, -533, "imageHighScore");

			// Apply the high score label shadow
			this.highScoreLabelShadow = game.add.bitmapText(69, -531.25, "ArialBlackWhite", this.getHighscore(), 27);
			this.highScoreLabelShadow.height = 32;
			this.highScoreLabelShadow.tint = 0x000000;

			// Add the high score label
			this.highScoreLabel = game.add.bitmapText(66, -533.25, "ArialBlackWhite", this.getHighscore(), 27);
			this.highScoreLabel.height = 32;

			// Add the sound handler on background
			this.soundHandlerOnBackground = game.add.graphics();
			this.soundHandlerOnBackground.beginFill(0x022C5C, 1);
			this.soundHandlerOnBackground.lineStyle(2, 0x0046A9, 1);
			this.soundHandlerOnBackground.drawRoundedRect(-28, -540, 45, 40, 10);
			this.soundHandlerOnBackground.inputEnabled = true;
			this.soundHandlerOnBackground.input.useHandCursor = true;
			this.soundHandlerOnBackground.events.onInputUp.add(function() {
				
					// Show the sound handler off background and icon
					this.soundHandlerOffBackground.visible = true;
					this.soundHandlerOffSprite.visible = true;

					// Hide the sound handler on background and icon
					this.soundHandlerOnBackground.visible = false;
					this.soundHandlerOnSprite.visible = false;

					// Set the sound to disabled
					this.soundEnabled = false;

					// Stop background music
					if (this.soundEnabled == false) {
						this.backGroundMusic.stop();
						// this.backGroundMusic.mute = true;
					}

			}, this);

			// Apply the sound handler on sprite
			this.soundHandlerOnSprite = game.add.sprite(-19, -531.25, "imageSoundOn");

			// Apply the sound handler off the background
			this.soundHandlerOffBackground = game.add.graphics();
			this.soundHandlerOffBackground.beginFill(0x383838, 1);
			this.soundHandlerOffBackground.lineStyle(2, 0x707070, 1);
			this.soundHandlerOffBackground.drawRoundedRect(-28, -540, 45, 40, 10);
			this.soundHandlerOffBackground.inputEnabled = true;
			this.soundHandlerOffBackground.input.useHandCursor = true;
			this.soundHandlerOffBackground.events.onInputUp.add(function() {

					// Show the sound handler on background and icon
					this.soundHandlerOnBackground.visible = true;
					this.soundHandlerOnSprite.visible = true;

					// Hide the sound handler off background and icon
					this.soundHandlerOffBackground.visible = false;
					this.soundHandlerOffSprite.visible = false;

					// Set the sound to enabled
					this.soundEnabled = true;

					// Start background music
					if (this.soundEnabled == true) {
						this.backGroundMusic = this.add.audio("backGroundMusic");
						this.backGroundMusic.loop = true;
						this.backGroundMusic.play();
					}

			}, this);

			// Apply the sound handler to sprite
			this.soundHandlerOffSprite = game.add.sprite(-19, -531.25, "imageSoundOff");

			// Applying the normal A button
			this.buttonANormal = game.add.sprite(-10, 490, "imageButtonANormal");
			this.buttonANormal.fixedToCamera = true;
			this.buttonANormal.tint = 0xAFAFAF;
			this.buttonANormal.scale.set(0.8);

			// Applying the pressed A button
			this.buttonAPressed = game.add.sprite(-10, 490, "imageButtonAPressed");
			this.buttonAPressed.fixedToCamera = true;
			this.buttonAPressed.tint = 0xAFAFAF;
			this.buttonAPressed.scale.set(0.8);
			this.buttonAPressed.visible = false;

			// Applying the A button handler
			this.buttonAHandler = game.add.graphics();
			this.buttonAHandler.beginFill(0x000000, 0);
			this.buttonAHandler.drawRect(-10, 490, 120, 120, 10);
			this.buttonAHandler.isDown = false;
			this.buttonAHandler.inputEnabled = true;
			this.buttonAHandler.fixedToCamera = true;
			this.buttonAHandler.events.onInputDown.add(function() {
					this.buttonAHandler.isDown = true;
					this.buttonANormal.visible = false;
					this.buttonAPressed.visible = true;
					this.update();
			}, this);
			this.buttonAHandler.events.onInputUp.add(function() {
					this.buttonAHandler.isDown = false;
					this.buttonANormal.visible = true;
					this.buttonAPressed.visible = false;
			}, this);

			// Applying the normal B button
			this.buttonBNormal = game.add.sprite(225, 490, "imageButtonBNormal");
			this.buttonBNormal.fixedToCamera = true;
			this.buttonBNormal.tint = 0xAFAFAF;
			this.buttonBNormal.scale.set(0.8);

			// Apply the pressed B button
			this.buttonBPressed = game.add.sprite(225, 490, "imageButtonBPressed");
			this.buttonBPressed.fixedToCamera = true;
			this.buttonBPressed.tint = 0xAFAFAF;
			this.buttonBPressed.scale.set(0.8);
			this.buttonBPressed.visible = false;

			// Apply the B button handler
			this.buttonBHandler = game.add.graphics();
			this.buttonBHandler.beginFill(0x000000, 0);
			this.buttonBHandler.drawRect(225, 490, 120, 120, 10);
			this.buttonBHandler.isDown = false;
			this.buttonBHandler.inputEnabled = true;
			this.buttonBHandler.fixedToCamera = true;
			this.buttonBHandler.events.onInputDown.add(function() {
					this.buttonBHandler.isDown = true;
					this.buttonBNormal.visible = false;
					this.buttonBPressed.visible = true;
					this.update();
			}, this);
			this.buttonBHandler.events.onInputUp.add(function() {
					this.buttonBHandler.isDown = false;
					this.buttonBNormal.visible = true;
					this.buttonBPressed.visible = false;
			}, this);

			// Check if running on a mobile device
			if (this.isMobileDevice == false) {

					// Hide button A
					this.buttonANormal.visible = false;
					this.buttonAPressed.visible = false;
					this.buttonAHandler.visible = false;

					// Hide button B
					this.buttonBNormal.visible = false;
					this.buttonBPressed.visible = false;
					this.buttonBHandler.visible = false;
			}

			// Get the cursor inputs
			this.cursors = game.input.keyboard.createCursorKeys();

			// Apply the 'A' and 'D' keys
			this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
			this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

			// Pause the box2d physics
			game.physics.box2d.pause();

			// Wait for 500 MS
			game.time.events.add(500, function() {
					// Resume the box2d physics
					game.physics.box2d.resume();
			});
	},

	update: function() {
			// Check if the game is over
			if (this.gameOver == true) {
					// Restore the ball starting position (just over the launcher)
					this.ballBody.x = this.ballStart[0] * this.PTM;
					this.ballBody.y = this.ballStart[1] * this.PTM;

					// Zero out the ball velocity
					this.ballBody.velocity.x = 0;
					this.ballBody.velocity.y = 0;
					this.ballBody.angularVelocity = 0;

					// Set that game over is not true
					this.gameOver = false;
			}

			// Ball sprite has to follow the box2d ball body
			this.ballSprite.position.x = this.ballBody.x * 0.10 - 6;
			this.ballSprite.position.y = this.ballBody.y * 0.10 - 6;

			// Left flipper sprite should follow the box2d left flipper
			this.leftFlipperSprite.angle = this.leftFlipper.angle;

			// Right flipper sprite should follow the box2d right flipper
			this.rightFlipperSprite.angle = this.rightFlipper.angle;

			// Check if user is pressing 'left arrow' or 'A' key
			if (this.cursors.left.isDown == true || this.keyA.isDown == true || this.buttonAHandler.isDown == true) {
					// Check if sound is enabled
					if (this.soundEnabled == true) {
							// Check if the left flipper is down
							if (this.flipperJoints[0].m_motorSpeed != -15) {
									// Play the flipper sound
									this.audioPlayer = this.add.audio("soundFlipper");
									this.audioPlayer.play();
							}
					}

					// Enable the left flipper
					this.flipperJoints[0].m_enableMotor = true;

					// Raise the left flipper
					this.flipperJoints[0].SetMotorSpeed(-15);
			} else {
					// Check if the left flipper is lowering
					if (-25 > this.leftFlipper.angle) {
							// Lower the left flipper
							this.flipperJoints[0].SetMotorSpeed(15);
					}
			}

			// Check if user is pressing 'right arrow' or 'D' key
			if (this.cursors.right.isDown == true || this.keyD.isDown == true || this.buttonBHandler.isDown == true) {
					// Check if sound is enabled
					if (this.soundEnabled == true) {
							// Check if the right flipper is down
							if (this.flipperJoints[1].m_motorSpeed != 15) {
									// Play the flipper sound
									this.audioPlayer = this.add.audio("soundFlipper");
									this.audioPlayer.play();
							}
					}

					// Enable the right flipper
					this.flipperJoints[1].m_enableMotor = true;

					// Raise the right flipper
					this.flipperJoints[1].SetMotorSpeed(15);
			} else {
					// Check if right flipper is lowering
					if (25 < this.rightFlipper.angle) {
							// Lower the right flipper
							this.flipperJoints[1].SetMotorSpeed(-15);
					}
			}

			// Check if launcher is moving
			if (this.launcherIsMoving == true) {
					// Check if launcher is going up
					if (this.launcherGoingUp == true) {
							// Move the launcher up
							this.launcherSprite.position.y = this.launcherSprite.position.y - 10;
					} else {
							// Move down the launcher
							this.launcherSprite.position.y = this.launcherSprite.position.y + 10;
					}

					// Check if launcher hits the top limit
					if (this.launcherSprite.position.y <= -160) {
							// Set the launcher as going down
							this.launcherGoingUp = false;
					}
					// Check if the launcher hits the bottom limit
					else if (this.launcherSprite.position.y >= -100) {
							// Set that the launcher will not be moving any more
							this.launcherIsMoving = false;
					}
			}
	},

	render: function() {
			// Check if the game is running in debug mode
			if (Pinball.showDebug == true) {
					// Show the debug layout
					game.debug.box2dWorld();
			}
	},

	updateScore: function(newScore) {
			// Check if the user hits the maximum score possible
			if (newScore > 9999) {
					// Update the user score
					newScore = 9999;
			}

			// Update the score with the new value
			this.scoreValue = newScore;

			// Update the score with the new value
			this.scoreLabel.setText(newScore);

			// Update the score shadow with the new value
			this.scoreLabelShadow.setText(newScore);

			// Check if the current score reaches high score
			if (this.scoreValue > this.getHighscore()) {
					// Set the new score
					this.setHighscore(this.scoreValue);

					// Update the high score with the new value
					this.highScoreLabel.setText(newScore);

					// Update the high score shadow with the new value
					this.highScoreLabelShadow.setText(newScore);
			}
	},

	getHighscore: function() {
			try {
					let name = "highscorepinball";
					let nameEQ = name + "=";
					let ca = document.cookie.split(";");

					for (let i = 0; i < ca.length; i++) {
							let c = ca[i];
							while (c.charAt(0) == " ") {
									c = c.substring(1, c.length);
							}
							if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
					}
			} catch (err) {}

			return "0";
	},

	setHighscore: function(newHighscore) {
			try {
					let name = "highscorepinball";
					let value = newHighscore;
					let days = 999;
					let expires = "";
					if (days) {
							let date = new Date();
							date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
							expires = "; expires=" + date.toUTCString();
					}
					document.cookie = name + "=" + (value || "") + expires + "; Secure; path=/";
			} catch (err) {}
	},

	getCurrentTime: function() {
			return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
	}
};

// Set the default renderer
let rendererMode = Phaser.WEBGL;

// Check if the WebGL renderer is not available
if (isWebGLAvailable() == false) {
	// Change the renderer
	rendererMode = Phaser.CANVAS;
}

// Create the game instance
let config = {
	width: 335,
	height: 600,
	renderer: rendererMode,
	parent: "content",
	disableVisibilityChange: false
};
let game = new Phaser.Game(config);

// Create the game states
game.state.add("Pinball.Preloader", Pinball.Preloader);
game.state.add("Pinball.Splash", Pinball.Splash);
game.state.add("Pinball.Game", Pinball.Game);

// Start the game preloader
game.state.start("Pinball.Preloader");