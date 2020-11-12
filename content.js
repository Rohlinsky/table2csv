class Page {
	constructor() {
		// declaration options
		this.tableList;

		// initiation data
		this.tables;
		this.setButton();
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
						head: this.parseTableHead(table),
						body: this.parseTableBody(table)
					});
				})
				table.appendChild(img);

			});
		})
	}

	parseTableHead(table) {
		const head = table.querySelector('thead');
		const headRows = head.querySelectorAll('tr');
		const columnsNames = [];
		headRows.forEach((td, index) => {
			const tdl = td.querySelectorAll('th');
			columnsNames.push([]);
			tdl.forEach((th) => {
				columnsNames[index].push(th.innerText);
			});
		});
		return columnsNames;
	}

	parseTableBody(table) {
		const body = table.querySelector('tbody');
		const bodyRows = body.querySelectorAll('tr');
		const columnsData = [];
		bodyRows.forEach((td, index) => {
			const tdl = td.querySelectorAll('td');
			columnsData.push([]);
			tdl.forEach((td) => {
				columnsData[index].push(td.innerText);
			});
		});
		return columnsData;
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
