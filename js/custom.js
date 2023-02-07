import $ from './jquery.module.js';

import {
  createLock,
  createCrossHair,
  createVacantUnit,
  createControlMeteringUnit,
  createMCCBUnit,
  createACBUnit,
  createBusbarUnit,
  createVerticalSection,
  getCurrentVSID,
  findHeight,
  loadFile,
  drawGrid,
  drawCurrentSelection,
  toggleEditMenu,
} from './helperFunctionsCustom.js';

var width = window.innerWidth;
var height = window.innerHeight;
width = width > 1920 ? 1920 : width;
height = height > 1080 ? 1080 : height;

var stage = new Konva.Stage({
  id: 'stage',
  container: 'container',
  width: width,
  height: height,
  draggable: true,
});
stage.scaleX(0.3);
stage.scaleY(0.3);
// stage.x(50);
// stage.y(50);

var layer_grid = new Konva.Layer();

var grid = drawGrid(0.25);
grid.cache();
layer_grid.add(grid);

// add the layer to the stage
stage.add(layer_grid);

var layer = new Konva.Layer();
stage.add(layer);

// INIT VARIABLES
let current_stage_width = 0;
let current_stage_height = 0;
let current_y_pos = 0;
let currently_selected_vertical_section;
let current_selection_highlight;
let last_clicked_element;
let modal_operation;

// INIT ARRAYS
let vertical_sections_array = [];
let steps_array = [];

