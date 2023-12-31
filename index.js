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
        console.log(lastPicker);
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
  
      // Close the modal
      modal.style.display = 'none';
    }
  });
