/*
 * Definitions
 */
var isTouchDevice = "ontouchstart" in document.documentElement,
    clickStart = isTouchDevice ? "touchstart" : "mousedown",
    clickEnd = isTouchDevice ? "touchend" : "mouseup";
var preload = new createjs.LoadQueue();
var game = {
    lost: false,
    stage: new createjs.Stage("game"),
    face: null,
    initText: new createjs.Text("Click to fart!", "5vw 'Press Start 2P', cursive", "#FAFAFA"),
    lostText:  new createjs.Text("You lost! :(", "5vw 'Press Start 2P', cursive", "#FAFAFA"),
    restartText: new createjs.Text("Click to restart", "4vw 'Press Start 2P', cursive", "#FAFAFA"),
    pitchfork: null,
    sounds: ["groan", "fart"],
    pressure: new createjs.Shape(),
    timer: new createjs.Text("1", "4vw 'Press Start 2P', cursive", "#FAFAFA")
};

/*
 * Initialization functions
*/

function setUpPitchfork () {
    game.pitchfork = new createjs.Bitmap(preload.getResult("pitchfork"));
    game.stage.addChild(game.pitchfork);
    game.pitchfork.scaleX = 1.5;
    game.pitchfork.x = center(game.pitchfork, "x");
    game.pitchfork.y = center(game.pitchfork, "y") * 2;
};

function setUpFace () {
    game.face = new createjs.Bitmap(preload.getResult("o-face"));
    game.face.scaleX = 2;
    game.face.scaleY = 2;
    game.stage.addChild(game.face);
    game.face.x = center(game.face, "x");
};

function setUpPressureBar () {
    game.pressureColor = game.pressure.graphics.f("#8BC34A").command;
    game.pressure.graphics
	.r(0, 0, 20, game.stage.canvas.height);
    game.pressure.x = 20;
    game.pressure.scaleY = 0.5;
    game.pressure.rotation = -180;
    game.pressure.y = game.stage.canvas.height;
    game.stage.addChild(game.pressure);
};

function setUpTimer() {
    game.stage.addChild(game.timer);
    var timer_bounds = game.timer.getTransformedBounds();
    game.timer.y = game.stage.canvas.height - timer_bounds['height'];
    game.timer.x = game.stage.canvas.width - timer_bounds['width'];
    game.timer.seconds = 1;
    game.timer_id = window.setInterval(function () {
	game.timer.seconds += 1;
	if (game.timer.seconds > 9) {
	    game.timer.x = game.stage.canvas.width - timer_bounds['width'];
	}
	game.timer.text = game.timer.seconds;
    }, 1000);
}

function setUpLostText () {
    game.lostText.x = center(game.lostText, "x");
    game.lostText.y = game.lostText.getTransformedBounds()["height"];
    game.stage.addChild(game.lostText);
    game.restartText.y = game.stage.canvas.height / 4;
    game.restartText.x = center(game.restartText, "x");
    game.stage.addChild(game.restartText);
    document.addEventListener(clickStart, startGame);
};

function setUpInitText() {
    game.initText.x = center(game.initText, "x");
    game.initText.y = center(game.initText, "y");
    game.stage.addChild(game.initText);
    game.stage.update();
}

function setUpSounds () {
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound("resources/fart.mp3", "fart");
    createjs.Sound.registerSound("resources/groan.mp3", "groan");
};

function setUpEntities() {
    setUpTimer();
    setUpFace();
    setUpPitchfork();
    setUpPressureBar();
    game.stage.update();
};

function setUp () {
    var loading = document.getElementById("loading");
    if (loading) {
	loading.remove();
    }
    setUpEntities();
    setUpSounds();
    document.addEventListener(clickStart, fart);
    document.addEventListener(clickEnd, postFart);
    createjs.Ticker.addEventListener("tick", update);
};

function init () {
    resizeCanvas();
    var initTextTimeout = 1500;
    setUpInitText();
    window.setTimeout(function () {
	game.stage.removeChild(game.initText);
	game.stage.update();
    }, 1500);
    setUp();
};

