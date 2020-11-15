class TableToEXCEL {
  convert(data) {
  	this.toFile(data);	
  }

  toFile(table, extension='xls') {
    chrome.storage.sync.get('default_file_name', ({ default_file_name }) => {
      const element = document.createElement("a");
      const file = escape(table.outerHTML);
      const file_name = (default_file_name) ? default_file_name : "table";

	    element.href = 'data:application/vnd.ms-excel,' + file;
	    element.download = file_name + "." + extension 
      document.body.appendChild(element); 
      element.click();
    });
  }
}
