var points;
var dots = [];
var min_dist = -1;
var perm = 0;
var total = factorial(points);
var input, button;
var iter = false;

function setup() {
  createCanvas(1024, 512);
  background(0);
  for (var i = 0; i < points; i++) {
    dots[i] = [random(width), random(height), i];
  }
  input = createInput();
  input.position(1024, 32);
  
  button = createButton('submit');
  button.position(input.x + input.width + 4, input.y);
  button.mousePressed(iterate);
}

function draw() {
  if (iter) {
    perm++;
    var d = 0;
    fill(0);
    noStroke();
    rect(0, 0, width/2, height);
    fill(255);
    stroke(255);
    strokeWeight(2);
    for (var i = 0; i < points; i++) {
      ellipse(dots[i][0], dots[i][1], 8, 8);
      if (i != 0) {
        line(dots[i][0], dots[i][1], dots[i - 1][0], dots[i - 1][1]);
        d += dist(dots[i][0], dots[i][1], dots[i - 1][0], dots[i - 1][1]);
      }
    }
    if (d < min_dist || min_dist == -1) {
      min_dist = d;
      print(min_dist);
      fill(0);
      noStroke();
      rect(width/2, 0, width/2, height);
      fill(255);
      stroke(255);
      strokeWeight(2);
      for (var i = 0; i < points; i++) {
        ellipse(dots[i][0] + width/2, dots[i][1], 8, 8);
        if (i != 0) {
          line(dots[i][0] + width/2, dots[i][1], dots[i - 1][0] + width/2, dots[i - 1][1]);
        }
      }
    }
    
    var max_i = -1;
    for (var i = 0; i < dots.length - 1; i++) {
      if (dots[i][2] < dots[i+1][2]) {
        max_i = i;
      }
    }
    if (max_i == -1) {
      iter = false;
    }
    else {
      var max_j = -1;
      for (var j = 0; j < dots.length; j++) {
        if (dots[max_i][2] < dots[j][2]) {
          max_j = j;
        }
      }
      
      swap(dots, max_i, max_j);
      
      rev(dots, max_i + 1, dots.length - 1);
    }
  }
  fill(255);
  textSize(20);
  text(perm/total, 0, height-8);
}


function swap(a, b, c) {
  var temp = a[b];
  a[b] = a[c];
  a[c] = temp;
}

function rev(d, e, f) {
  for (var i = e; i < (e + f)/2; i++) {
    swap(d, i, f - (i - e));
  }
}

function factorial(n) {
  if (n == 0 || n == 1) {
    return 1;
  }
  else {
    return n * factorial(n-1);
  }
}

function iterate() {
  noLoop();
  loop();
  min_dist = -1;
  points = input.value();
  for (var i = 0; i < points; i++) {
    dots[i] = [random(512), random(height), i];
  }
  iter = true;

}