module.exports = {
  /** bitcoinjs-lib with changed Transaction */
  bitcoin: require('bitcoinjs-lib'),

  /** Storage */
  SyncStorage: require('./SyncStorage'),

  /** Color Defintions */
  ColorDefinition: require('./ColorDefinition'),
  GenesisColorDefinition: require('./GenesisColorDefinition'),
  UncoloredColorDefinition: require('./UncoloredColorDefinition'),
  EPOBCColorDefinition: require('./EPOBCColorDefinition'),
  ColorDefinitionStorage: require('./ColorDefinitionStorage'),
  ColorDefinitionManager: require('./ColorDefinitionManager'),

  /** Color Data */
  ColorDataStorage: require('./ColorDataStorage'),
  ColorData: require('./ColorData'),

  /** Secondary */
  ColorSet: require('./ColorSet'),
  ColorValue: require('./ColorValue'),
  ColorTarget: require('./ColorTarget'),

  /** Transactions */
  Transaction: require('./Transaction'),
  OperationalTx: require('./OperationalTx'),
  ComposedTx: require('./ComposedTx')
}
