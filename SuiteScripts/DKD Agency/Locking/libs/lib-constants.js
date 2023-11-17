define([], () => {
  const AssetFields = {
    TYPE: 'custrecord_faasset_type',
    LOCKED: 'custrecord_fa_intimus_frankinglocked',
    BANKRUPTCY: 'custrecord_fa_intimus_bankrupt',
    FAILED_DEBIT: 'custrecord_fa_intimus_faileddebit',
    WRONG_RATES: 'custrecord_fa_intimus_rates',
    CONTRACT_EXPIRED: 'custrecord_fa_intimus_contractexp',
    REPLACED_BY: 'custrecord_fa_intimus_replaced',
    REPLACED_BY_MACHINE: 'custrecord_fa_intimus_replaced_by',
    OTHER: 'custrecord_fa_intimus_other',
    OTHER_REASON: 'custrecord_fa_intimus_other_rsn'
  }

  const AssetTypes = {
    HARDWARE: '1',
    MAIL_CREATION: '2',
    ROTATION: '3',
    CARTOUCHEUSE: '4',
    COIN_COUNTER: '5',
    CUTTING_MACHINE: '6',
    DETECTOR: '7',
    FOLDING_MACHINE: '8',
    FRANKING_MACHINE: '9',
    INSERTER: '10',
    LABELLER: '11',
    LAMINATOR: '12',
    LAN_MODULE: '13',
    LETTEROPENER: '14',
    LOCKERSTATION: '15',
    MONEY_COUNTER: '16',
    MONEY_SCALE: '17',
    PERFODEPOSIT: '18',
    PRINTER: '19',
    PROJECTOR: '20',
    SHREDDER: '21',
    SIGNING_MACHINE: '22',
    SOFTWARE: '23',
    SORTER: '24',
    STAMPING_MACHINE: '25',
    STRAP_MACHINE: '26',
    UNWINDER: '27',
    CREASER: '28',
    ENVELOP_CLOSER: '29',
    FIXED_ASSET: '30',
    RENTAL_ASSET: '31',
    HEAVY_EQUIPMENT: '32',
    MOTOR_VEHICLE: '33',
    RACING_CAR: '34'
  }

  return {
    AssetFields, AssetTypes
  }
})