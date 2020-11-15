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

  convert(tdata) {
    let data = '';

    tdata.head.forEach((el) => {
      data += el.join() + '\n';
    });

    tdata.body.forEach((el) => {
      data += el.join() + '\n';
    });

    this.toFile(data);
  }

  toFile(data, extension='csv') {
    chrome.storage.sync.get('default_file_name', ({ default_file_name }) => {
      const element = document.createElement("a");
      const file = new Blob([data], { type: 'text/plain' });
      const file_name = (default_file_name) ? default_file_name : "table";

      element.href = URL.createObjectURL(file);
      element.download = file_name + "." + extension;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    });
  }
}
