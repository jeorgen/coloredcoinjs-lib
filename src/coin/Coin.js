var assert = require('assert')

var _ = require('lodash')

var color = require('../color')
var Transaction = require('../tx').Transaction


/**
 * @class Coin
 *
 * @param {Object} params
 * @param {ColorData} params.colorData
 * @param {ColorDefinitionManager} params.colorDefinitionManager
 * @param {string} params.address
 * @param {string} params.txId
 * @param {number} params.outIndex
 * @param {number} params.value
 * @param {number} params.confirmations
 */
function Coin(params) {
  assert(_.isObject(params), 'Expected Object params, got ' + params)
  assert(params.colorData instanceof color.ColorData,
    'Expected params.colorData instanceof ColorData, got ' + params.colorData)
  assert(params.colorDefinitionManager instanceof color.ColorDefinitionManager,
    'Expected params.colorDefinitionManager instanceof ColorDefinitionManager, got ' + params.colorDefinitionManager)
  assert(Transaction.isTxId(params.txId), 'Expected transaction id params.txId, got ' + params.txId)
  assert(_.isNumber(params.outIndex), 'Expected number params.outIndex, got ' + params.outIndex)
  assert(_.isNumber(params.value), 'Expected number params.value, got ' + params.value)
  assert(_.isNumber(params.confirmations), 'Expected number params.confirmations, got ' + params.confirmations)

  this.cdManager = params.colorDefinitionManager
  this.cData = params.colorData
  this.address = params.address
  this.txId = params.txId
  this.outIndex = params.outIndex
  this.value = params.value
  this.confirmations = params.confirmations
}

/**
 * Return true if Coin in blockchain
 *
 * @return {boolean}
 */
Coin.prototype.isConfirmed = function() {
  return this.confirmations > 0
}

/**
 * Get ColorValue for current Coin and given ColorDefinition
 *
 * @param {ColorDefinition} colorDefinition
 * @param {function} cb
 */
Coin.prototype.getColorValue = function(colorDefinition, cb) {
  assert(colorDefinition instanceof color.ColorDefinition,
    'Expected colorDefinition instanceof ColorDefinition, got ' + colorDefinition)
  assert(_.isFunction(cb), 'Expected function cb, got ' + cb)

  this.cData.getColorValue(this.txId, this.outIndex, colorDefinition, cb)
}

/**
 * Get one ColorValue or error if more than one
 *
 * @param {function} cb Called on finished with params (error, ColorValue)
 */
Coin.prototype.getMainColorValue = function (cb) {
  assert(_.isFunction(cb), 'Expected function cb, got ' + cb)

  var _this = this

  var coinColorValue = null
  var colorDefinitions = this.cdManager.getAllColorDefinitions()

  function getColorValue(index) {
    if (colorDefinitions.length === index) {
      if (coinColorValue === null) {
        var uncolored = _this.cdManager.getUncolored()
        coinColorValue = new color.ColorValue({ colordef: uncolored, value: _this.value })
      }

      cb(null, coinColorValue)
      return
    }

    _this.getColorValue(colorDefinitions[index], function(error, colorValue) {
      if (error === null && colorValue !== null) {
        if (coinColorValue === null)
          coinColorValue = colorValue
        else
          error = new Error('Coin ' + _this + ' have more that one ColorValue')
      }

      if (error !== null) {
        cb(error)
        return
      }

      getColorValue(index+1)
    })
  }

  getColorValue(0)
}

/**
 * @return {string}
 */
Coin.prototype.toString = function() {
  return this.txId + ':' + this.outIndex
}


module.exports = Coin
