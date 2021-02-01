
function createStars() {
    const screenWidth = screen.width;
    const screenHeight = screen.height;

    const maxZDepth = 10;
    const starsWidthSpacing = 50;
    const starsHeightSpacing = 50;

    let pts = [];
    var follower = new Pt(); // follows the pointer

    for (let x = 0; x < Math.ceil((screenWidth / starsWidthSpacing)); x++) {
        for (let y = 0; y < Math.ceil((screenHeight / starsHeightSpacing)); y++) {
            const randomOffsetx = (starsWidthSpacing - 10) * Math.random();
            const randomOffsety = (starsHeightSpacing - 10) * Math.random();
            const zDepth = maxZDepth * Math.random();

            const pt = new Pt(x * (starsWidthSpacing) + randomOffsetx, (y * starsHeightSpacing) + randomOffsety, zDepth);
            pt.z = zDepth;
            console.log(zDepth);
            pts.push(pt);
        }
    }

    space.add({
        start: (bound) => {
            for (let i = 0; i < pts.length; i++) {
                space.add(() => form.point(pts[i], maxZDepth - pts[i].z, "circle").fill('#fff').alpha(1 - pts[i].z / maxZDepth));
            }
            // follower = space.center;
        },
        animate: (time, ftime) => {

            // for (let i = 0; i < pts.length; i++) {
            //     pts[i].x += 10 * (pts[i].z / maxZDepth);
            //     if(pts[i].x > 2000)
            //         pts[i].x = -100;
            // }
        },
    });
}