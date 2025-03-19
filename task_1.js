const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const lines = getRowsFromString(data);
removeRow(lines, 0);
removeRow(lines, lines.length - 1);
const table = createTable(lines);
const max = getMaxTableElement(table, 3);
const newColumn = table.map(row => Math.round((row[3] * 100) / max).toString());

addTableColumn(table, newColumn);
printTable(tableToString(sortTable(table, 5)), console.log);

/**
 * @param {String} str
 * @return {Array<String>}
 */
function getRowsFromString(str) {
    return str.split('\n');
}

/**
 * @param {Array<Array<String>>} table
 * @param {Array<String>} row
 */
function addTableRow(table, row){
    table.push(row);
}

/**
 * @param {Array<Array<String>>} table
 * @param {Array<String>} column
 */
function addTableColumn(table, column) {
    table.forEach((row, index) => {
        row.push(column[index]);
    });
}

/**
 * @param {Array<String>} table
 * @param {Number} rowIndex
 * @return {Array<String>}
 */
function removeRow(table, rowIndex) {
    table.splice(rowIndex, 1);
}

/**
 * @param {Array<Array<String>>} table
 * @param {Number} sortId
 * @return {Array<Array<String>>}
 */
function sortTable(table, sortId) {
    return table.toSorted((r1, r2) => r2[sortId] - r1[sortId]);
}

/**
 * @param {Array<any>} table
 * @return {Array<any>}
 */
function tableToString(table) {
    return table.map(row => {
        let s = row[0].padEnd(18);
        s += row[1].padStart(10);
        s += row[2].padStart(8);
        s += row[3].padStart(8);
        s += row[4].padStart(18);
        s += row[5].padStart(6);
        return s;
    })
}

/**
 * @param {Array<any>} data
 * @param {Function} viewFn
 */
function printTable(data, viewFn) {
    data.forEach(item => viewFn(item));
}

/**
 * @param {Array<Array<String>>} table
 * @param {number} row
 */
function getMaxTableElement(table, row) {
    let max = 0;
    table.forEach((item) => {
        if (parseInt(item[row]) > max) {
            max = parseInt(item[row]);
        }
    })
    return max;
}

/**
 * @param {Array<String>} lines
 * @return {Array<Array<String>>}
 */
function createTable(lines) {
    const table = [];
    const arr = structuredClone(lines);

    for (const line of arr) {
        const cells = line.split(',');
        addTableRow(table, [...cells]);
    }

    return table;
}
