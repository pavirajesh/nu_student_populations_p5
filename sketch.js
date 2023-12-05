let years = ["2018", "2019", "2020", "2021", "2022"];
let tables = [];

function setup() {
    createCanvas(1150, 1550);
    textFont('lato');
    textStyle(BOLD);
}

function preload() {
  for (let year of years) {
    let table = loadTable('datasets/NU_Data' + year + '.csv', 'csv', 'header');
    tables.push(table);
  }
}

function drawSquare(x, y, size, radius, textValue, dataValue, textSizeValue, strokeColor) {
    stroke(strokeColor);
    strokeWeight(10);
    square(x, y, size, radius);
    textAlign(CENTER, CENTER);
    textSize(textSizeValue);
    noStroke();
    text(textValue, x + size / 2, y + size / 2);

  if (
    mouseX > x &&
    mouseX < x + size &&
    mouseY > y &&
    mouseY < y + size &&
    mouseIsPressed
  ) {
    revealValueSquare(x, y, size, radius, dataValue, textSizeValue);
  }
}

function revealValueSquare(x, y, size, radius, value, textSizeValue) {
  textAlign(CENTER, BOTTOM);
  textSize(textSizeValue);
  text(value, x + size / 2, y + size / 3);
}

function drawRect(x, y, width, height, textValue, dataValue, textSizeValue, strokeColor) {
  let college = add_line_break(textValue);

  stroke(college.color);
  strokeWeight(5);
  rect(x, y, width, height);
  textAlign(CENTER, CENTER);
  textSize(textSizeValue);
  noStroke();
  text(college.text, x + width / 2, y + height / 2);

  if (
    mouseX > x &&
    mouseX < x + width &&
    mouseY > y &&
    mouseY < y + height &&
    mouseIsPressed
  ) {
    revealValueRect(x, y, width, height, dataValue, textSizeValue);
  }
}

function revealValueRect(x, y, width, height, value, textSizeValue) {
  textAlign(CENTER, CENTER);
  textSize(textSizeValue);
  text(value, x + width / 2, y + height / 4.5);
}

function draw() {
  background(0);
  let num_year = 0;
  let x_square_val = 30;
  let x_rect_val = 30;

  for (let table of tables) {

    let total_pop = table.getString(table.getRowCount() - 1, 1) + " Students";
    drawSquare(x_square_val, 20, 200, 30, years[num_year], total_pop, 20, 'red');

    x_square_val = x_square_val + 220;
    let y = 750;
    let c = 0;

    for (let r = 0; r < table.getRowCount() - 1; r++) {
      let value = table.getString(r, c);
      let pop = table.getString(r, c + 1) + " Students";

      if (r == 0) {
        drawRect(x_rect_val, 240, 200, 190, value, pop, 18, '');
      } else if (r == 1) {
        drawRect(x_rect_val, 440, 200, 160, value, pop, 18, '');
      } else if (r == 2) {
        drawRect(x_rect_val, 610, 200, 130, value, pop, 18, '');
      } else {
        drawRect(x_rect_val, y, 200, 100, value, pop, 15, '');
        y = y + 110;
      }
    }
    x_rect_val = x_rect_val + 220;
    num_year++;
  }
}

function add_line_break(value) {
  let strokeColor = '';
    
if (value == "College of Engineering") {
    value = "College of\nEngineering";
    strokeColor = '#2A6041';
} else if (value == "College of Professional Studies") {
    value = "College of\nProfessional Studies";
    strokeColor = '#9CB380';
} else if (value == "DAmore-McKim School of Business") {
    value = "D'Amore-McKim\nSchool of Business";
    strokeColor = '#D4E09B';
} else if (value == "Khoury College of Computer Sciences") {
    value = "Khoury College of\nComputer Sciences";
    strokeColor = '#F2C057';
} else if (value == "College of Science") {
    strokeColor = '#E6A872';
} else if (value == "Bouve College of Health Sciences") {
    value = "Bouve College of\nHealth Sciences";
    strokeColor = '#5A7D7F';
} else if (value == "College of Social Sciences and Humanities") {
    value = "College of Social\nSciences, Humanities";
    strokeColor = '#4E8CA2';
} else if (value == "College of Arts, Media and Design") {
    value = "College of Arts, \nMedia and Design";
    strokeColor = '#725AC1';
} else if (value == "School of Law") {
    strokeColor = '#C37A89';
} else if (value == "University Programs") {
    strokeColor = '#7D4D3C';
} return {text: value, color: strokeColor};
}