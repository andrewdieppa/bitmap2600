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
document.addEventListener('click', event => {
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
