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

/**
 * @param {String} str
 * @return {Array<String>}
 */
const getRowsFromString = (str) => {
    return str.split('\n');
}

/**
 * @param {Array<Array<String>>} table
 * @param {Array<String>} row
 * @return {Array<Array<String>>}
 */
const addTableRow = (table, row) => {
    table.push(row);
}

/**
 * @param {Array<Array<String>>} table
 * @param {Array<String>} column
 * @return {Array<Array<String>>}
 */
const addTableColumn = (table, column) => {
    const newTable = structuredClone(table);
    newTable.forEach((row, index) => {
        row.push(column[index]);
    });
    return newTable;
}

/**
 * @param {Array<String>} table
 * @param {Number} rowIndex
 * @return {Array<String>}
 */
const removeRow = (table, rowIndex) => {
    const result = [...table]; //structuredClone(table)
    result.splice(rowIndex, 1);
    return result
}

/**
 * @param {Array<Array<String>>} table
 * @return {Array<Array<String>>}
 */
const sortTable = (table) => {
    return table.toSorted((r1, r2) => r2[5] - r1[5]);
}

/**
 * @param {Array<any>} table
 * @return {Array<any>}
 */
const tableToString = (table) => {
    return table.map(row => {
        let s = row[0].padEnd(18);
        s += row[1].padStart(10);
        s += row[2].padStart(8);
        s += row[3].padStart(8);
        s += row[4].padStart(18);
        s += row[5].padStart(6);
        return s;
    })
};

/**
 * @param {Array<any>} data
 */
const printTable = (data, viewFn) => {
    data.forEach(item => viewFn(item));
}

/**
 * @param {Array<Array<String>>} table
 * @param {number} row
 */
const getMaxTableElement = (table, row) => {
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
const createTable = (lines) => {
    const table = [];

    for (const line of removeRow(lines, 0)) {
        const cells = line.split(',');
        addTableRow(table, [...cells]);
    }

    return table;
};

/**
 * @param {String} str
 */
const justDoIt = ((str) => {
    const lines = getRowsFromString(str);
    const table = createTable(removeRow(lines, lines.length - 1));
    const max = getMaxTableElement(table, 3);
    const newColumn = table.map(row => Math.round((row[3] * 100) / max).toString());

    printTable(tableToString(sortTable(addTableColumn(table, newColumn))), console.log);
});

justDoIt(data);
