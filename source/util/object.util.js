/**
 * Remove any keys with null, '', 0, NaN and undefined values from an object.
 * Note that this function will NOT modify the object passed as a parameter.
 * Any primitive values, arrays and functions passed as parameters will be returned
 * without modification.
 * @param {object} obj Target object
 * @returns {object} The modified object
 */
function removeInvalidProperties(obj) {
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

/**
 * Checks whether an object has any properties.
 * @param {object} obj Target object
 * @returns {boolean} whether the object is empty (no properties).
 */
function isObjectEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

module.exports = { removeInvalidProperties, isObjectEmpty }
