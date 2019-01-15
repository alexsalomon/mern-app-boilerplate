const expect = require('chai').expect
const formatUtil = require('./format.util')


describe('Util: Format', () => {
  describe('removeInvalidKeys()', () => {
    it('should return a new object without keys containing any null, empty, 0, NaN or undefined values', () => {
      const obj = {
        filledValue: 'example',
        nullValue: null,
        emptyValue: '',
        zeroValue: 0,
        NaNValue: NaN,
        undefinedValue: undefined,
      }
      const objCopy = { ...obj }
      const formattedResult = formatUtil.removeInvalidKeys(obj)
      expect(formattedResult).to.be.eql({ filledValue: 'example' })
      expect(formattedResult).to.not.be.eql(objCopy)
      expect(obj).to.be.eql(objCopy)
    })

    it('should return a copy of object if original does not contain keys with invalid values', () => {
      const obj = {
        filledValue: 'example',
      }
      const formattedResult = formatUtil.removeInvalidKeys(obj)
      expect(formattedResult).to.be.eql(obj)
    })

    it('should return an empty object if original is empty', () => {
      const obj = {}
      const formattedResult = formatUtil.removeInvalidKeys(obj)
      expect(formattedResult).to.be.eql(obj)
    })

    it('should return original parameter if it is not an object', () => {
      let param = 'string'
      let formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = 4
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = ''
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = 0
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = true
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = NaN
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = null
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = undefined
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = ['string', 4]
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)

      param = () => {}
      formattedResult = formatUtil.removeInvalidKeys(param)
      expect(formattedResult).to.be.eql(param)
    })
  })
})

