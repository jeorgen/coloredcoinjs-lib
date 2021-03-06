import initReadyMixin from 'ready-mixin'

import errors from '../../errors'

/**
 * @typedef {Object} IDataStorage~Record
 * @property {string} colorCode
 * @property {string} txId
 * @property {number} outIndex
 * @property {number} colorId
 * @property {*} value
 */

/**
 * @class IDataStorage
 * @mixes ReadyMixin
 */
export default class IDataStorage {
  /**
   * @static
   * @return {boolean}
   */
  static isAvailable () { return false }

  /**
   * @param {IDataStorage~Record} data
   * @return {Promise}
   */
  async add () {
    throw new errors.NotImplemented(this.constructor.name + '.add')
  }

  /**
   * @param {Object} opts
   * @param {string} opts.colorCode
   * @param {string} opts.txId
   * @param {number} [opts.outIndex]
   * @return {Promise.<Map<number, Map<number, *>>>}
   */
  async get () {
    throw new errors.NotImplemented(this.constructor.name + '.get')
  }

  /**
   * @param {Object} opts
   * @param {string} opts.colorCode
   * @param {string} opts.txId
   * @return {Promise}
   */
  async remove () {
    throw new errors.NotImplemented(this.constructor.name + '.remove')
  }

  /**
   * @return {Promise}
   */
  async clear () {
    throw new errors.NotImplemented(this.constructor.name + '.clear')
  }
}

let ReadyMixin = initReadyMixin(Promise)
ReadyMixin(IDataStorage.prototype)
