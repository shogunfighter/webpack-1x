import _ from "lodash"; //Loaded from default "node_modules"
import $ from "jquery"; //Loaded from default "node_modules"

let MathJax = require("MathJax"); //Loaded from external CDN

let createjs = require('../custom/createjs/createjs-loader!../../bower_components/EaselJS/lib/easeljs-0.8.2.combined');
    createjs = require('../custom/createjs/createjs-loader!../../bower_components/TweenJS/lib/tweenjs-0.6.2.combined');

let loadedModules = [];
let logs = document.getElementById("logs");
let logString = "";


let CANVAS = {};

if (typeof _ !== "undefined") {
    loadedModules.push("_");
}

if (typeof $ !== "undefined") {
    loadedModules.push("$");
}

if (typeof createjs !== "undefined") {
    loadedModules.push("createjs");
    CANVAS.stage = new createjs.Stage('stage');
    let circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;

    CANVAS.stage.addChild(circle);
    CANVAS.stage.update();

    createjs.Touch.enable(CANVAS.stage);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", CANVAS.stage);

}

_.each(loadedModules, function (v) {
    logString += v + " is supported.\n";
});

logs.innerText = logString;


$("button").on("click", function (e) {
    console.log(createjs);

    //alert("There are " + CANVAS.stage.numChildren + "objects in the canvas.");
    ////for(let ctr=0; ctr<CANVAS.stage.numChildren; ctr++){
    ////
    ////}
    //

    let t = CANVAS.stage.getChildAt(0);

    console.log(t);


    t.alpha = 0;
    CANVAS.stage.update();
    createjs.Tween.get(t).to({alpha:1}, 1000).call(function(){alert("completed!"); CANVAS.stage.update(); });

});


if (typeof MathJax !== "undefined") {
    console.log("MathJax:",MathJax);

    MathJax.Hub.Queue(["Typeset", MathJax.Hub])
}


//
//
//let mjconfig = `<script type="text/x-mathjax-config">
//    MathJax.Hub.Config({
//        jax: ["input/MathML","output/HTML-CSS"],
//        extensions: ["mml2jax.js"],
//        skipStartupTypeset: true,
//        messageStyle: "none",
//        "HTML-CSS": {
//            showMathMenu: true
//        }
//    })
//
//    MathJax.Hub.Configured()
//</script>`;
//

//let headTag = document.getElementsByTagName("head")[0];
//
//let jqTag = document.createElement("script");
//    jqTag.type = "text/x-mathjax-config";
//    jqTag.src = "./bower_components/MathJax/MathJax.js";
//    jqTag.onload = function() {
//        alert("Script loaded and ready");
//    };
//
//let jqTag = document.createElement("script");
//    jqTag.type = "text/javascript";
//    jqTag.src = "./bower_components/MathJax/MathJax.js";
//    jqTag.onload = function() {
//        alert("Script loaded and ready");
//    };
//
//headTag.appendChild(mjconfig);
//headTag.appendChild(jqTag);






//// a simple TeX-input example
//var mjAPI = require("mathjax-node/lib/mj-single.js");
//mjAPI.config({
//    MathJax: {
//        // traditional MathJax configuration
//    }
//});
//mjAPI.start();
//
//var yourMath = 'E = mc^2';
//
//mjAPI.typeset({
//    math: yourMath,
//    format: "TeX", // "inline-TeX", "MathML"
//    mml:true, //  svg:true,
//}, function (data) {
//    if (!data.errors) {console.log(data.mml)}
//});