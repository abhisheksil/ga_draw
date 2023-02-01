import $ from './jquery.module.js';

import {
  createKeyHole,
  createCrossHair,
  createVacantUnit,
  createSwitchUnit,
  createMCCBUnit,
  createACBUnit,
  createBusbarUnit,
  createVerticalSection,
  getCurrentVSID,
  findHeight,
  drawGrid,
} from './helperFunctionsCustom.js';

var width = window.innerWidth;
var height = window.innerHeight;
width = 3000;
// height = 2000;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
  draggable: true,
});

var layer = new Konva.Layer();

var grid = drawGrid(0.25);
grid.cache();
layer.add(grid);

// add the layer to the stage
stage.add(layer);
// stage.x((width - stage.width()) / 2);
stage.scaleX(0.5);
stage.scaleY(0.5);
stage.x(50);
stage.y(50);

// INIT VARIABLES
let current_stage_width = 0;
let current_y_pos = 0;
let currently_selected_vertical_section;

// INIT ARRAYS
let vertical_sections_array = [];

$(document).ready(function () {
  console.log('ready!');

  $('#vertical-section .button-add').on('click', function () {
    console.info('ADD VERTICAL SECTION');

    let is_empty = $(this).siblings().find('.input-empty').prop('checked');

    let name = '';
    // EMPTY
    if (is_empty) {
      name = `vertical-section-0`;
    } else {
      // console.log(getCurrentVSID(vertical_sections_array));
      name = `vertical-section-${getCurrentVSID(vertical_sections_array)}`;
    }

    let x = current_stage_width;
    let y = 0;
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();

    let vertical_section = createVerticalSection(
      name,
      x,
      y,
      width,
      height,
      is_empty
    );
    vertical_sections_array.push(vertical_section);
    layer.add(vertical_section);

    currently_selected_vertical_section = vertical_section;

    current_stage_width += parseInt(vertical_section.width());

    // console.info(current_stage_width);

    // UPDATE DEFAULT WIDTH VALUES FOR BUSBAR
    // $('#busbar-unit .input-width').val(vertical_section.width());
  });

  $('#busbar-unit .button-add').on('click', function () {
    console.info('ADD BUSBAR UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F`;

    let is_empty = false;
    if (name[0] == '0') {
      is_empty = true;
    }
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();

    var busbar_unit = createBusbarUnit(
      name,
      x,
      y,
      width,
      height,
      is_empty ? '' : 'C'
    );
    currently_selected_vertical_section.add(busbar_unit);

    current_y_pos += height;
  });

  $('#acb-unit .button-add').on('click', function () {
    console.info('ADD ACB UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let amps = $(this).siblings().find('.input-amps').val();

    var busbar_unit = createACBUnit(
      name,
      x,
      y,
      width,
      height,
      'L',
      `${amps}A`,
      56
    );
    currently_selected_vertical_section.add(busbar_unit);

    current_y_pos += height;
  });

  $('#mccb-unit .button-add').on('click', function () {
    console.info('ADD MCCB UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let amps = $(this).siblings().find('.input-amps').val();
    let fontSize = 48;
    if (width <= 500) {
      fontSize = 42;
    }
    if (width <= 400) {
      fontSize = 36;
    }
    var busbar_unit = createMCCBUnit(
      name,
      x,
      y,
      width,
      height,
      'L',
      `${amps}A`,
      fontSize
    );
    currently_selected_vertical_section.add(busbar_unit);

    current_y_pos += height;
  });

  $('#switch-unit .button-add').on('click', function () {
    console.info('ADD SWITCH UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();

    var busbar_unit = createSwitchUnit(name, x, y, width, height, 'L');
    currently_selected_vertical_section.add(busbar_unit);

    current_y_pos += height;
  });

  $('#vacant-unit .button-add').on('click', function () {
    console.info('ADD VACANT UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let amps = $(this).siblings().find('.input-amps').val();

    var vacant_unit = createVacantUnit(name, x, y, width, height);
    currently_selected_vertical_section.add(vacant_unit);

    current_y_pos += height;
  });

  $('#undo').on('click', function () {
    if (currently_selected_vertical_section.children.length > 0) {
      console.log(currently_selected_vertical_section.children.length);

      if (currently_selected_vertical_section.children.length == 1) {
        current_stage_width -= parseInt(
          currently_selected_vertical_section.width()
        );
      }

      currently_selected_vertical_section.children[
        currently_selected_vertical_section.children.length - 1
      ].destroy();

      if (currently_selected_vertical_section.children.length == 0) {
        vertical_sections_array.pop();
        currently_selected_vertical_section =
          vertical_sections_array[vertical_sections_array.length - 1];
      }
    }
  });

  // TRIGGERS
  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .button-add').trigger('click');
  // $('#acb-unit .button-add').trigger('click');
  // $('#switch-unit .button-add').trigger('click');

  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .button-add').trigger('click');
  // $('#acb-unit .button-add').trigger('click');
  // $('#switch-unit .button-add').trigger('click');

  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .button-add').trigger('click');
  // $('#mccb-unit .input-height').val(600);
  // $('#mccb-unit .input-amps').val(800);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(630);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(630);
  // $('#mccb-unit .button-add').trigger('click');

  // $('#vertical-section .input-width').val(400);
  // $('#vertical-section .input-empty').prop('checked', true);
  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .input-width').val(400);
  // $('#busbar-unit .button-add').trigger('click');
  // $('#busbar-unit .input-height').val(1800);
  // $('#busbar-unit .button-add').trigger('click');

  // $('#vertical-section .input-width').val(600);
  // $('#vertical-section .input-empty').prop('checked', false);
  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .input-width').val(600);
  // $('#busbar-unit .input-height').val(400);
  // $('#busbar-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(400);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-height').val(400);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(250);
  // $('#mccb-unit .button-add').trigger('click');

  // $('#vertical-section .input-width').val(500);
  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .input-width').val(500);
  // $('#busbar-unit .button-add').trigger('click');
  // $('#mccb-unit .input-width').val(500);
  // $('#mccb-unit .input-height').val(300);
  // $('#mccb-unit .input-amps').val(125);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(160);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(160);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(160);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(160);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#vacant-unit .input-width').val(500);
  // $('#vacant-unit .input-height').val(300);
  // $('#vacant-unit .button-add').trigger('click');

  // $('#vertical-section .input-width').val(400);
  // $('#vertical-section .input-empty').prop('checked', true);
  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .input-width').val(400);
  // $('#busbar-unit .button-add').trigger('click');
  // $('#busbar-unit .input-height').val(1800);
  // $('#busbar-unit .button-add').trigger('click');

  // $('#vertical-section .input-width').val(400);
  // $('#vertical-section .input-empty').prop('checked', false);
  // $('#vertical-section .button-add').trigger('click');
  // $('#busbar-unit .input-width').val(400);
  // $('#busbar-unit .input-height').val(400);
  // $('#busbar-unit .button-add').trigger('click');
  // $('#mccb-unit .input-width').val(400);
  // $('#mccb-unit .input-height').val(300);
  // $('#mccb-unit .input-amps').val(63);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(63);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(63);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(63);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#mccb-unit .input-amps').val(32);
  // $('#mccb-unit .button-add').trigger('click');
  // $('#vacant-unit .input-width').val(400);
  // $('#vacant-unit .input-height').val(300);
  // $('#vacant-unit .button-add').trigger('click');
});
