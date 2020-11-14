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
      if (this.tableList.length) {
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
            this.table2csv({
              head: this.table2csv.parse(table, 'head'),
              body: this.table2csv.parse(table, 'body')
            });
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

class TableToCSV {
  parse(table, part) {
    let where = '';
    let el = '';
    switch (part) {
      case 'head':
        where = 'thead';
        el = 'th';
        break;
      case 'body':
        where = 'tbody';
        el = 'td';
        break;
      default:
        return [];
    }
    if (!table.querySelector(where)) return [];
    const from = table.querySelector(where);
    const rows = from.querySelectorAll('tr');
    const columns = [];
    if (rows.length) {
      rows.forEach((td, index) => {
        const tdl = td.querySelectorAll(el);
        columns.push([]);
        tdl.forEach((tx) => {
          columns[index].push(tx.innerText);
        });
      });
    }
    return columns;
  }

  table2csv(tdata) {
    let data = '';
    tdata.head.forEach((el) => {
      data += el.join() + '\n';
    });
    tdata.body.forEach((el) => {
      data += el.join() + '\n';
    });
    this.toFile(data);
  }
}

class TableToEXCEL {
  exportF(elem) {
    var table = document.getElementById("table");
    var html = table.outerHTML;
    var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    elem.setAttribute("href", url);
    elem.setAttribute("download", "export.xls"); // Choose the file name
    return false;
  }
}
