// Set default data

chrome.storage.sync.get('default_file_name', ({ default_file_name }) => {
  if (!default_file_name) {
	chrome.storage.sync.set({ 'default_file_name': 'table2csv' }, () => {
		console.log('Basic data default_file_name was successfully set');
	});
  }
});

chrome.storage.sync.get('default_file_format', ({ default_file_format }) => {
  if (!default_file_format) {
	chrome.storage.sync.set({ 'default_file_format': 1 }, () => {
		console.log('Basic data default_file_format was successfully set');
	});
  }
});
