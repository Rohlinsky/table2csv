class Page {
  constructor() {
    // declaration options
    this.tableList;

    // initiation data
    this.tables;
    this.setButton();
    this.table2csv = new TableToCSV();
    this.table2excell = new TableToEXCEL();

  }

  get tables() {
    this.ready(() => { 
      if (document.querySelector('table') !== null) {
        this.tableList = document.querySelectorAll('table');
      }
    });
  }

  setButton() {
    this.ready(() => {
      if (this.tableList && this.tableList.length) {
        this.tableList.forEach((table) => {
          table.style.position = "relative";

          const img = document.createElement('img');

          img.style.width = "1rem";
          img.style.height = "1rem";
          img.style.padding = 0;
          img.style.background = 'none'
          img.style.position = "absolute";
          img.style.top = ".5rem";
          img.style.right = ".5rem";
          img.style.cursor = "pointer";
          img.classList.add('button');
          img.classList.add('table2csv');
          img.src = '//upload.wikimedia.org/wikipedia/commons/e/e8/Microsoft_Office_Excel_%282013%E2%80%932018%29.svg';
          img.addEventListener('click', (e) => {
            chrome.storage.sync.get('default_file_format', ({ default_file_format }) => {
              let file_format = 1;
              let data = null;

              if (default_file_format) {
                file_format = default_file_format;
              }

              switch (file_format) {
                case 1: 
                  data = this.table2csv.convert({
                    head: this.table2csv.parse(table, 'head'),
                    body: this.table2csv.parse(table, 'body')
                  });
                  break;
                default:
                  data = this.table2csv.convert({
                    head: this.table2csv.parse(table, 'head'),
                    body: this.table2csv.parse(table, 'body')
                  });
              }

              this.toFile(data);

            });
          })
          table.appendChild(img);

        });
      } 
    })
  }

  toFile(data, extension='csv') {
    chrome.storage.sync.get('default_file_name', ({ default_file_name }) => {
      const element = document.createElement("a");
      const file = new Blob([data], {type: 'text/plain'});
      const file_name = (default_file_name) ? default_file_name : "table";

      element.href = URL.createObjectURL(file);
      element.download = file_name + "." + extension;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  }

  ready(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
  }
}

new Page();
