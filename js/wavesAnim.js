$(function () {

        //window Height and Width
        var windowHeight = window.innerHeight;    
        var windowWidth = window.innerWidth;

        //dynamic Canvas class declaration
        var dynamicCanvas = fabric.util.createClass(fabric.Canvas, {
          initialize: function(c, winWidth, winHeight){
            this.callSuper('initialize', c);
            this.setWidth(winWidth);
            this.setHeight(winHeight);
          },
        });//end of dynamicCanvas class declaration

        //instance of dynamicCanvas
        var canvas = new dynamicCanvas('canvas', windowWidth, windowHeight, {
                backgroundColor: 'rgb(200, 247, 250)'
            });

        var canHeight = canvas.getHeight();
        var canWidth = canvas.getWidth();

        //calculate midpoint of canvas
        var midPoint = canHeight / 2;
        var bottomThirds = midPoint / 3;
        var bottomTwoThirds = bottomThirds * 2;
        var sandTop = midPoint + bottomTwoThirds;

        var oceanBottomThird = bottomTwoThirds /3;
        var wavesTop = sandTop - oceanBottomThird;
        var wavesHeight = bottomTwoThirds / 3;

        //calculate when 2nd wave appears
        var rectOceanTenths = bottomTwoThirds / 5;
        var rectOceanNineTenths = rectOceanTenths * 9;
        var secondWaveTrigger = sandTop - rectOceanTenths;

        //custom rectangle class declaration
        var customRect = fabric.util.createClass(fabric.Rect, {
          initialize: function(top, height, fill){
            this.callSuper('initialize');
            this.top = top || 0;
            this.left = 0;
            this.height = height || 100;
            this.width = canWidth;
            this.hasControls = false;
            this.hasBorders = false;
            this.selectable = false;
            this.fill = fill || 'rgb(55, 55, 55)';
            
          },

          //animateRect: function() {
            //console.log(this.top);
              //fabric.util.animate({
                //startValue: this.top,
                //endValue: this.top+50,
                //duration: 1000,
                //onChange: function() {
                  //this.top = wavesTop;
                  // only render once
                  
                  //canvas.renderAll();
                  //} 
                //}) 

          //},//end animateRect function

        })//end custom rectangle class declaration


        //instances of custom rectangle class
        var rectBackground = new customRect(0, canHeight, 'rgb(137, 207, 240)');

        var rectOcean = new customRect(midPoint, bottomTwoThirds, 'rgb(120, 182, 164)');

        var rectSand = new customRect(sandTop, bottomThirds, 'rgb(235, 217, 178)');

        var rectWaves = new customRect(wavesTop, wavesHeight, 'rgb(50, 217, 178)');
        rectWaves.setOpacity(0);

        var rectInvisWaves = new customRect(wavesTop, wavesHeight, 'rgb(50, 217, 178)');
        rectInvisWaves.setOpacity(0);
        rectInvisWaves.setVisible(false);

        var rectInvisWavesTwo = new customRect(wavesTop, wavesHeight, 'rgb(50, 217, 178)');
        rectInvisWavesTwo.setOpacity(0);
        rectInvisWavesTwo.setVisible(false);

        rectOcean.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rectOcean.height / 2,
            colorStops: {
                0: 'rgb(120, 182, 164)',
                1: 'rgb(160,235,203)'
            }
        });

            rectSand.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rectOcean.height / 2,
            colorStops: {
                0: 'rgb(184, 162, 129)',
                0.4: 'rgb(235, 217, 178)',
                0.5: 'rgb(235, 217, 178)',
                1: 'rgb(235, 217, 178)'
            }
        });

            rectBackground.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rectBackground.height / 2,
            colorStops: {
                0: 'rgb(119, 195, 253)',
                0.3: 'rgb(143, 207, 255)',
                1: 'rgb(188, 223, 249)'
            }
          });

            rectWaves.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rectWaves.height / 2,
            colorStops: {
                0: 'rgb(255, 255, 255)',
                0.3: 'rgba(255, 255, 255, 0.5)',
                1: 'rgba(160, 235, 203, 0)'
            }
        });
            rectInvisWaves.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rectWaves.height / 2,
            colorStops: {
                0: 'rgb(0, 255, 255)',
                0.3: 'rgba(255, 255, 255, 0.5)',
                1: 'rgba(160, 235, 203, 0)'
            }
        });
            rectInvisWavesTwo.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: rectWaves.height / 2,
            colorStops: {
                0: 'rgb(255, 0, 255)',
                0.3: 'rgba(255, 255, 255, 0.5)',
                1: 'rgba(160, 235, 203, 0)'
            }
        });

     
      function changeOpacity(){
        rectInvisWaves.setOpacity(1);
        canvas.renderAll();
        console.log("changeOpacity");
      }//end changeOpacity()

      

     function animateWaves(){
      if(rectWaves.getTop() < rectSand.getTop() && rectWaves.getVisible() == true){
        console.log('first if triggered');
        rectWaves.animate('opacity', 1, {
          onComplete:function(){
            rectWaves.setTop(rectWaves.getTop() + .5);
            console.log(rectWaves.getTop());
          }
        });
        
        }
        else if(rectWaves.getTop() >= rectSand.getTop()){
        console.log('first else if triggered');
        //setInterval(animateOpacity(rectWaves), 100);
        rectWaves.animate('opacity', 0,{
          onComplete:function(){
            rectWaves.setTop(wavesTop);
            //rectWaves.setOpacity(0);
          }
        });

        }//end first if and else if

      /*if(rectWaves.getTop() >= secondWaveTrigger && rectInvisWaves.getTop() < rectSand.getTop()){
          console.log('second if triggered');
          rectInvisWaves.setVisible(true);
          rectInvisWaves.animate('opacity', 1,{
          onComplete:function(){
           rectInvisWaves.setTop(rectInvisWaves.getTop() + .5);
           console.log('second wave should move now');
           }  
          });
        } else if(rectInvisWaves.getTop() >= rectSand.getTop()){
            console.log('second else if triggered');
            rectInvisWaves.animate('opacity',0,{
              onComplete:function(){
                //rectWaves.setVisible(false);
                rectWaves.setTop(wavesTop);
                //rectWaves.setVisible(true);
              }
            });
          }
        if(rectInvisWaves.getTop() >= secondWaveTrigger && rectInvisWavesTwo.getTop() < rectSand.getTop()){
          console.log('third if triggered');
          rectInvisWavesTwo.setVisible(true);
          rectInvisWavesTwo.animate('opacity', 1,{
          onComplete:function(){
           rectInvisWavesTwo.setTop(rectInvisWavesTwo.getTop() + .5);
           }  
          });
        }else if(rectInvisWavesTwo.getTop() >= rectSand.getTop()){
            console.log('third else if triggered');
            rectInvisWavesTwo.animate('opacity',0,{
              onComplete:function(){
                rectInvisWaves.setVisible(false);
                rectInvisWaves.setTop(wavesTop);
                //rectWaves.setVisible(true);
              }
            });
          }
          /*if(rectInvisWavesTwo.getTop() >= secondWaveTrigger){
            console.log("fourth trigger");
            //rectWaves.setVisible(true);
          }*/


        
      /*if(rectInvisWaves.getTop() < rectSand.getTop() && rectInvisWaves.getVisible() == true){
        rectInvisWaves.animate('opacity', 1,{
          onComplete:function(){
           rectInvisWaves.setTop(rectInvisWaves.getTop() + .5); 
          }
        });

      }*/
      canvas.renderAll();
     }//end animateWaves()

     

      canvas.add(rectBackground, rectOcean, rectSand, rectWaves, rectInvisWaves, rectInvisWavesTwo);

      var startAnim = setInterval(animateWaves, 100);
      //var test = setInterval(animateOpacity(rectWaves), 8000);
      //animateWaves();


      });//end of function ready
