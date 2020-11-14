// Work with stored data

chrome.storage.sync.get('default_file_name', ({ default_file_name }) => {
  const file_name = document.getElementById('file_name');

  if (default_file_name) {
    file_name.value = default_file_name;
  }

  file_name.addEventListener('change', (e) => {
    chrome.storage.sync.set({ 'default_file_name': file_name.value }, () => {
      console.log('Data default_file_name was successfully set');
    });
  });
});

chrome.storage.sync.get('default_file_format', ({ default_file_format }) => {
  const file_format = document.getElementById('file_format');

  if (default_file_format) {
    file_format.value = default_file_format;
  }

  file_format.addEventListener('change', (e) => {
    chrome.storage.sync.set({ 'default_file_format': file_format.value }, () => {
      console.log('Data default_file_format was successfully set');
    });
  });
});
