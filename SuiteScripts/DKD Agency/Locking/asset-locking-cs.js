/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([
  './libs/lib-constants.js'
], (constants) => {
  let currentRecord, bankruptcy, failedDebit, wrongRates, contractExp, replacedBy, replacedByMachine, other, otherReason

  const shouldBeLocked = () => {
    return currentRecord.getValue({ fieldId: constants.AssetFields.BANKRUPTCY }) ||
      currentRecord.getValue({ fieldId: constants.AssetFields.FAILED_DEBIT }) ||
      currentRecord.getValue({ fieldId: constants.AssetFields.WRONG_RATES }) ||
      currentRecord.getValue({ fieldId: constants.AssetFields.CONTRACT_EXPIRED }) ||
      currentRecord.getValue({ fieldId: constants.AssetFields.REPLACED_BY }) ||
      currentRecord.getValue({ fieldId: constants.AssetFields.OTHER })
  }

  const standaloneLockFieldsDisabled = isDisabled => {
    debugger
    if (isDisabled) {
      currentRecord.setValue({ fieldId: constants.AssetFields.BANKRUPTCY, value: false, ignoreFieldChange: true })
      currentRecord.setValue({ fieldId: constants.AssetFields.FAILED_DEBIT, value: false, ignoreFieldChange: true })
      currentRecord.setValue({ fieldId: constants.AssetFields.WRONG_RATES, value: false, ignoreFieldChange: true })
      currentRecord.setValue({ fieldId: constants.AssetFields.CONTRACT_EXPIRED, value: false, ignoreFieldChange: true })
    }

    if (bankruptcy) bankruptcy.isDisabled = isDisabled
    if (failedDebit) failedDebit.isDisabled = isDisabled
    if (wrongRates) wrongRates.isDisabled = isDisabled
    if (contractExp) contractExp.isDisabled = isDisabled
  }

  const replacedByFieldsDisabled = isDisabled => {
    debugger
    if (isDisabled) currentRecord.setValue({ fieldId: constants.AssetFields.REPLACED_BY, value: false, ignoreFieldChange: true })

    const replacedByChecked = currentRecord.getValue({ fieldId: constants.AssetFields.REPLACED_BY })

    if (isDisabled || !replacedByChecked) currentRecord.setValue({ fieldId: constants.AssetFields.REPLACED_BY_MACHINE, value: '', ignoreFieldChange: true })

    if (replacedBy) replacedBy.isDisabled = isDisabled
    if (replacedByMachine) {
      replacedByMachine.isMandatory = replacedByChecked
      replacedByMachine.isDisabled = !replacedByChecked
    }
  }

  const otherFieldsDisabled = isDisabled => {
    debugger
    if (isDisabled) currentRecord.setValue({ fieldId: constants.AssetFields.OTHER, value: false, ignoreFieldChange: true })

    const otherChecked = currentRecord.getValue({ fieldId: constants.AssetFields.OTHER })

    if (isDisabled || !otherChecked) currentRecord.setValue({ fieldId: constants.AssetFields.OTHER_REASON, value: '', ignoreFieldChange: true })

    if (other) other.isDisabled = isDisabled
    if (otherReason) {
      otherReason.isMandatory = otherChecked
      otherReason.isDisabled = !otherChecked
    }
  }

  /**
   * Function to be executed after page is initialized.
   *
   * @param {Object} ctx
   * @param {Record} ctx.currentRecord Current form record
   * @param {string} ctx.mode The mode in which the record is being accessed (create, copy, or edit)
   */
  const pageInit = ctx => {
    debugger
    currentRecord = ctx.currentRecord

    bankruptcy = currentRecord.getField({ fieldId: constants.AssetFields.BANKRUPTCY })
    failedDebit = currentRecord.getField({ fieldId: constants.AssetFields.FAILED_DEBIT })
    wrongRates = currentRecord.getField({ fieldId: constants.AssetFields.WRONG_RATES })
    contractExp = currentRecord.getField({ fieldId: constants.AssetFields.CONTRACT_EXPIRED })

    replacedBy = currentRecord.getField({ fieldId: constants.AssetFields.REPLACED_BY })
    replacedByMachine = currentRecord.getField({ fieldId: constants.AssetFields.REPLACED_BY_MACHINE })

    other = currentRecord.getField({ fieldId: constants.AssetFields.OTHER })
    otherReason = currentRecord.getField({ fieldId: constants.AssetFields.OTHER_REASON })

    const assetType = currentRecord.getValue({ fieldId: constants.AssetFields.TYPE })

    standaloneLockFieldsDisabled(assetType !== constants.AssetTypes.FRANKING_MACHINE)
    replacedByFieldsDisabled(assetType !== constants.AssetTypes.FRANKING_MACHINE)
    otherFieldsDisabled(assetType !== constants.AssetTypes.FRANKING_MACHINE)
    currentRecord.setValue({ fieldId: constants.AssetFields.LOCKED, value: shouldBeLocked(), ignoreFieldChange: true })
  }

  /**
   * Function to be executed when field is changed.
   *
   * @param {Object} ctx
   * @param {Record} ctx.currentRecord Current form record
   * @param {string} ctx.sublistId Sublist name
   * @param {string} ctx.fieldId Field name
   * @param {number} ctx.lineNum Line number. Will be undefined if not a sublist or matrix field
   * @param {number} ctx.columnNum Line number. Will be undefined if not a matrix field
   */
  const fieldChanged = ctx => {
    debugger
    const assetType = currentRecord.getValue({ fieldId: constants.AssetFields.TYPE })

    switch (ctx.fieldId) {
      case constants.AssetFields.TYPE:
        standaloneLockFieldsDisabled(assetType !== constants.AssetTypes.FRANKING_MACHINE)
        replacedByFieldsDisabled(assetType !== constants.AssetTypes.FRANKING_MACHINE)
        otherFieldsDisabled(assetType !== constants.AssetTypes.FRANKING_MACHINE)
        currentRecord.setValue({ fieldId: constants.AssetFields.LOCKED, value: shouldBeLocked(), ignoreFieldChange: true })

        break

      case constants.AssetFields.BANKRUPTCY:
      case constants.AssetFields.FAILED_DEBIT:
      case constants.AssetFields.WRONG_RATES:
      case constants.AssetFields.CONTRACT_EXPIRED:
        currentRecord.setValue({ fieldId: constants.AssetFields.LOCKED, value: shouldBeLocked(), ignoreFieldChange: true })

        break

      case constants.AssetFields.REPLACED_BY:
        currentRecord.setValue({ fieldId: constants.AssetFields.LOCKED, value: shouldBeLocked(), ignoreFieldChange: true })
        replacedByFieldsDisabled(false)

        break

      case constants.AssetFields.OTHER:
        currentRecord.setValue({ fieldId: constants.AssetFields.LOCKED, value: shouldBeLocked(), ignoreFieldChange: true })
        otherFieldsDisabled(false)

        break

      default:
        break
    }
  }

  /**
   * Validation function to be executed when record is saved.
   *
   * @param {Object} ctx
   * @param {Record} ctx.currentRecord Current form record
   * @returns {boolean} Return true if record is valid
   */
  const saveRecord = ctx => {
    debugger
    const replacedByChecked = currentRecord.getValue({ fieldId: constants.AssetFields.REPLACED_BY })
    const otherChecked = currentRecord.getValue({ fieldId: constants.AssetFields.OTHER })

    if (replacedByChecked && !currentRecord.getValue({ fieldId: constants.AssetFields.REPLACED_BY_MACHINE })) {
      return false
    }

    if (otherChecked && !currentRecord.getValue({ fieldId: constants.AssetFields.OTHER_REASON })) {
      return false
    }
    return true
  }

  return {
    pageInit,
    fieldChanged,
    saveRecord,
  }
})
