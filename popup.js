document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function() {
    var searchKeysTextarea = document.getElementById('searchKeys');
    var searchKeys = searchKeysTextarea.value.split('\n').map(function(searchKey) {
      return searchKey.trim();
    }).filter(function(searchKey) {
      return searchKey !== '';
    });
    var amazonCheckbox = document.getElementById('amazonCheckbox');
    var ebayCheckbox = document.getElementById('ebayCheckbox');
    var customUrlCheckbox = document.getElementById('customUrlCheckbox');
    var customUrlInput = document.getElementById('customUrlInput');
    var urlsToOpen = [];

    if (amazonCheckbox.checked) {
      searchKeys.forEach(function(searchKey) {
        urlsToOpen.push('https://www.amazon.co.uk/s?k=' + searchKey);
      });
    }

    if (ebayCheckbox.checked) {
      searchKeys.forEach(function(searchKey) {
        urlsToOpen.push('https://www.ebay.co.uk/sch/i.html?_nkw=' + searchKey);
      });
    }

    if (customUrlCheckbox.checked) {
      var customUrl = customUrlInput.value.trim();
      if (customUrl !== '') {
        searchKeys.forEach(function(searchKey) {
          urlsToOpen.push(customUrl + searchKey);
        });
      }
    }

    if (urlsToOpen.length > 0) {
      if (urlsToOpen.length > 100) {
        urlsToOpen = urlsToOpen.slice(0, 100);
        alert('Only the first 100 search results will be opened');
      }
      urlsToOpen.forEach(function(urlToOpen) {
        chrome.tabs.create({url: urlToOpen});
      });
    }
  });
});
