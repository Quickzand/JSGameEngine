class aleph {
    constructor(canvasID, options) {
        this.options = options;
        this.canvas = document.getElementById(canvasID);
        this.init();
    }

    init() {
        this.initOptions();
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.initEvents();
    }

    // Initalizes options from the options object 
    initOptions() {
        if (this.options.fullscreen) {
            if (this.canvas.requestFullScreen)
                this.canvas.requestFullScreen();
            else if (this.canvas.webkitRequestFullScreen)
                this.canvas.webkitRequestFullScreen();
            else if (this.canvas.mozRequestFullScreen)
                this.canvas.mozRequestFullScreen();
        } else {
            this.canvas.width = this.options.width ? this.options.width : 1920;
            this.canvas.height = this.options.height ? this.options.height : 1080;
        }
        this.fps = this.options.fps ? this.options.fps : 60;
    }

    initEvents() {
        this.objects = [];
        this.mainLoop();
    }

    mainLoop() {
        this.update();
        this.draw();
        setTimeout(() => {
            this.mainLoop();
        }, 1000 / this.fps);
    }

    update() {
        this.updateObjects();
    }

    draw() {
        this.clear();
        this.drawObjects();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateObjects() {
        this.objects.forEach(obj => {
            obj.update();
        });
    }


    createGameObject(x, y, w, h, options) {
        let obj = new GameObject(x, y, w, h, options);
        this.objects.push(obj);
        return obj;
    }
}


class gameObject {
    constructor(options, engine) {
        this.options = options;
        this.init();
    }

    init() {
        this.initOptions();
        this.initEvents();
    }

    initOptions() {
        this.x = this.options.x ? this.options.x : 0;
        this.y = this.options.y ? this.options.y : 0;
        this.width = this.options.width ? this.options.width : 0;
        this.height = this.options.height ? this.options.height : 0;
        this.color = this.options.color ? this.options.color : '#000';
        this.image = this.options.image ? this.options.image : null;
        this.imageX = this.options.imageX ? this.options.imageX : 0;
        this.imageY = this.options.imageY ? this.options.imageY : 0;
        this.imageWidth = this.options.imageWidth ? this.options.imageWidth : 0;
        this.imageHeight = this.options.imageHeight ? this.options.imageHeight : 0;
        this.imageScale = this.options.imageScale ? this.options.imageScale : 1;
        this.imageRotation = this.options.imageRotation ? this.options.imageRotation : 0;
        this.imageAlpha = this.options.imageAlpha ? this.options.imageAlpha : 1;
        this.imageFlip = this.options.imageFlip ? this.options.imageFlip : false;
    }

    initEvents() {
        this.events = {};
        this.events.onClick = this.options.onClick ? this.options.onClick : null;
        this.events.onMouseDown = this.options.onMouseDown ? this.options.onMouseDown : null;
        this.events.onMouseUp = this.options.onMouseUp ? this.options.onMouseUp : null;
        this.events.onMouseMove = this.options.onMouseMove ? this.options.onMouseMove : null;
    }

    update() {
        this.draw();
    }

    draw() {
        engine.ctx.fillStyle = this.color;
        engine.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}