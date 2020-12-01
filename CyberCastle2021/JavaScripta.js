function initCanvas(){
    var canvas = document.getElementById("canvasa");
    var ctx = canvas.getContext("2d");
    var backgroundImage = new Image();
    var kanoiaImage = new Image();
    var tankeImage = new Image();
    var baseImage = new Image();
    var baseEnemigaImage = new Image();

    backgroundImage.src = "images/background.jpg";
    kanoiaImage.src = "images/Kañon.jpg";
    tankeImage.src = "images/Tankea.png";
    baseImage.src = "images/Base.png";
    baseEnemigaImage.src = "images/BaseEnegiga.png";

    var canvasWidth = ctx.canvas.width;
    var canvasHeight = ctx.canvas.height;

    var tankeTemplate = function(options){
        return{
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || tankeImage
        }
    }

    var tankeak = [
            new tankeTemplate({id: "Tanke 1", x: 350, y: -70, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 2", x: 330, y: -90, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 3", x: 400, y: -70, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 4", x: 250, y: -95, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 5", x: 460, y: -85, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 6", x: 360, y: -75, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 7", x: 300, y: -60, w: 80, h: 80}),
            new tankeTemplate({id: "Tanke 8", x: 210, y: -95, w: 80, h: 80}),
    ];

    var renderTankeak = function (tankeZerrenda){
        for (var i = 0; i < tankeZerrenda.length; i++){
            console.log(tankeZerrenda[i]);
            ctx.drawImage(tankeZerrenda[i].image, tankeZerrenda[i].x -= .3, tankeZerrenda[i].y, tankeZerrenda[i].w, tankeZerrenda[i].h);
            launcher.tankeakBaseaJo(tankeZerrenda[i]);
        }
    }

    function Launcher(){
        this.y = canvasHeigh*.2-450,
        this.x = 25,
        this.w = 100,
        this.h = 100,
        this.norabidea,
        this.bg = "black",
        this.tiroa = [];

        this.gameStatus = {
            over: false,
            message: "Galdu egin duzu, saiatu berriro!",
            fillStyle: 'green',
            font: 'italic bold 50px Arial, sans-serif',
        }

        this.render = function (){
            if(this.norabidea === "downArrow"){
                this.y+=3;
            }
            else if(this.norabidea === "upArrow"){
                this.y-=3;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10);
            ctx.drawImage(kanoiaImage,this.x,this.y, 25, 450);

            for(var i = 0; i < this.tiroa.length; i++){
                var m = this.tiroa[i];
                ctx.fillRect(m.x-=5, m.y, m.w, m.h);
                this.hitDetect(this.tiroa[i], i);
                if(m.x >= 1000){
                    this.tiroa.splice(i,1);
                }
            }

            if(tankeak.length === 0){
                clearInterval(animateInterval);
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('Zorionak, irabazi egin duzu!!', canvasWidth*.5-80, 50)
            }
        }

        this.tankeaJo = function (m, ti){
            console.log('crush');
            for(var i = 0; i < tankeak.length; i++){
                var t = tankeak[i];
                if(m.x+m.w >= t.x && m.x <= t.x+t.w && m.y >= t.y && m.y <= t.y+t.h){
                    this.tiroa.splice(this.tiroa[ti], 1);
                    tankeak.splice(i, 1);
                }
            }
        }

        this.tankeakBaseaJo = function(Tanke){
            if(Tanke.x < 25){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Tankeak zure basera heldu dira!';
            }
            if(this.gameStatus.over === true){
                clearInterval(animateInterval);
                ctx.fillStyle = this.gameStatus.fillStyle;
                ctx.fillText(this.gameStatus.message, canvasWidth*.5-80, 50);
            }
        }
    }

    var launcher = new Launcher();
    function animate(){
        ctx.clearRect(0,0, canvasWidth, canvasHeigh);
        launcher.render();
        renderTankeak(tankeak);
    }
    var animateInterval = setInterval(animate, 6);

    document.addEventListener('keydown', function(event){
        if(event.keyCode == 38){
            launcher.norabidea = 'upArrow';
            if(launcher.y < canvasHeigh*.2-80){
                launcher.y += 0;
                launcher.norabidea = '';
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if (event.keyCode == 38)
        {
            launcher.norabidea = 'upArrow';
            if(launcher.y < canvasHeigh*.2-80){
                launcher.y += 0;
                launcher.norabidea = '';
            }
        }
    });

    document.addEventListener('keydown', function(event){
        if(event.keyCode == 40)
        {
          launcher.norabidea = 'downArrow';  
         if(launcher.y > canvasHeight - 110){
           launcher.y -= 0;
           launcher.norabidea = '';
          }
        }
   });

   document.addEventListener('keyup', function(event){
        if(event.keyCode == 40)
        {
          launcher.y += 0;
          launcher.norabidea = '';
        }
   });

   document.addEventListener('keydown', function(event){
       if (event.keyCode == 82){
        location.reload();
       }
   });

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.tiroa.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 10});
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
});
