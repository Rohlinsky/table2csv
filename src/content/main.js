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
            const data = this.table2csv.convert({
              head: this.table2csv.parse(table, 'head'),
              body: this.table2csv.parse(table, 'body')
            });

            this.toFile(data);
          })
          table.appendChild(img);

        });
      } 
    })
  }

  toFile(data) {
    const element = document.createElement("a");
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "table.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
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
