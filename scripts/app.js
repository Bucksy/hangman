// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var HuenExample;
(function (HuenExample) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            if (window.cordova) {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            else {
                onDeviceReady();
            }
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            var mygame = new Huen.MyPhaserGame();
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = HuenExample.Application || (HuenExample.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(HuenExample || (HuenExample = {}));
var Huen;
(function (Huen) {
    var MyPhaserGame = (function () {
        function MyPhaserGame() {
            this.game = new Phaser.Game(800, 600, Phaser.CANVAS, "game", { preload: this.preload, create: this.create, update: this.update, render: this.render });
        }
        MyPhaserGame.prototype.create = function () {
            //this.myGroup = this.game.add.group()
            this.myGroup = new Phaser.Group(this.game);
            //var myGraphics = this.game.add.graphics(120, 20, this.myGroup);
            var myGraphics = this.game.add.graphics(120, 20, this.myGroup);
            myGraphics.lineStyle(2, 0xFF0000, 1);
            myGraphics.drawRect(0, 0, 50, 50);
            var myGraphics2 = this.game.add.graphics(20, 120, this.myGroup);
            myGraphics2.lineStyle(2, 0x0FF000, 1);
            myGraphics2.drawRect(0, 0, 50, 50);
            this.myGroup.angle = 45;
            this.myGroup.x = 200;
            this.myGroup.y = 200;
        };
        MyPhaserGame.prototype.update = function () {
            this.myGroup.angle += 1;
            var child = this.myGroup.getChildAt(0);
            child.visible = this.myGroup.angle > 180;
        };
        MyPhaserGame.prototype.render = function () {
        };
        MyPhaserGame.prototype.preload = function () {
        };
        return MyPhaserGame;
    }());
    Huen.MyPhaserGame = MyPhaserGame;
})(Huen || (Huen = {}));
//# sourceMappingURL=app.js.map