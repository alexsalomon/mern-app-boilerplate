const expect = require('chai').expect
const objectUtil = require('./object.util')


describe('Util: Object', () => {
  describe('removeInvalidProperties()', () => {
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
      const formattedResult = objectUtil.removeInvalidProperties(obj)
      expect(formattedResult).to.be.eql({ filledValue: 'example' })
      expect(formattedResult).to.not.be.eql(objCopy)
      expect(obj).to.be.eql(objCopy)
    })

    it('should return a copy of object if original does not contain keys with invalid values', () => {
      const obj = {
        filledValue: 'example',
      }
      const formattedResult = objectUtil.removeInvalidProperties(obj)
      expect(formattedResult).to.be.eql(obj)
    })

    it('should return an empty object if original is empty', () => {
      const obj = {}
      const formattedResult = objectUtil.removeInvalidProperties(obj)
      expect(formattedResult).to.be.eql(obj)
    })

    it('should return original parameter if it is not an object', () => {
      let param = 'string'
      let formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = 4
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = ''
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = 0
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = true
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = NaN
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = null
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = undefined
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = ['string', 4]
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)

      param = () => {}
      formattedResult = objectUtil.removeInvalidProperties(param)
      expect(formattedResult).to.be.eql(param)
    })
  })

  describe('isObjectEmpty()', () => {
    it('should be true for empty objects', () => {
      expect(objectUtil.isObjectEmpty({})).to.be.true()
    })

    it('should be false for objects with properties: primitives', () => {
      const obj = {
        random: 'yes',
      }
      expect(objectUtil.isObjectEmpty(obj)).to.be.false()
    })

    it('should be false for objects with properties: function object', () => {
      const obj = {
        function: () => {},
      }
      expect(objectUtil.isObjectEmpty(obj)).to.be.false()
    })

    it('should be false for objects with properties: date object', () => {
      const obj = {
        date: new Date(),
      }
      expect(objectUtil.isObjectEmpty(obj)).to.be.false()
    })

    it('should be false for objects with properties: empty object', () => {
      const obj = {
        obj: {},
      }
      expect(objectUtil.isObjectEmpty(obj)).to.be.false()
    })
  })
})

