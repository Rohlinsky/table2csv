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

    return data;
  }
}
