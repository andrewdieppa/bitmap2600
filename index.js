// initialize blank pixels and color pickers
document.querySelectorAll('.pixel').forEach(pixel => {
  pixel.style.backgroundColor = '#fff';
});

document.querySelectorAll('.color-picker').forEach(picker => {
  picker.style.backgroundColor = '#fff';
})

// Get the modal element and the trigger
const modal = document.getElementById('colorPickerModal');
const trigger = document.querySelectorAll(".color-picker");

// Get button elements
const btnGrid = document.getElementById('btn-grid');
const btnCreate = document.getElementById('btn-create');

// Keep track of color picker selected
let lastPicker;

// Function to show the modal when the trigger is clicked
trigger.forEach(picker => {
    picker.addEventListener('click', event => {
        modal.style.display = 'block';
        lastPicker = event.currentTarget;
      });
})

// Close the modal when clicking outside of it
window.addEventListener('click', event => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Event delegation for color selection
document.addEventListener('click', event => {
    if (event.target.classList.contains('color-square')) {
      // Get the selected color
      const selectedColor = event.target.style.backgroundColor;
  
      // Update the color picker box with the selected color
      lastPicker.style.backgroundColor = selectedColor;

      // Update previously drawn pixels
      const scanline = lastPicker.parentElement.querySelectorAll('.pixel');

      scanline.forEach(pixel => {
        if (pixel.style.backgroundColor !== 'rgb(255, 255, 255)') {
          pixel.style.backgroundColor = selectedColor;
        }
      })
  
      // Close the modal
      modal.style.display = 'none';
    }
  });

// Handling individual pixel clicks
document.addEventListener('mousedown', event => {
  if (event.target.classList.contains('pixel')) {
    // get pixel
    const pixel = event.target;
    // get scanline color
    const color = pixel.parentElement.querySelector('.color-picker').style.backgroundColor;

    if (pixel.style.backgroundColor !== color) {
      pixel.style.backgroundColor = color;
    } else {
      pixel.style.backgroundColor = '#fff';
    }
  }
});

// Handle grid button click
btnGrid.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');

  pixels.forEach(pixel => {
    pixel.classList.contains('disableGrid') 
    ? pixel.classList.remove('disableGrid') 
    : pixel.classList.add('disableGrid')
  })

});

// Handle Create Bitmap and Output
btnCreate.addEventListener('click', () => {
  // Get Output field
  const output = document.querySelector('.output');

  // clear existing field
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }

  // Add bitmap title
  const bitmapTitle = document.createElement('h4');
  bitmapTitle.textContent = 'Bitmap:'
  output.appendChild(bitmapTitle);

  // Add blank scanline (Atari quirk stuff)
  const bitBlank = document.createElement('p');
  bitBlank.textContent = 'byte #%00000000';
  output.appendChild(bitBlank);

  // Get scanlines and reverse order
  const scanlines = document.querySelectorAll('.scanline');
  const reversedScanlines = Array.from(scanlines).reverse();
  
  // Loop through and write bitmap line by line
  reversedScanlines.forEach(scanline => {
    // create a p element
    const pLineBits = document.createElement('p');
    pLineBits.textContent = "byte #%";

    // grab scanline pixels
    const pixels = scanline.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
      if (pixel.style.backgroundColor !== 'rgb(255, 255, 255)') {
        pLineBits.textContent += '1';
      } else {
        pLineBits.textContent += '0';
      }
    })
    output.appendChild(pLineBits);
  })

  // Grab color pickers
  const colorPickers = document.querySelectorAll('.color-picker');

  // Reverse color array order
  const reversedColorPickers = Array.from(colorPickers).reverse();

  // Create and add colormap title
  const colormapTitle = document.createElement('h4');
  colormapTitle.textContent = 'Colormap:';
  colormapTitle.style.marginTop = '10px'
  output.appendChild(colormapTitle);

  // Add blank scanline (Atari quirk stuff)
  const colorBlank = document.createElement('p');
  colorBlank.textContent = 'byte #$00';
  output.appendChild(colorBlank);

  reversedColorPickers.forEach(colorPicker => {
    const color = colorPicker.style.backgroundColor;
    const pLineColor = document.createElement('p');
    pLineColor.textContent = 'byte #$';

    // Default to black if line is blank
    if (color === 'rgb(255, 255, 255)') {
      pLineColor.textContent += '00';
    } else {
      pLineColor.textContent += colorMapNtsc.get(color);
    }

    output.appendChild(pLineColor);
  })
  
});

