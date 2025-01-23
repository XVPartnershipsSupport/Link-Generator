// Placeholder JSON data
const pages = [{"name":"Homepage","languages":[{"code":"en","id":"2522358"}]},{"name":"eSIM for Argentina","languages":[{"code":"en","id":"2569280"}]},{"name":"eSIM for Australia","languages":[{"code":"en","id":"2569281"}]},{"name":"eSIM for Brazil","languages":[{"code":"en","id":"2569282"}]},{"name":"eSIM for Canada","languages":[{"code":"en","id":"2569283"}]},{"name":"eSIM for Chile","languages":[{"code":"en","id":"2569284"}]},{"name":"eSIM for China","languages":[{"code":"en","id":"2569285"}]},{"name":"eSIM for Costa Rica","languages":[{"code":"en","id":"2569286"}]},{"name":"eSIM for Egypt","languages":[{"code":"en","id":"2569287"}]},{"name":"eSIM for Europe","languages":[{"code":"en","id":"2569288"}]},{"name":"eSIM for Greece","languages":[{"code":"en","id":"2569289"}]},{"name":"eSIM for Hong Kong","languages":[{"code":"en","id":"2569290"}]},{"name":"eSIM for India","languages":[{"code":"en","id":"2569291"}]},{"name":"eSIM for Indonesia","languages":[{"code":"en","id":"2569292"}]},{"name":"eSIM for Japan","languages":[{"code":"en","id":"2569293"}]},{"name":"eSIM for South Korea","languages":[{"code":"en","id":"2569294"}]},{"name":"eSIM for Malaysia","languages":[{"code":"en","id":"2569295"}]},{"name":"eSIM for Mexico","languages":[{"code":"en","id":"2569296"}]},{"name":"eSIM for Morocco","languages":[{"code":"en","id":"2569297"}]},{"name":"eSIM for New Zealand","languages":[{"code":"en","id":"2569298"}]},{"name":"eSIM for Philippines","languages":[{"code":"en","id":"2569299"}]},{"name":"eSIM for Singapore","languages":[{"code":"en","id":"2569300"}]},{"name":"eSIM for South Africa","languages":[{"code":"en","id":"2569301"}]},{"name":"eSIM for Shi Lanka","languages":[{"code":"en","id":"2569302"}]},{"name":"eSIM for Thailand","languages":[{"code":"en","id":"2569303"}]},{"name":"eSIM for Turkey","languages":[{"code":"en","id":"2569304"}]},{"name":"eSIM for United Arab Emirates","languages":[{"code":"en","id":"2569305"}]},{"name":"eSIM UK","languages":[{"code":"en","id":"2569306"}]},{"name":"eSIM USA","languages":[{"code":"en","id":"2569307"}]},{"name":"eSIM for Vietnam","languages":[{"code":"en","id":"2569308"}]}];
let selectedPageName = "";
let selectedLanguageCode = "";

// Get references to the select elements and generate button
const pageSelector = document.getElementById("page-selector");
const languageSelector = document.getElementById("language-selector");
const generateBtn = document.getElementById("generate-btn");
const result = document.getElementById("result");

// Set default values
document.getElementById("personal-id").value = "Your Impact ID";

// Populate the page selector with options and select the first page
for (let i = 0; i < pages.length; i++) {
  const option = document.createElement("option");
  option.value = pages[i].name;
  option.text = pages[i].name;
  pageSelector.appendChild(option);
}
pageSelector.selectedIndex = 0;

// Update the language selector options and generate the URL on page load
updateLanguageSelectorAndGenerateUrl();

// Update the language selector options when the page selector changes
pageSelector.addEventListener("change", function() {
  updateLanguageSelectorAndGenerateUrl();
});

// Function to check if a value is numerical
function isNumerical(value) {
  return /^\d+$/.test(value);
}

// Modified function to update the language selector options and generate the URL
function updateLanguageSelectorAndGenerateUrl() {
  // Clear the language selector options
  languageSelector.innerHTML = "";

  // Find the selected page
  selectedPageName = pageSelector.value;
  const selectedPage = pages.find(function(page) {
    return page.name === selectedPageName;
  });

  // Populate the language selector with options
  for (let i = 0; i < selectedPage.languages.length; i++) {
    const option = document.createElement("option");
    option.value = selectedPage.languages[i].id;
    option.text = selectedPage.languages[i].code;
    languageSelector.appendChild(option);
  }

  // Set default language and generate URL
  languageSelector.selectedIndex = 0;
  generateBtn.click();
}

// Update selectedLanguageCode when the language selector changes
languageSelector.addEventListener("change", function() {
  selectedLanguageCode = languageSelector.value;
});

generateBtn.addEventListener("click", function() {
  // Get the personal ID value and check if it's a numerical value
  const personalId = document.getElementById("personal-id").value;
  if (!isNumerical(personalId)) {
    alert("Error: Impact ID must be a numerical value.");
    return; // Stop URL generation if the personal ID is not valid
  }

  const selectedLanguage = languageSelector.options[languageSelector.selectedIndex];
  const pageId = selectedLanguage.value;
  const label4 = document.getElementById("label4").value;

  let url = `${selectedPageName} (${selectedLanguage.text}): https://go.holiday.com/c/${personalId}/${pageId}/29571`;

  if (label4 !== "") {
    url += `?sharedid=${encodeURIComponent(label4)}`;
  }

  result.innerText = url;
});

function copyToClipboard() {
  const resultText = result.innerText;
  const urlStartIndex = resultText.indexOf("https://");
  if (urlStartIndex >= 0) {
    const url = resultText.substring(urlStartIndex);
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("URL copied to clipboard: " + url);
  }
}
