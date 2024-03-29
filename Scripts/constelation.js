//Space
const backgroundColor = '#0D1418';
Pts.namespace(window);
var space = new CanvasSpace("#space");
var form = space.getForm();
// attach handler to the click event of the document
if (document.attachEvent) document.attachEvent('onclick', handler);
else document.addEventListener('mousemove', handler);

const screenWidth = screen.width;
const screenHeight = screen.height;

createSpace();
//Create an space..
function createSpace() {
    space.setup({
        bgcolor: backgroundColor,
        resize: true,
        autoResize: true
    });

    createStars();
    space.bindMouse().bindTouch().play();
}

function createStars() {

    let maxZDepth = 10;
    const starsWidthSpacing = 80;
    const starsHeightSpacing = 80;

    const maxForegroundStars = 5;

    let backgroundStars = [];
    let foregroundStars = [];


    space.add({
        start: (bound) => {
            //Generate small stars
            for (let x = 0; x < Math.ceil((screenWidth / starsWidthSpacing)); x++) {
                for (let y = 0; y < Math.ceil((screenHeight / starsHeightSpacing)); y++) {
                    const randomOffsetx = (starsWidthSpacing - 10) * Math.random();
                    const randomOffsety = (starsHeightSpacing - 10) * Math.random();
                    const zDepth = Math.round(4* Math.random());

                    //Create an point
                    const bgStar = new BackgroundStar(x * (starsWidthSpacing) + randomOffsetx, (y * starsHeightSpacing) + randomOffsety, zDepth, zDepth);
                    backgroundStars.push(bgStar);

                    // if (pts.length > 10) {
                    //     constelationLines.push([pt, pts[Math.ceil(pts.length * Math.random())]]);
                    // }
                }
            }

            //Generate foreground stars
            for (let x = 0; x < maxForegroundStars; x++) {
                const randomOffsetx = screenWidth * Math.random();
                const randomOffsety = screenHeight * Math.random();
                const zDepth = Math.round(2 + (2 * Math.random()));

                //Create an point
                const fgStar = new ForegroundStar(randomOffsetx, randomOffsety, zDepth, zDepth);
                fgStar.setMovementDirection(-1 + (2 * Math.random()), -1 + (2 * Math.random()));
                foregroundStars.push(fgStar);
            }
        },

        animate: (time, ftime) => {

            //Render lines
            // for (let i = 0; i < constelationLines.length; i++) {
            //     form.strokeOnly("#f05", 2).line([constelationLines[i][0], constelationLines[i][1]]);
            // }
            backgroundStars[0].setPosition(0, -100); // hides the Wtf red circle
            for (let i = 0; i < backgroundStars.length; i++) {
                backgroundStars[i].animate(time, ftime);
            }
            for (let i = 0; i < foregroundStars.length; i++) {
                foregroundStars[i].animate(time, ftime);
            }
        },
    });
}

let posDifX;

let posDifY;

class BackgroundStar {

    constructor(x, y, z, w) {
        const starColor = '#ffffff';

        this.Pt = new Pt(x, y, z, w);
        space.add(() => form.point(this.Pt, this.Pt.w * 0.7, "circle").fill(starColor).stroke(starColor).alpha(0.9));
    }
    
    animate(time, ftime) {
        this.Pt.x += (0.1 * (this.Pt.z / 10) * posDifX) * ftime;
        this.Pt.y += (0.1 * (this.Pt.z / 10) * posDifY) * ftime;

        if (this.Pt.x > 2000)
            this.Pt.x = -10;
        if (this.Pt.x < -10) {
            this.Pt.x = 2000;
        }
        if (this.Pt.y > 1080)
            this.Pt.y = -10;
        if (this.Pt.y < -10) {
            this.Pt.y = 1080;
        }
    }

    setPosition(x, y) {
        this.Pt.x = x;
        this.Pt.y = y;
    }
}

class ForegroundStar {

    constructor(x, y, z, w) {
        const starColor = '#ffffff';
        const starBorder = '#ffd200';
        const starTransparency = 0.9;

        this.Pt = new Pt(x, y, z, w);
        this.movementDirectionX = 0;
        this.movementDirectionY = 0;
        space.add(() => form.point(this.Pt, this.Pt.w, "circle").fill(starColor).stroke(starBorder).alpha(starTransparency));
    }

    animate(time, ftime) {
        //Default movement vector
        this.Pt.x += (0.1 * (this.Pt.z / 10) * posDifX) * ftime;
        this.Pt.y += (0.1 * (this.Pt.z / 10) * posDifY) * ftime;
        //Add
        this.Pt.x += (0.1 *  (this.movementDirectionX * (this.Pt.z / 10))) * ftime;
        this.Pt.y += (0.1 *  (this.movementDirectionY * (this.Pt.z / 10))) * ftime;
        // this.Pt.x += (this.movementDirectionX * (this.Pt.z / 10))* posDifX * ftime;
        // this.Pt.y += (this.movementDirectionY * (this.Pt.z / 10))* posDifY * ftime;

        if (this.Pt.x > 2000)
            this.Pt.x = -10;
        if (this.Pt.x < -10) {
            this.Pt.x = 2000;
        }
        if (this.Pt.y > 1080)
            this.Pt.y = -10;
        if (this.Pt.y < -10) {
            this.Pt.y = 1080;
        }
    }

    setPosition(x, y) {
        this.Pt.x = x;
        this.Pt.y = y;
    }

    setMovementDirection(x, y) {
        this.movementDirectionX = x;
        this.movementDirectionY = y;
    }
}

posDifX = (-1 + (2 * Math.random()));
posDifY = (-1 + (2 * Math.random()));

function handler(e) {

    var pageX = e.pageX;
    var pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    //posDif = Math.hypot((screenWidth / 2) - pageX, (screenHeight / 2) - pageY);
    if (mouseDown > 0) {
        posDifX = lerp(posDifX, -((screenWidth / 2) - pageX) * 0.1, 0.1);
        posDifY = lerp(posDifY, -((screenHeight / 2) - pageY) * 0.1, 0.1);
    }
    // console.log(posDif);
}

var mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = 1;
}
document.body.onmouseup = function () {
    mouseDown = 0;
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}