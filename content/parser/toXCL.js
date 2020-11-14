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
