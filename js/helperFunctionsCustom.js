import $ from './jquery.module.js';

export const createLock = (x, y, radius) => {
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
  // console.log(rect.offsetX);
  group.add(rect);

  return group;
};

export const createCrossHair = (x, y, radius) => {
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

export const createVacantUnit = (
  name,
  x,
  y,
  width,
  height,
  labelPlacement
) => {
  var group = new Konva.Group({
    id: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var lock = createLock(width - 40, 72, 12);
  group.add(lock);
  var lock = createLock(width - 40, height - 72, 12);
  group.add(lock);

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
      y: height - 16,
      text: name,
      fontSize: 32,
      fontFamily: 'Roboto',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  var text = new Konva.Text({
    x: width / 2,
    y: height / 2,
    text: 'VACANT',
    fontSize: 56,
    fontFamily: 'Roboto',
    fill: 'black',
    align: 'center',
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() / 2);
  group.add(text);

  return group;
};

export const createControlMeteringUnit = (
  name,
  x,
  y,
  width,
  height,
  labelPlacement
) => {
  var group = new Konva.Group({
    id: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var lock = createLock(width - 40, 72, 12);
  group.add(lock);
  var lock = createLock(width - 40, height - 72, 12);
  group.add(lock);

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
      y: height - 16,
      text: name,
      fontSize: 32,
      fontFamily: 'Roboto',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  // LOAD INTERNALS
  Konva.Image.fromURL('assets/switch_internals.png', function (image) {
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

export const createMCCBUnit = (
  name,
  x,
  y,
  width,
  height,
  labelPlacement,
  amps,
  pole,
  fontSize
) => {
  var group = new Konva.Group({
    id: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var lock = createLock(width - 40, 72, 12);
  group.add(lock);
  var lock = createLock(width - 40, height - 72, 12);
  group.add(lock);

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
      y: height - 16,
      text: name,
      fontSize: 32,
      fontFamily: 'Roboto',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  // LOAD INTERNALS
  Konva.Image.fromURL('assets/mccb_internals.png', function (image) {
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
  Konva.Image.fromURL('assets/mccb_internals_knob.png', function (image) {
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
    text: `${amps}, MCCB, ${pole}`,
    fontSize: fontSize,
    fontFamily: 'Roboto',
    fill: 'black',
    align: 'center',
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() * 1);
  group.add(text);

  return group;
};

export const createACBUnit = (
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
    id: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
  });
  group.add(rect);

  var lock = createLock(width - 40, 72, 12);
  group.add(lock);
  var lock = createLock(width - 40, height - 72, 12);
  group.add(lock);

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
      y: height - 16,
      text: name,
      fontSize: 32,
      fontFamily: 'Roboto',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  // LOAD INTERNALS
  Konva.Image.fromURL('assets/acb_internals.png', function (image) {
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
    y: height - 100,
    text: `INCOMER-${name[0]}\n${amps}, ACB, FP`,
    fontSize: fontSize,
    fontFamily: 'Roboto',
    fill: 'black',
    align: 'center',
  });
  text.offsetX(text.width() / 2);
  text.offsetY(text.height() / 2);
  group.add(text);

  return group;
};

export const createBusbarUnit = (
  name,
  x,
  y,
  width,
  height,
  labelPlacement
) => {
  var group = new Konva.Group({
    id: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: 'white',
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
      y: height - 16,
      text: name,
      fontSize: 32,
      fontFamily: 'Roboto',
      fill: 'black',
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);
    group.add(text);
  }

  return group;
};

export const createVerticalSection = (
  name,
  x,
  y,
  width,
  height,
  is_empty
) => {
  var group = new Konva.Group({
    id: name,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: 0,
  });

  var rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: width,
    height: height,
    // fill: 'green',
    stroke: '#999',
    strokeWidth: 2,
    name: 'bounding_box',
  });
  rect.dashEnabled(true);
  rect.dash([20, 20]);

  group.add(rect);

  return group;
};

export const drawGrid = (alpha) => {
  var groupGrid = new Konva.Group({
    x: -200,
    y: -200,
    rotation: 0,
  });

  var xCount = 80;
  for (var x = 1; x < xCount; x++) {
    var gridLine = new Konva.Line({
      points: [x * 100, 0, x * 100, 4000],
      stroke: 'gray',
      opacity: alpha,
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    });

    groupGrid.add(gridLine);
  }
  var yCount = 40;
  for (var y = 1; y < yCount; y++) {
    var gridLine = new Konva.Line({
      points: [0, y * 100, 7000, y * 100],
      stroke: 'gray',
      opacity: alpha,
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
    });

    groupGrid.add(gridLine);
  }

  xCount = 800;
  for (var x = 1; x < xCount; x++) {
    // console.log(x * 10);
    var gridLine = new Konva.Line({
      points: [x * 10, 0, x * 10, 4000],
      stroke: 'gray',
      opacity: alpha,
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
    });

    groupGrid.add(gridLine);
  }
  yCount = 400;
  for (var y = 1; y < yCount; y++) {
    // console.log(y * 10);
    var gridLine = new Konva.Line({
      points: [0, y * 10, 8000, y * 10],
      stroke: 'gray',
      opacity: alpha,
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
    });

    groupGrid.add(gridLine);
  }

  return groupGrid;
};

export const getCurrentVSID = (vertical_sections_array) => {
  let id = 1;
  for (let vs of vertical_sections_array) {
    if (parseInt(vs.id()[vs.id().length - 1]) > 0) {
      // console.log(parseInt(vs.id()[vs.id().length - 1]));
      id += 1;
    }
  }

  return id;
};

export const findHeight = (vertical_section) => {
  // console.log(vertical_section.children.length);
  let height = 0;

  for (let index = 1; index < vertical_section.children.length; index++) {
    // console.log(vertical_section.children[index]);
    height += parseInt(vertical_section.children[index].height());
  }

  return height;
};

export const loadFile = (json) => {
  console.log(json);

  let name, x, y, width, height, is_empty, labelPlacement, amps, fontSize;

  for (let step of json) {
    console.log(step.operation);
    // console.log(step.params);
    switch (step.operation) {
      case 'vertical-section':
        if (step.params.is_empty) {
          $('#vertical-section .input-empty').prop('checked', true);
        } else {
          $('#vertical-section .input-empty').prop('checked', false);
        }

        $('#vertical-section .input-width').val(step.params.width);
        $('#vertical-section .input-height').val(step.params.height);

        $('#vertical-section .button-add').trigger('click');
        break;

      case 'busbar-unit':
        $('#busbar-unit .input-width').val(step.params.width);
        $('#busbar-unit .input-height').val(step.params.height);

        $('#busbar-unit .button-add').trigger('click');
        break;

      case 'acb-unit':
        $('#acb-unit .input-width').val(step.params.width);
        $('#acb-unit .input-height').val(step.params.height);
        $('#acb-unit .input-amps').val(step.params.amps);

        $('#acb-unit .button-add').trigger('click');
        break;

      case 'mccb-unit':
        $('#mccb-unit .input-width').val(step.params.width);
        $('#mccb-unit .input-height').val(step.params.height);
        $('#mccb-unit .input-amps').val(step.params.amps);
        if (step.params.pole == 'TP') {
          $('#mccb-unit #TP').prop('checked', true);
        } else {
          $('#mccb-unit #FP').prop('checked', true);
        }

        $('#mccb-unit .button-add').trigger('click');
        break;

      case 'control-metering-unit':
        $('#control-metering-unit .input-width').val(step.params.width);
        $('#control-metering-unit .input-height').val(step.params.height);

        $('#control-metering-unit .button-add').trigger('click');
        break;

      case 'vacant-unit':
        $('#vacant-unit .input-width').val(step.params.width);
        $('#vacant-unit .input-height').val(step.params.height);

        $('#vacant-unit .button-add').trigger('click');
        break;
    }
  }
};

export function accordize(target, one) {
  // (A) ADD CSS CLASS TO TARGET
  target.classList.add('awrap');

  // (B) ATTACH ONCLICK
  let all = target.querySelectorAll('li');
  if (typeof one != 'boolean') {
    one = false;
  }
  for (let i = 0; i < all.length; i++) {
    if (i % 2 == 0) {
      all[i].classList.add('ahead');
      if (one) {
        all[i].onclick = () => {
          for (let i = 0; i < all.length; i += 2) {
            all[i].classList.remove('open');
          }
          all[i].classList.add('open');
        };
      } else {
        all[i].onclick = () => all[i].classList.toggle('open');
      }
    } else {
      all[i].classList.add('abody');
    }
  }
}

window.addEventListener('load', () => {
  accordize(document.getElementById('accordion'), true);
});
