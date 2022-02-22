let grid;
let next;

const dA = 1;
const dB = 0.5;
const feed = 0.055;
const k = 0.062;
const deltaT = 1;

function setup() {
  createCanvas(200, 200);
  pixelDensity(1);

  grid = [];
  next = [];

  for (let x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (let y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      }
    }
  }

  // for (let i = 100; i < 110; i++) {
  //   for (let j = 100; j < 110; j++) {
  //     grid[i][j].b = 1;
  //   }
  // }

  // for (let i = 30; i < 38; i++) {
  //   for (let j = 59; j < 69; j++) {
  //     grid[i][j].b = 1;
  //   }
  // }

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 200; j++) {
      grid[i][j].b = 1;
    }
  }

}

function draw() {
  background(50);

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      let a = grid[x][y].a;
      let b = grid[x][y].b;

      next[x][y].a = a + (dA * laplaceA(x, y) - a * b * b + feed * (1 - a)) * deltaT;
      next[x][y].b = b + (dB * laplaceB(x, y) + a * b * b - (k + feed) * b) * deltaT;

    }
  }


  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = floor(next[x][y].a * 255);
      pixels[pix + 1] = floor(next[x][y].a * 255);
      pixels[pix + 2] = floor(next[x][y].a * 255);
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();

  swap()
}

function swap() {
  let temp = grid;
  grid = next;
  next = temp;
}

function laplaceA(x, y) {
  let sumA = 0;

  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;

  return sumA;
}

function laplaceB(x, y) {
  let sumB = 0;

  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;

  return sumB;
}
