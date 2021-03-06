import errors from '../errors'

/**
 * Represents a color definition.
 * This means how color exists and is transferred in the blockchain.
 *
 * @class IColorDefinition
 */
export default class IColorDefinition {
  /**
   * @constructor
   * @param {number} colorId
   */
  constructor (colorId) {
    this._colorId = colorId
  }

  /**
   * @abstract
   * @static
   * @return {string}
   */
  static getColorCode () {
    throw new errors.NotImplemented('IColorDefinition.getColorCode')
  }

  /**
   * @return {string}
   */
  getColorCode () {
    return this.constructor.getColorCode()
  }

  /**
   * @return {number}
   */
  getColorId () {
    return this._colorId
  }

  /**
   * @abstract
   * @return {string}
   */
  getDesc () {
    throw new errors.NotImplemented(this.constructor.name + '.desc')
  }

  /**
   * @abstract
   * @static
   * @param {string} desc
   * @param {(number|ColorDefinitionManager)} resolver
   * @param {Object} [opts]
   * @param {boolean} [opts.autoAdd=true]
   * @return {Promise.<IColorDefinition>}
   */
  static async fromDesc () {
    throw new errors.NotImplemented('IColorDefinition.fromDesc')
  }

  /**
   * @abstract
   * @static
   * @param {bitcore.Transaction} tx
   * @param {(number|ColorDefinitionManager)} resolver
   * @param {Object} [opts]
   * @param {boolean} [opts.autoAdd=true]
   * @return {Promise.<?IColorDefinition>}
   */
  static async fromTx () {
    throw new errors.NotImplemented('IColorDefinition.fromTx')
  }

  /**
   * @abstract
   * @param {bitcore.Transaction} tx
   * @return {boolean}
   */
  isGenesis () {
    throw new errors.NotImplemented(this.constructor.name + '.isGenesis')
  }

  /**
   * @abstract
   * @param {bitcore.Transaction} tx
   * @param {Array.<?ColorValue>} inColorValues
   * @param {getTxFn} getTxFn
   * @return {Promise<Array.<?ColorValue>>}
   */
  async runKernel () {
    throw new errors.NotImplemented(this.constructor.name + '.runKernel')
  }

  /**
   * @abstract
   * @static
   * @param {bitcore.Transaction} tx
   * @param {number[]} outIndices
   * @param {getTxFn} getTxFn
   * @return {Promise.<number[]>}
   */
  static async getAffectingInputs () {
    throw new errors.NotImplemented('IColorDefinition.getAffectingInputs')
  }

  /**
   * @abstract
   * @static
   * @param {OperationalTx} operationalTx
   * @return {Promise.<ComposedTx>}
   */
  static async makeComposedTx () {
    throw new errors.NotImplemented('IColorDefinition.makeComposedTx')
  }

  /**
   * @abstract
   * @static
   * @param {OperationalTx} operationalTx
   * @return {Promise.<ComposedTx>}
   */
  static async composeGenesisTx () {
    throw new errors.NotImplemented('IColorDefinition.composeGenesisTx')
  }
}
