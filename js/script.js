// Student information
const studentId = "200544929";
const studentName = "Dhruv Gaurav Patel";

const studentInfoElement = document.getElementById("studentInfo");
studentInfoElement.textContent = `Student ID: ${studentId}, Name: ${studentName}`;
function searchUniversities() {
  const countryInput = document.getElementById("countryInput").value;
  const formattedCountry = formatCountryName(countryInput);
  const apiUrl = `http://universities.hipolabs.com/search?country=${formattedCountry}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      displayResult(data, formattedCountry);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function formatCountryName(input) {
  const words = input.split(" ");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.length > 1
    ? formattedWords.join("+")
    : formattedWords.join("");
}

function displayResult(data, selectedCountry) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; 

  if (data.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent =
      "No universities found for the given country.";
    resultDiv.appendChild(noResultsMessage);
  } else {
    // Display the total count of universities
    const totalCountMessage = document.createElement("p");
    totalCountMessage.textContent = `Total universities: ${data.length}`;
    resultDiv.appendChild(totalCountMessage);

    // Display each university
    data.forEach((university) => {
      const universityInfo = document.createElement("div");
      universityInfo.textContent = `${university.name}`;
      resultDiv.appendChild(universityInfo);
    });
  }
}

function resetPage() {
  location.reload();
}
