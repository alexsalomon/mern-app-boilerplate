/**
 * Remove any keys with null, '', 0, NaN and undefined values from an object.
 * Note that this function will NOT modify the object passed as a parameter.
 * Any primitive values, arrays and functions passed as parameters will be returned
 * without modification.
 * @param {Object} obj Target object
 * @returns {Object} The modified object
 */
function removeInvalidKeys(obj) {
  let result = obj

  if (obj === Object(obj) && !(obj instanceof Array) && !(obj instanceof Function)) {
    result = { ...obj }
    Object.keys(result).forEach(key => {
      if (!result[key]) {
        delete result[key]
      }
    })
  }

  return result
}

module.exports = { removeInvalidKeys }