function reset () {
    document.removeEventListener(clickStart, startGame);
    game.stage.removeAllChildren();
    game.lost = false;
    game.stage.update();
};
function startGame () {
    reset();
    init();
};

function loadAllTheThings() {
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", startGame);
    preload.loadManifest([
	{src: "resources/pitchfork.png", id: 'pitchfork'},
	{src: "resources/trump-o.png", id: 'o-face'},
	{src: "resources/trump-x.png", id: 'x-face'},
	{src: "resources/trump-face.png", id: 'f-face'},
	{src: "resources/fart.mp3", id: 'fart'},
	{src: "resources/groan.mp3", id: 'groan'}
    ]);
};

window.onload = loadAllTheThings;


/*
 * Update Functions
*/

function updateFace() {
    game.face.y += 9.8;
};

function checkEndConditions () {
    if (game.face.y > game.stage.canvas.height
	|| collides(game.face.getTransformedBounds(),
		    game.pitchfork.getTransformedBounds(), -20)
	|| game.pressure.scaleY >= 1
       ) {
	game.lost = true;
    }
}

function updatePitchfork () {
    if (game.pitchfork.y <= game.stage.canvas.height - (game.stage.canvas.height / 3)) {
	game.pitchfork.fall = true;
    } else if (game.pitchfork.y >= game.stage.canvas.height) {
	game.pitchfork.fall = false;
    }
    if (game.pitchfork.fall) {
	game.pitchfork.y += 20;
    } else {
	game.pitchfork.y -= 20;
    }

};

function updatePressureColor() {
    var pressureColors = [
	[0.9, "#F44336"],
	[0.75, "#33691E"],
	[0.5, "#8BC34A"],
	[0.25, "#C5E1A5"],
	[0.1, "#DCEDC8"],
	[0, "#F1F8E9"]
    ];
    for (var key_color of pressureColors) {
	if (game.pressure.scaleY >= key_color[0]) {
	    game.pressureColor.style = key_color[1];
	    break;
	}
    }
}

function increasePressure() {
    var pressureIncrease = 0.015;
    if (game.pressure.scaleY + pressureIncrease < 1 + pressureIncrease) {
	game.pressure.scaleY += pressureIncrease;
    }
}

function updateProgress() {
    updatePressureColor();
    increasePressure();
}
function updateEntities() {
    updateFace();
    checkEndConditions();
    updatePitchfork();
    updateProgress();
};

function lose () {
    createjs.Ticker.removeEventListener("tick", update);
    document.removeEventListener(clickStart, fart);
    document.removeEventListener(clickEnd, postFart);
    game.stage.update();
    window.clearInterval(game.timer_id);
    setUpLostText();
    game.face.image = preload.getResult("x-face");
    game.stage.update();
}

function update () {
    if (game.lost) {
	lose();
    }  else {
	updateEntities();
    }
    game.stage.update();
}

/*
 * Listeners
*/

window.addEventListener('resize', resizeCanvas, false);

function fart () {
    var pressureDecrease = 0.2;
    var fartLift = 100;
    if (game.pressure.scaleY - pressureDecrease > 0 && game.face.y - 30 > 0) {
	game.face.y -= fartLift;
	game.pressure.scaleY -= pressureDecrease;
	game.face.image = preload.getResult("f-face");
	createjs.Sound.play(_.sample(game.sounds));
    }
    game.stage.update();
}


function postFart () {
    game.face.image = preload.getResult("o-face");
    game.stage.update();
};


/*
 * Helper functions
*/

function collides(a, b, padding) {
    var padding = padding || 0;
    if (a.x >= b.x + b.width + padding
	|| a.x + b.width + padding <= b.x
	|| a.y >= b.y + b.height + padding
	|| a.y + a.height + padding <= b.y) {
	return false;
    }
    return true;
};

function resizeCanvas() {
    game.stage.canvas.width = window.innerWidth;
    game.stage.canvas.height = window.innerHeight;
}

function center (el, axis) {
    var dimension = axis == "x" ? "width" : "height";
    return (game.stage.canvas[dimension]
	    - el.getTransformedBounds()[dimension]) / 2;
}
