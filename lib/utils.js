/**
 * Take an objecty and return an array containing keys 
 * where each key has a corresponding object value
 * @param {Object} obj 
 * @returns {Array}
 */
function getNonEmptyValues(obj) {
  const keyArr = [];
  for (const property in obj) {
    if(obj[property]) {
      keyArr.push(property);
    }
  }
  return keyArr;
}

module.exports = {
  getNonEmptyValues,
};
