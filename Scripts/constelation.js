const backgroundColor = '#0D1418';
Pts.namespace(window);
var space = new CanvasSpace("#space");
var form = space.getForm();
createSpace();

//Create an space..
function createSpace() {
    space.setup({
        bgcolor: backgroundColor,
        resize: true,
        autoResize: true
    });


    space.bindMouse().bindTouch().play();
    createStars();
}

function createStars() {
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    const maxZDepth = 10;
    const starsWidthSpacing = 100;
    const starsHeightSpacing = 100;
    const maxStarSize = 10;

    const maxForegroundStars = 10;
    let currentForegroundStarsAmount = 0;
    const foregroundZEnd = 7;

    let pts = [];
    let bigStarPts = [];
    let bigStarMovementNormals = [];

    let constelationLines = [];

    space.add({
        start: (bound) => {
            for (let x = 0; x < Math.ceil((screenWidth / starsWidthSpacing)); x++) {
                for (let y = 0; y < Math.ceil((screenHeight / starsHeightSpacing)); y++) {
                    const randomOffsetx = (starsWidthSpacing - 10) * Math.random();
                    const randomOffsety = (starsHeightSpacing - 10) * Math.random();
                    let zDepth = Math.round(maxZDepth * Math.random());

                    if (currentForegroundStarsAmount == maxForegroundStars) {
                        zDepth = Math.round(3 * Math.random());
                    } else {
                        zDepth = Math.round(10 - (3 * Math.random()));
                    }
                    //Create an point
                    const pt = new Pt(x * (starsWidthSpacing) + randomOffsetx, (y * starsHeightSpacing) + randomOffsety, zDepth, zDepth);
                    if (currentForegroundStarsAmount != maxForegroundStars) {
                        currentForegroundStarsAmount++;
                        bigStarPts.push(pt);
                        bigStarMovementNormals.push([-1 + (2 * Math.random()), -1 + (2 * Math.random())])
                    } else {
                        pts.push(pt);
                        if (pts.length > 10) {
                            constelationLines.push([pt, pts[Math.ceil(pts.length * Math.random())]]);
                        }
                    }
                }
            }

            for (let i = 0; i < pts.length; i++) {
                space.add(() => form.point(pts[i], pts[i].w, "circle").fill('#ffffff').alpha(1));
            }
            for (let i = 0; i < bigStarPts.length; i++) {
                space.add(() => form.point(bigStarPts[i], bigStarPts[i].w, "circle").fill('#ffffff').alpha(1));
            }
        },

        animate: (time, ftime) => {
            for (let i = 0; i < constelationLines.length; i++) {
                form.strokeOnly("#f05", 2).line([constelationLines[i][0], constelationLines[i][1]]);
            }
            form.fillOnly("#123").points(pts, 2, "circle");
            form.fill("#f05").point(pts[0], 10, "circle");
            form.strokeOnly("#f05", 2).line([pts[1], pts[2]]);
            pts[0].y = 100000;
            for (let i = 0; i < pts.length; i++) {
                pts[i].x += (0.1 * (pts[i].z / maxZDepth)) * ftime;
                if (pts[i].x > 2000)
                    pts[i].x = -10;
            }
            for (let i = 0; i < bigStarPts.length; i++) {
                bigStarPts[i].x += (bigStarMovementNormals[i][0] * (bigStarPts[i].z / maxZDepth)) * ftime;
                bigStarPts[i].y += (bigStarMovementNormals[i][1] * (bigStarPts[i].z / maxZDepth)) * ftime;

                if (bigStarPts[i].x > 5000 || bigStarPts[i].x < -5000) {
                    bigStarPts[i].x = 2000 * -bigStarMovementNormals[i][0];
                    bigStarPts[i].y = 2000 * -bigStarMovementNormals[i][1];
                }

                if (bigStarPts[i].y > 5000 || bigStarPts[i].y < -5000) {
                    bigStarPts[i].x = 2000 * -bigStarMovementNormals[i][0];
                    bigStarPts[i].y = 2000 * -bigStarMovementNormals[i][1];
                }
            }
        },
    });
}

function weightedRandom(prob) {
    let i, sum = 0, r = Math.random();
    for (i in prob) {
        sum += prob[i];
        if (r <= sum) return i;
    }
}