$(document).ready(function () {
  // console.log('ready!');

  // SET FP AS DEFAULT FOR MCCB
  $('#FP').prop('checked', true);

  stage.on('mousedown', function (e) {
    if (e.target.id() == 'stage') last_clicked_element = null;

    if (
      current_selection_highlight &&
      (last_clicked_element == null ||
        last_clicked_element.id() != e.target.id())
    ) {
      current_selection_highlight.remove();
    }

    if (last_clicked_element) {
      // console.log(last_clicked_element.id());
      // console.log(last_clicked_element.parent.id());

      let width = last_clicked_element.attrs.width;
      let height = last_clicked_element.attrs.height;
      let x = last_clicked_element.parent.attrs.x;
      let y = last_clicked_element.attrs.y;
      let type = last_clicked_element.attrs.type;

      console.info(`type: ${type}`);
      // console.info(`width: ${width}`);
      // console.info(`height: ${height}`);
      // console.info(`x: ${x}`);
      // console.info(`y: ${y}`);

      current_selection_highlight = drawCurrentSelection(
        'selection',
        x,
        y,
        width,
        height
      );
      layer.add(current_selection_highlight);

      toggleEditMenu(type, width, height);
    }
  });

  $('#vertical-section .button-add').on('click', function () {
    // console.info('ADD VERTICAL SECTION');

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

    let steps_json = {};
    steps_json.operation = 'vertical-section';
    steps_json.params = {
      name: name,
      x: x,
      y: y,
      width: width,
      height: height,
      is_empty: is_empty,
    };

    steps_array.push(steps_json);

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

    // vertical_section.on('mousedown', function (e) {
    //   last_clicked_element = e.currentTarget;
    // });

    currently_selected_vertical_section = vertical_section;

    current_stage_width += parseInt(vertical_section.width());
    current_stage_height = parseInt(vertical_section.height());
  });

  $('#busbar-unit .button-add').on('click', function () {
    // console.info('ADD BUSBAR UNIT');

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

    let steps_json = {};
    steps_json.operation = 'busbar-unit';
    steps_json.params = {
      name: name,
      x: x,
      y: y,
      width: width,
      height: height,
      is_empty: is_empty ? '' : 'C',
    };

    steps_array.push(steps_json);

    var busbar_unit = createBusbarUnit(
      name,
      x,
      y,
      width,
      height,
      is_empty ? '' : 'C'
    );
    currently_selected_vertical_section.add(busbar_unit);

    busbar_unit.on('mousedown', function (e) {
      last_clicked_element = e.currentTarget;
    });

    current_y_pos += height;
  });

  $('#acb-unit .button-add').on('click', function () {
    // console.info('ADD ACB UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let labelPlacement = 'L';
    let amps = $(this).siblings().find('.input-amps').val();
    let fontSize = 56;

    let steps_json = {};
    steps_json.operation = 'acb-unit';
    steps_json.params = {
      name: name,
      x: x,
      y: y,
      width: width,
      height: height,
      labelPlacement: labelPlacement,
      amps: amps,
      fontSize: fontSize,
    };

    steps_array.push(steps_json);

    var acb_unit = createACBUnit(
      name,
      x,
      y,
      width,
      height,
      'L',
      `${amps}A`,
      fontSize
    );
    currently_selected_vertical_section.add(acb_unit);

    acb_unit.on('mousedown', function (e) {
      last_clicked_element = e.currentTarget;
    });

    current_y_pos += height;
  });

  $('#mccb-unit .button-add').on('click', function () {
    // console.info('ADD MCCB UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let labelPlacement = 'L';
    let amps = $(this).siblings().find('.input-amps').val();
    let pole = 'FP';
    if ($(this).siblings().find('#TP').prop('checked')) {
      pole = 'TP';
    }

    let fontSize = 48;
    if (width <= 500) {
      fontSize = 42;
    }
    if (width <= 400) {
      fontSize = 36;
    }

    let steps_json = {};
    steps_json.operation = 'mccb-unit';
    steps_json.params = {
      name: name,
      x: x,
      y: y,
      width: width,
      height: height,
      labelPlacement: labelPlacement,
      amps: amps,
      pole: pole,
      fontSize: fontSize,
    };

    steps_array.push(steps_json);

    var mccb_unit = createMCCBUnit(
      name,
      x,
      y,
      width,
      height,
      labelPlacement,
      `${amps}A`,
      pole,
      fontSize
    );
    currently_selected_vertical_section.add(mccb_unit);

    mccb_unit.on('mousedown', function (e) {
      last_clicked_element = e.currentTarget;
    });

    current_y_pos += height;
  });

  $('#control-metering-unit .button-add').on('click', function () {
    // console.info('ADD CONTROL & METERING UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let labelPlacement = 'L';

    let steps_json = {};
    steps_json.operation = 'control-metering-unit';
    steps_json.params = {
      name: name,
      x: x,
      y: y,
      width: width,
      height: height,
      labelPlacement: labelPlacement,
    };

    steps_array.push(steps_json);

    var control_metering_unit = createControlMeteringUnit(
      name,
      x,
      y,
      width,
      height,
      labelPlacement
    );
    currently_selected_vertical_section.add(control_metering_unit);

    control_metering_unit.on('mousedown', function (e) {
      last_clicked_element = e.currentTarget;
    });

    current_y_pos += height;
  });

  $('#vacant-unit .button-add').on('click', function () {
    // console.info('ADD VACANT UNIT');

    let name = `${
      currently_selected_vertical_section.id()[
        currently_selected_vertical_section.id().length - 1
      ]
    }F${currently_selected_vertical_section.children.length - 1}`;
    let x = 0;
    let y = findHeight(currently_selected_vertical_section);
    let width = $(this).siblings().find('.input-width').val();
    let height = $(this).siblings().find('.input-height').val();
    let labelPlacement = 'L';

    let steps_json = {};
    steps_json.operation = 'vacant-unit';
    steps_json.params = {
      name: name,
      x: x,
      y: y,
      width: width,
      height: height,
      labelPlacement: labelPlacement,
    };

    steps_array.push(steps_json);

    var vacant_unit = createVacantUnit(
      name,
      x,
      y,
      width,
      height,
      labelPlacement
    );
    currently_selected_vertical_section.add(vacant_unit);

    vacant_unit.on('mousedown', function (e) {
      last_clicked_element = e.currentTarget;
    });

    current_y_pos += height;
  });

  $('#new').on('mouseover', function (e) {
    $('.tooltip-text').html('NEW');
  });
  $('#new').on('mouseout', function (e) {
    $('.tooltip-text').html('');
  });

  $('#new').on('click', function () {
    console.log(`steps_array.length: ${steps_array.length}`);
    if (steps_array.length > 0) {
      $('#modal').css('display', 'flex');

      modal_operation = 'new';
    }
  });

  $('#modal .ok').on('click', function () {
    $('#modal').css('display', 'none');

    if (modal_operation == 'new') {
      layer.removeChildren();

      // INIT VARIABLES
      current_stage_width = 0;
      current_y_pos = 0;
      currently_selected_vertical_section = null;
      last_clicked_element = null;

      // INIT ARRAYS
      vertical_sections_array = [];
      steps_array = [];
    }
  });

  $('#modal .cancel').on('click', function () {
    $('#modal').css('display', 'none');
  });

  $('#load').on('mouseover', function (e) {
    $('.tooltip-text').html('OPEN');
  });
  $('#load').on('mouseout', function (e) {
    $('.tooltip-text').html('');
  });

  $('#load').on('click', function () {
    layer.removeChildren();

    // INIT VARIABLES
    current_stage_width = 0;
    current_y_pos = 0;
    currently_selected_vertical_section = null;
    last_clicked_element = null;

    // INIT ARRAYS
    vertical_sections_array = [];
    steps_array = [];

    $('#loadFile').trigger('click');
    // fetch('./saves/load_test.json')
    //   .then((response) => response.json())
    //   .then((json) => loadFile(json));
  });

  document.getElementById('loadFile').onchange = function (evt) {
    try {
      let files = evt.target.files;
      if (!files.length) {
        alert('No file selected!');
        return;
      }
      let file = files[0];
      let reader = new FileReader();
      const self = this;
      reader.onload = (event) => {
        // console.log(event.target.result);
        loadFile(JSON.parse(event.target.result));
      };
      reader.readAsText(file);
    } catch (err) {
      console.error(err);
    }
  };

  $('#save').on('mouseover', function (e) {
    $('.tooltip-text').html('SAVE');
  });
  $('#save').on('mouseout', function (e) {
    $('.tooltip-text').html('');
  });

  $('#save').on('click', function (e) {
    // if (steps_array.length > 0) {
    //   downloadObjectAsJson(steps_array, `save-${Date.now()}.gad`);
    // }
    var dataURL = stage.toDataURL({ pixelRatio: 1 });
    downloadURI(dataURL, 'stage.png');
  });

  function downloadObjectAsJson(exportObj, exportName) {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  document.getElementById('save').addEventListener(
    'click',
    function () {
      var dataURL = stage.toDataURL({ pixelRatio: 3 });
      downloadURI(dataURL, 'stage.png');
    },
    false
  );

  $('#add').on('mouseover', function (e) {
    $('.tooltip-text').html('ADD');
  });
  $('#add').on('mouseout', function (e) {
    $('.tooltip-text').html('');
  });

  $('#undo').on('mouseover', function (e) {
    $('.tooltip-text').html('UNDO');
  });
  $('#undo').on('mouseout', function (e) {
    $('.tooltip-text').html('');
  });

  $('#undo').on('click', function () {
    if (
      currently_selected_vertical_section &&
      currently_selected_vertical_section.children.length > 0
    ) {
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

      steps_array.pop();
    }
  });

  // TRIGGERS
  $('#vertical-section .button-add').trigger('click');
  $('#busbar-unit .button-add').trigger('click');
  $('#acb-unit .button-add').trigger('click');
  $('#control-metering-unit .button-add').trigger('click');

  $('#vertical-section .button-add').trigger('click');
  $('#busbar-unit .button-add').trigger('click');
  $('#acb-unit .button-add').trigger('click');
  $('#control-metering-unit .button-add').trigger('click');

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
