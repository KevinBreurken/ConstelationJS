const backgroundColor = '#fff';
Pts.namespace(window);


//Create an space..
(function createSpace() {
    var space = new CanvasSpace("#space");
    var form = space.getForm();
    space.setup({
        bgcolor: backgroundColor,
        retina : true,
        resize: true,
        autoResize: true
    });

    space.add(() => form.point(space.pointer, 10));

    space.bindMouse().bindTouch().play();
})();