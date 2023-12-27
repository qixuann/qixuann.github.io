// Function to populate dropdown with names from seat.js
function populateDropdown() {
  var select = document.getElementById('name');
  for (var name in seats) {
    var option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  }
}

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
  populateDropdown();
  handleDrivingSelection();
};