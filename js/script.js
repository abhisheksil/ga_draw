var width = window.innerWidth;
var height = window.innerHeight;
width = 3500;
height = 2500;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  draggable: true,
});

var layer = new Konva.Layer();

const createKeyHole = (x, y, radius) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: radius,
    // fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  });
  group.add(circle);

  var circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: radius * 0.7,
    // fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  });
  group.add(circle);

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: radius / 2,
    height: radius * 1.5,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 0,
  });
  rect.offsetX(rect.width() / 2);
  rect.offsetY(rect.height() / 2);
  console.log(rect.offsetX);
  group.add(rect);

  return group;
};

const createCrossHair = (x, y, radius) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: radius,
    // fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  });
  group.add(circle);

  var line = new Konva.Line({
    points: [(radius + 3) * -1, 0, radius + 3, 0],
    stroke: 'black',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
  });
  group.add(line);
  var line = new Konva.Line({
    points: [0, (radius + 3) * -1, 0, radius + 3],
    stroke: 'black',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
  });
  group.add(line);

  return group;
};

const createSwitchUnit = (name, x, y, width, height, labelPlacement) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    // fill: 'green',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var keyHole = createKeyHole(width - 40, 72, 12);
  group.add(keyHole);
  var keyHole = createKeyHole(width - 40, height - 72, 12);
  group.add(keyHole);

  if (labelPlacement == 'L') {
    var line = new Konva.Line({
      points: [0, height - 40, 96, height - 40, 96, height],
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    });
    group.add(line);

    var text = new Konva.Text({
      x: 48,
      y: height - 18,
      text: name,
      fontSize: 32,
      fontFamily: 'Calibri',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  // LOAD INTERNALS
  Konva.Image.fromURL('/assets/switch_internals.png', function (image) {
    image.setAttrs({
      x: width / 2,
      y: -10,
      scaleX: 1.25,
      scaleY: 1.25,
      cornerRadius: 0,
    });
    image.offsetX(300 / 2);
    // image.offsetY(300 / 2);
    group.add(image);
  });

  return group;
};

const createVacantUnit = (name, x, y, width, height) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    // fill: 'green',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var keyHole = createKeyHole(width - 40, 72, 12);
  group.add(keyHole);
  var keyHole = createKeyHole(width - 40, height - 72, 12);
  group.add(keyHole);

  var text = new Konva.Text({
    x: width / 2,
    y: height / 2,
    text: 'VACANT',
    fontSize: 64,
    fontFamily: 'Calibri',
    fill: 'black',
    align: 'center',
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() / 2);
  group.add(text);

  return group;
};

const createMCCBUnit = (
  name,
  x,
  y,
  width,
  height,
  labelPlacement,
  amps,
  fontSize
) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    // fill: 'green',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var keyHole = createKeyHole(width - 40, 72, 12);
  group.add(keyHole);
  var keyHole = createKeyHole(width - 40, height - 72, 12);
  group.add(keyHole);

  if (labelPlacement == 'L') {
    var line = new Konva.Line({
      points: [0, height - 40, 96, height - 40, 96, height],
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    });
    group.add(line);

    var text = new Konva.Text({
      x: 48,
      y: height - 18,
      text: name,
      fontSize: 32,
      fontFamily: 'Calibri',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  // LOAD INTERNALS
  Konva.Image.fromURL('/assets/mccb_internals.png', function (image) {
    image.setAttrs({
      x: width / 2,
      y: -10,
      scaleX: 1.3,
      scaleY: 1.3,
      cornerRadius: 0,
    });
    image.offsetX(300 / 2);
    // image.offsetY(300 / 2);
    group.add(image);
  });

  // LOAD INTERNALS KNOB
  Konva.Image.fromURL('/assets/mccb_internals_knob.png', function (image) {
    image.setAttrs({
      x: width / 2,
      y: height / 2,
      scaleX: 1.3,
      scaleY: 1.3,
      cornerRadius: 0,
    });
    image.offsetX(150 / 2);
    image.offsetY(64 / 2);
    group.add(image);
  });

  var text = new Konva.Text({
    x: width / 2,
    y: height - 50,
    text: amps + ', MCCB, FP',
    fontSize: fontSize,
    fontFamily: 'Calibri',
    fill: 'black',
    align: 'center',
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() * 1);
  group.add(text);

  return group;
};

const createACBUnit = (name, x, y, width, height, labelPlacement) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    // fill: 'green',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var keyHole = createKeyHole(width - 40, 72, 12);
  group.add(keyHole);
  var keyHole = createKeyHole(width - 40, height - 72, 12);
  group.add(keyHole);

  if (labelPlacement == 'L') {
    var line = new Konva.Line({
      points: [0, height - 40, 96, height - 40, 96, height],
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    });
    group.add(line);

    var text = new Konva.Text({
      x: 48,
      y: height - 18,
      text: name,
      fontSize: 32,
      fontFamily: 'Calibri',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  // LOAD INTERNALS
  Konva.Image.fromURL('/assets/acb_internals.png', function (image) {
    image.setAttrs({
      x: width / 2,
      y: height / 2,
      scaleX: 1.5,
      scaleY: 1.5,
      cornerRadius: 0,
    });
    image.offsetX(300 / 2);
    image.offsetY(300 / 2);
    group.add(image);
  });

  var text = new Konva.Text({
    x: width / 2,
    y: height - 150,
    text: 'INCOMER-' + name[0] + '\n1000A, ACB, FP',
    fontSize: 64,
    fontFamily: 'Calibri',
    fill: 'black',
    align: 'center',
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() / 2);
  group.add(text);

  return group;
};

const createBusbarUnit = (name, x, y, width, height, labelPlacement) => {
  var group = new Konva.Group({
    x: x,
    y: y,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    // fill: 'green',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var crosshair = createCrossHair(24, 24, 6);
  group.add(crosshair);
  var crosshair = createCrossHair(width - 24, 24, 6);
  group.add(crosshair);
  var crosshair = createCrossHair(24, height - 24, 6);
  group.add(crosshair);
  var crosshair = createCrossHair(width - 24, height - 24, 6);
  group.add(crosshair);

  if (height >= 800) {
    var crosshair = createCrossHair(24, height / 2, 6);
    group.add(crosshair);
    var crosshair = createCrossHair(width - 24, height / 2, 6);
    group.add(crosshair);
  }

  if (labelPlacement == 'C') {
    var line = new Konva.Line({
      points: [
        width / 2 - 48,
        height,
        width / 2 - 48,
        height - 40,
        width / 2 + 48,
        height - 40,
        width / 2 + 48,
        height,
      ],
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    });
    group.add(line);

    var text = new Konva.Text({
      x: width / 2,
      y: height - 18,
      text: name,
      fontSize: 32,
      fontFamily: 'Calibri',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  return group;
};

// VERTICAL 1
var groupVertical1 = new Konva.Group({
  x: 0,
  y: 0,
  rotation: 0,
});
var busbarUnit_1F = createBusbarUnit('1F', 0, 0, 600, 400, 'C');
groupVertical1.add(busbarUnit_1F);

var acbUnit_1F1 = createACBUnit('1F1', 0, 400, 600, 1000, 'L');
groupVertical1.add(acbUnit_1F1);

var switchUnit_1F2 = createSwitchUnit('1F2', 0, 1400, 600, 800, 'L');
groupVertical1.add(switchUnit_1F2);

layer.add(groupVertical1);

// VERTICAL 2
var groupVertical2 = new Konva.Group({
  x: 600,
  y: 0,
  rotation: 0,
});
var busbarUnit_2F = createBusbarUnit('2F', 0, 0, 600, 400, 'C');
groupVertical2.add(busbarUnit_2F);

var acbUnit_2F1 = createACBUnit('2F1', 0, 400, 600, 1000, 'L');
groupVertical2.add(acbUnit_2F1);

var switchUnit_2F2 = createSwitchUnit('2F2', 0, 1400, 600, 800, 'L');
groupVertical2.add(switchUnit_2F2);

layer.add(groupVertical2);

// VERTICAL 3
var groupVertical3 = new Konva.Group({
  x: 1200,
  y: 0,
  rotation: 0,
});
var busbarUnit_3F = createBusbarUnit('3F', 0, 0, 600, 400, 'C');
groupVertical3.add(busbarUnit_3F);

var mccbUnit_3F1 = createMCCBUnit(
  '3F1',
  0,
  400,
  600,
  600,
  'L',
  '800A',
  60
);
groupVertical3.add(mccbUnit_3F1);

var mccbUnit_3F1 = createMCCBUnit(
  '3F1',
  0,
  400,
  600,
  600,
  'L',
  '800A',
  60
);
groupVertical3.add(mccbUnit_3F1);

var mccbUnit_3F2 = createMCCBUnit(
  '3F2',
  0,
  1000,
  600,
  600,
  'L',
  '630A',
  60
);
groupVertical3.add(mccbUnit_3F2);

var mccbUnit_3F3 = createMCCBUnit(
  '3F3',
  0,
  1600,
  600,
  600,
  'L',
  '630A',
  60
);
groupVertical3.add(mccbUnit_3F3);

layer.add(groupVertical3);

// VERTICAL
var groupVertical_ = new Konva.Group({
  x: 1800,
  y: 0,
  rotation: 0,
});
var baseUnit = createBusbarUnit('', 0, 0, 400, 400, '');
groupVertical_.add(baseUnit);

var baseUnit = createBusbarUnit('', 0, 400, 400, 1800, '');
groupVertical_.add(baseUnit);

layer.add(groupVertical_);

// VERTICAL 4
var groupVertical4 = new Konva.Group({
  x: 2200,
  y: 0,
  rotation: 0,
});

var busbarUnit_4F = createBusbarUnit('4F', 0, 0, 600, 400, 'C');
groupVertical4.add(busbarUnit_4F);

var mccbUnit_4F1 = createMCCBUnit(
  '4F1',
  0,
  400,
  600,
  600,
  'L',
  '400A',
  60
);
groupVertical4.add(mccbUnit_4F1);

var mccbUnit_4F2 = createMCCBUnit(
  '4F2',
  0,
  1000,
  600,
  400,
  'L',
  '400A',
  60
);
groupVertical4.add(mccbUnit_4F2);

var mccbUnit_4F3 = createMCCBUnit(
  '4F3',
  0,
  1400,
  600,
  400,
  'L',
  '400A',
  60
);
groupVertical4.add(mccbUnit_4F3);

var mccbUnit_4F4 = createMCCBUnit(
  '4F4',
  0,
  1800,
  600,
  400,
  'L',
  '250A',
  60
);
groupVertical4.add(mccbUnit_4F4);

layer.add(groupVertical4);

// VERTICAL 5
var groupVertical5 = new Konva.Group({
  x: 2800,
  y: 0,
  rotation: 0,
});

var busbarUnit_5F = createBusbarUnit('5F', 0, 0, 500, 400, 'C');
groupVertical5.add(busbarUnit_5F);

var mccbUnit_5F1 = createMCCBUnit(
  '5F1',
  0,
  400,
  500,
  300,
  'L',
  '125A',
  56
);
groupVertical5.add(mccbUnit_5F1);

var mccbUnit_5F2 = createMCCBUnit(
  '5F2',
  0,
  700,
  500,
  300,
  'L',
  '160A',
  56
);
groupVertical5.add(mccbUnit_5F2);

var mccbUnit_5F3 = createMCCBUnit(
  '5F3',
  0,
  1000,
  500,
  300,
  'L',
  '160A',
  56
);
groupVertical5.add(mccbUnit_5F3);

var mccbUnit_5F4 = createMCCBUnit(
  '5F4',
  0,
  1300,
  500,
  300,
  'L',
  '160A',
  56
);
groupVertical5.add(mccbUnit_5F4);

var mccbUnit_5F5 = createMCCBUnit(
  '5F5',
  0,
  1600,
  500,
  300,
  'L',
  '160A',
  56
);
groupVertical5.add(mccbUnit_5F5);

var vacantUnit_5F6 = createVacantUnit('5F6', 0, 1900, 500, 300);
groupVertical5.add(vacantUnit_5F6);

layer.add(groupVertical5);

// VERTICAL
var groupVertical_ = new Konva.Group({
  x: 3300,
  y: 0,
  rotation: 0,
});
var baseUnit = createBusbarUnit('', 0, 0, 400, 400, '');
groupVertical_.add(baseUnit);

var baseUnit = createBusbarUnit('', 0, 400, 400, 1800, '');
groupVertical_.add(baseUnit);

layer.add(groupVertical_);

// VERTICAL 5
var groupVertical6 = new Konva.Group({
  x: 3700,
  y: 0,
  rotation: 0,
});

var busbarUnit_6F = createBusbarUnit('6F', 0, 0, 400, 400, 'C');
groupVertical6.add(busbarUnit_6F);

var mccbUnit_6F1 = createMCCBUnit('6F1', 0, 400, 400, 300, 'L', '63A', 48);
groupVertical6.add(mccbUnit_6F1);

var mccbUnit_6F2 = createMCCBUnit('6F2', 0, 700, 400, 300, 'L', '63A', 48);
groupVertical6.add(mccbUnit_6F2);

var mccbUnit_6F3 = createMCCBUnit(
  '6F3',
  0,
  1000,
  400,
  300,
  'L',
  '63A',
  48
);
groupVertical6.add(mccbUnit_6F3);

var mccbUnit_6F4 = createMCCBUnit(
  '6F4',
  0,
  1300,
  400,
  300,
  'L',
  '63A',
  48
);
groupVertical6.add(mccbUnit_6F4);

var mccbUnit_6F5 = createMCCBUnit(
  '6F5',
  0,
  1600,
  400,
  300,
  'L',
  '32A',
  48
);
groupVertical6.add(mccbUnit_6F5);

var vacantUnit_6F6 = createVacantUnit('6F6', 0, 1900, 400, 300);
groupVertical6.add(vacantUnit_6F6);

layer.add(groupVertical6);

// add the layer to the stage
stage.add(layer);
