// Additional logic for showing input box for guest name when driving is 'Yes' and hiding when 'No' is selected
function toggleNameInputVisibility(drivingYes, drivingNo, container, findSeatBtn) {
  const existingNameInput = document.getElementById('guestName'); // to check if the text box is exist
  const nameAndButtonDiv = document.querySelector('.name-and-button');

  if (drivingNo.checked || !drivingYes.checked) {
    if (existingNameInput && nameAndButtonDiv) {
	  container.removeChild(nameAndButtonDiv);
	  container.appendChild(findSeatBtn);
	}
  } else if (drivingYes.checked){
    if (!existingNameInput) {
      // Create a div to hold the guest name input and 'Find My Seat' button
      const nameAndButtonDiv = document.createElement('div');
      nameAndButtonDiv.classList.add('name-and-button');

      // Create a sentence above the input box
      const sentence = document.createElement('p');
      sentence.textContent = 'Please enter your name:';
      sentence.classList.add('sentence-above-input');
      nameAndButtonDiv.appendChild(sentence);

      // Create the input box for the guest name
      const nameInput = document.createElement('input');
      nameInput.setAttribute('type', 'text');
      nameInput.setAttribute('id', 'guestName');
      nameInput.setAttribute('placeholder', 'Enter your name');
      nameInput.style.display = 'block';
      nameInput.classList.add('guest-name-input');

      // Append the input box for name to the div
      nameAndButtonDiv.appendChild(nameInput);

      // Append the 'Find My Seat' button after the input box for name
      nameAndButtonDiv.appendChild(findSeatBtn);

      // Append the div with the sentence, input box for name, and button to the container
      container.appendChild(nameAndButtonDiv);
    }
  }
}

// Function to handle radio button selection
function handleDrivingSelection() {
  var drivingYes = document.getElementById('yes');
  var drivingNo = document.getElementById('no');
  var findSeatBtn = document.getElementById('findSeatBtn');
  var companySelect = document.getElementById('company');
  const container = document.querySelector('.container');
  
  // Logic to handle driving selection change
  drivingYes.addEventListener('change', function() {
    toggleNameInputVisibility(drivingYes, drivingNo, container, findSeatBtn);
  });

  drivingNo.addEventListener('change', function() {
    toggleNameInputVisibility(drivingYes, drivingNo, container, findSeatBtn);
  });
  
  // Enable Find My Seat button when a name is selected
  companySelect.addEventListener('input', function() {
    const findSeatBtn = document.getElementById('findSeatBtn');
    const enteredCompany = companySelect.value;

    // Fetch company list from backend to validate against entered company
    fetch('http://8.217.178.249/company_list')
      .then(response => response.json())
      .then(companies => {
        const isCompanyValid = companies.includes(enteredCompany);

        if (!isCompanyValid) {
          companySelect.style.borderColor = 'red'; // Change border color to red
          errorMessage.textContent = 'Please select a valid company.';
          errorMessage.style.color = 'red';
        } else {
          companySelect.style.borderColor = ''; // Reset border color
          errorMessage.textContent = '';
        }

        findSeatBtn.disabled = !isCompanyValid;
      })
      .catch(error => {
        console.error('Error fetching company list:', error);
      });
  });
  
  // Initial check for visibility when page loads
  toggleNameInputVisibility(drivingYes, drivingNo, container, findSeatBtn);
  
}

// Function to handle the "Find My Seat" button click event
function handleFindSeatButtonClick() {
  const findSeatBtn = document.getElementById('findSeatBtn');
  const companySelect = document.getElementById('company');
  const drivingYes = document.getElementById('yes');
  const drivingNo = document.getElementById('no');

  findSeatBtn.addEventListener('click', function() {
    const selectedCompany = companySelect.value; // Get the selected company from dropdown
    const drivingYesChecked = drivingYes.checked;
    const drivingNoChecked = drivingNo.checked;
	
	let guestNameInput = document.getElementById('guestName');

    if (
    (drivingYesChecked && selectedCompany && guestNameInput.value.trim() !== '') || // Driving Yes and fields all filled
    (drivingNoChecked && selectedCompany) // Driving No and company is selected
	) {
		const checkInStatus = 'Yes'; // Assuming it's a check-in action
		const driving = drivingYesChecked ? 'Yes' : 'No';
		const guestName = drivingYesChecked ? guestNameInput.value : null; // Assign guestName or null based on drivingYesChecked

		// Prepare the data to be sent to the Flask server
		const checkInData = {
		  companyName: selectedCompany,
		  guestName: guestName,
		  checkInStatus: checkInStatus,
		  driving: driving
		};

		// Send a POST request to your Flask server to update the check-in status
		fetch('http://8.217.178.249/checkin', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(checkInData)
		})
		.then(response => {
		  if (response.ok) {
			// Handle success - show a success message 
			console.log('Check-in status updated successfully!');
			
			// Redirect based on selection
			if (drivingYesChecked) {
			  window.location.href = `result.html?driving=yes&companyName=${selectedCompany}&guestName=${guestName}`;
			} else {
			  window.location.href = `result.html?driving=no&companyName=${selectedCompany}`;
			}
		  } else {
			throw new Error('Failed to update check-in status');
		  }
		})
		.catch(error => {
		  console.error('Error updating check-in status:', error);
		  // Handle error - maybe show an error message to the user
		});

    }
	else
	{
	  // Check for empty fields based on driving selection
      alert("Please fill in all required fields.");
      return; // Stop further execution
	}
	
	});
    
}

// Populate dropdown on page load and handle radio button selection
window.onload = function() {
  const companyInput = document.getElementById('company');
  const companyList = document.getElementById('companyList');
  const errorMessage = document.getElementById('errorMessage');
  const drivingYes = document.getElementById('yes'); // Add reference to the 'Yes' radio button
  const drivingNo = document.getElementById('no'); // Add reference to the 'No' radio button

  // Function to populate company list on page load
  fetch('http://8.217.178.249/company_list')
    .then(response => response.json())
    .then(companies => {
      companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        companyList.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching company list:', error);
    });

  // Enable Find My Seat button when a name is selected
  companyInput.addEventListener('input', function() {
	  const findSeatBtn = document.getElementById('findSeatBtn');
	  const enteredCompany = companyInput.value;

	  // Fetch company list from backend to validate against entered company
	  fetch('http://8.217.178.249/company_list')
		.then(response => response.json())
		.then(companies => {
		  const isCompanyValid = companies.includes(enteredCompany);

		  if (!isCompanyValid) {
			companyInput.style.borderColor = 'red'; // Change border color to red
			errorMessage.textContent = 'Please select a valid company.';
			errorMessage.style.color = 'red';
		  } else {
			companyInput.style.borderColor = ''; // Reset border color
			errorMessage.textContent = '';
		  }

		  findSeatBtn.disabled = !isCompanyValid;
		})
		.catch(error => {
		  console.error('Error fetching company list:', error);
		});
	
	});
  
  handleDrivingSelection();
  handleFindSeatButtonClick();
  
};