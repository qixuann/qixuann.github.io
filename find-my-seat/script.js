// Function to handle radio button selection
function handleDrivingSelection() {
  var drivingYes = document.getElementById('yes');
  var drivingNo = document.getElementById('no');
  var findSeatBtn = document.getElementById('findSeatBtn');
  var nameSelect = document.getElementById('name');

  findSeatBtn.addEventListener('click', function() {
    if ((drivingYes.checked || drivingNo.checked) && nameSelect.value !== "") {
      const selectedName = nameSelect.value; // Get the selected name from dropdown
      const tableNumber = seats[selectedName]; // Get table number based on selected name from seat.js data

      const checkInStatus = 'Yes'; // Check-in status is 'Yes' when 'Find My Seat' button is clicked
      const drivingStatus = drivingYes.checked ? 'Yes' : (drivingNo.checked ? 'No' : '');

      const checkInData = {
        name: selectedName,
        table_number: tableNumber || '',
        check_in_status: checkInStatus,
        driving: drivingStatus
      };

      fetch('http://127.0.0.1:5000/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkInData)
      })
      .then(response => {
        if (response.ok) {
          // Redirect based on selection
          if (drivingYes.checked) {
            window.location.href = `result.html?driving=yes&name=${selectedName}`;
          } else {
            window.location.href = `result.html?driving=no&name=${selectedName}`;
          }
        } else {
          // Handle error
        }
      })
      .catch(error => {
        // Handle network error
      });
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