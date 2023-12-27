

// Function to handle radio button selection
function handleDrivingSelection() {
  var drivingYes = document.getElementById('yes');
  var drivingNo = document.getElementById('no');
  var findSeatBtn = document.getElementById('findSeatBtn');
  var nameSelect = document.getElementById('name');

  findSeatBtn.addEventListener('click', function() {
    if ((drivingYes.checked || drivingNo.checked) && nameSelect.value !== "") {
      // Redirect based on selection
      if (drivingYes.checked) {
        window.location.href = `result.html?driving=yes&name=${nameSelect.value}`;
      } else {
        window.location.href = `result.html?driving=no&name=${nameSelect.value}`;
      }
    } else {
      alert("Please select your name and answer whether you drive to the dinner.");
    }
  });
}

// Populate dropdown on page load and handle radio button selection
window.onload = function() {
  const nameInput = document.getElementById('name');
  const nameList = document.getElementById('nameList');
  const errorMessage = document.getElementById('errorMessage');

  // Populate the datalist options from the seats object
  Object.keys(seats).forEach(function(name) {
    const option = document.createElement('option');
    option.value = name;
    nameList.appendChild(option);
  });

  // Enable Find My Seat button when a name is selected
  nameInput.addEventListener('input', function() {
    const findSeatBtn = document.getElementById('findSeatBtn');
    const enteredName = nameInput.value;
    const isNameValid = enteredName && seats[enteredName];

    if (!isNameValid) {
      nameInput.style.borderColor = 'red'; // Change border color to red
      errorMessage.textContent = 'Please select an appropriate name.';
      errorMessage.style.color = 'red';
    } else {
      nameInput.style.borderColor = ''; // Reset border color
      errorMessage.textContent = '';
    }

    findSeatBtn.disabled = !isNameValid;
  });
  
  handleDrivingSelection();
};