// Hacky fix to show default output
btnCreate.click();

// Color Maps (only NTSC for now)
const colorMapNtsc = new Map([
  ['rgb(0, 0, 0)', '00'],
  ['rgb(68, 68, 0)', '10'],
  ['rgb(112, 40, 0)', '20'],
  ['rgb(132, 24, 0)', '30'],
  ['rgb(136, 0, 0)', '40'],
  ['rgb(120, 0, 92)', '50'],
  ['rgb(72, 0, 120)', '60'],
  ['rgb(20, 0, 132)', '70'],
  ['rgb(0, 0, 136)', '80'],
  ['rgb(0, 24, 124)', '90'],
  ['rgb(0, 44, 92)', 'A0'],
  ['rgb(0, 60, 44)', 'B0'],
  ['rgb(0, 60, 0)', 'C0'],
  ['rgb(20, 56, 0)', 'D0'],
  ['rgb(44, 48, 0)', 'E0'],
  ['rgb(68, 40, 0)', 'F0'],
  ['rgb(64, 64, 64)', '02'],
  ['rgb(100, 100, 16)', '12'],
  ['rgb(132, 68, 20)', '22'],
  ['rgb(152, 52, 24)', '32'],
  ['rgb(156, 32, 32)', '42'],
  ['rgb(140, 32, 116)', '52'],
  ['rgb(96, 32, 144)', '62'],
  ['rgb(48, 32, 152)', '72'],
  ['rgb(28, 32, 156)', '82'],
  ['rgb(28, 56, 144)', '92'],
  ['rgb(28, 76, 120)', 'A2'],
  ['rgb(28, 92, 72)', 'B2'],
  ['rgb(32, 92, 32)', 'C2'],
  ['rgb(52, 92, 28)', 'D2'],
  ['rgb(76, 80, 28)', 'E2'],
  ['rgb(100, 72, 24)', 'F2'],
  ['rgb(108, 108, 108)', '04'],
  ['rgb(132, 132, 36)', '14'],
  ['rgb(152, 92, 40)', '24'],
  ['rgb(172, 80, 48)', '34'],
  ['rgb(176, 60, 60)', '44'],
  ['rgb(160, 60, 136)', '54'],
  ['rgb(120, 60, 164)', '64'],
  ['rgb(76, 60, 172)', '74'],
  ['rgb(56, 64, 176)', '84'],
  ['rgb(56, 84, 168)', '94'],
  ['rgb(56, 104, 144)', 'A4'],
  ['rgb(56, 124, 100)', 'B4'],
  ['rgb(64, 124, 64)', 'C4'],
  ['rgb(80, 124, 56)', 'D4'],
  ['rgb(104, 112, 52)', 'E4'],
  ['rgb(132, 104, 48)', 'F4'],
  ['rgb(144, 144, 144)', '06'],
  ['rgb(160, 160, 52)', '16'],
  ['rgb(172, 120, 60)', '26'],
  ['rgb(192, 104, 72)', '36'],
  ['rgb(192, 88, 88)', '46'],
  ['rgb(176, 88, 156)', '56'],
  ['rgb(140, 88, 184)', '66'],
  ['rgb(104, 88, 192)', '76'],
  ['rgb(80, 92, 192)', '86'],
  ['rgb(80, 112, 188)', '96'],
  ['rgb(80, 132, 172)', 'A6'],
  ['rgb(80, 156, 128)', 'B6'],
  ['rgb(92, 156, 92)', 'C6'],
  ['rgb(108, 152, 80)', 'D6'],
  ['rgb(132, 140, 76)', 'E6'],
  ['rgb(160, 132, 68)', 'F6'],
  ['rgb(176, 176, 176)', '08'],
  ['rgb(184, 184, 64)', '18'],
  ['rgb(188, 140, 76)', '28'],
  ['rgb(208, 128, 92)', '38'],
  ['rgb(208, 112, 112)', '48'],
  ['rgb(192, 112, 176)', '58'],
  ['rgb(160, 112, 204)', '68'],
  ['rgb(124, 112, 208)', '78'],
  ['rgb(104, 116, 208)', '88'],
  ['rgb(104, 136, 204)', '98'],
  ['rgb(104, 156, 192)', 'A8'],
  ['rgb(104, 180, 148)', 'B8'],
  ['rgb(116, 180, 116)', 'C8'],
  ['rgb(132, 180, 104)', 'D8'],
  ['rgb(156, 168, 100)', 'E8'],
  ['rgb(184, 156, 88)', 'F8'],
  ['rgb(200, 200, 200)', '0A'],
  ['rgb(208, 208, 80)', '1A'],
  ['rgb(204, 160, 92)', '2A'],
  ['rgb(224, 148, 112)', '3A'],
  ['rgb(224, 136, 136)', '4A'],
  ['rgb(208, 132, 192)', '5A'],
  ['rgb(180, 132, 220)', '6A'],
  ['rgb(148, 136, 224)', '7A'],
  ['rgb(124, 140, 224)', '8A'],
  ['rgb(124, 156, 220)', '9A'],
  ['rgb(124, 180, 212)', 'AA'],
  ['rgb(124, 208, 172)', 'BA'],
  ['rgb(140, 208, 140)', 'CA'],
  ['rgb(156, 204, 124)', 'DA'],
  ['rgb(180, 192, 120)', 'EA'],
  ['rgb(208, 180, 108)', 'FA'],
  ['rgb(220, 220, 220)', '0C'],
  ['rgb(232, 232, 92)', '1C'],
  ['rgb(220, 180, 104)', '2C'],
  ['rgb(236, 168, 128)', '3C'],
  ['rgb(236, 160, 160)', '4C'],
  ['rgb(220, 156, 208)', '5C'],
  ['rgb(196, 156, 236)', '6C'],
  ['rgb(168, 160, 236)', '7C'],
  ['rgb(144, 164, 236)', '8C'],
  ['rgb(144, 180, 236)', '9C'],
  ['rgb(144, 204, 232)', 'AC'],
  ['rgb(144, 228, 192)', 'BC'],
  ['rgb(164, 228, 164)', 'CC'],
  ['rgb(180, 228, 144)', 'DC'],
  ['rgb(204, 212, 136)', 'EC'],
  ['rgb(232, 204, 124)', 'FC'],
  ['rgb(236, 236, 236)', '0E'],
  ['rgb(252, 252, 104)', '1E'],
  ['rgb(236, 200, 120)', '2E'],
  ['rgb(252, 188, 148)', '3E'],
  ['rgb(252, 180, 180)', '4E'],
  ['rgb(236, 176, 224)', '5E'],
  ['rgb(212, 176, 252)', '6E'],
  ['rgb(188, 180, 252)', '7E'],
  ['rgb(164, 184, 252)', '8E'],
  ['rgb(164, 200, 252)', '9E'],
  ['rgb(164, 224, 252)', 'AE'],
  ['rgb(164, 252, 212)', 'BE'],
  ['rgb(184, 252, 184)', 'CE'],
  ['rgb(200, 252, 164)', 'DE'],
  ['rgb(224, 236, 156)', 'EE'],
  ['rgb(252, 224, 140)', 'FE']
]);





