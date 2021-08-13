/**
 * Provides.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200
    },
    password: {
      type: 'string',
      required: true,
      protect: true
    },
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'confirmed',    
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 60
    },
    lastName: {
      type: 'string',
      required: true,
      maxLength: 60
    },
    gender: 'string',   
    address: {
      type: 'json'
    },    
    dateOfBirth: {
      type: 'string',
      columnType: 'date' 
    },
    profileImage: {type: 'json', columnType: 'array'},
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    passwordResetToken: 'string',
    passwordResetTokenExpiresAt: 'number',
    emailProofToken: 'string',
    emailProofTokenExpiresAt: 'number',    
    tosAcceptedByIp:'string',
    nationalProviderIdentifiernumber: {
        type: 'string',
        allowNull: true   
    },
    isAcceptingNewPatient: {
        type: 'number',
        allowNull: false   
    },
    hasVirtualVisit: {
        type: 'number',
        allowNull: false   
    },
    allowedPatient: {
        type: 'number',
        allowNull: false   
    },
    allowOnline: {
        type: 'number',
        allowNull: false   
    },
    insuranceAccepted: {
        type: 'string',
        allowNull: false   
    },
    customInsurance: {
        type: 'string',
        allowNull: false   
    },
    languagesSpoken: {
        type: 'json',
    },
    patientTreated: {
        type: 'string',    
        allowNull: true
    },    
    providerTrainingDetails:{type:'json'},
    providerDegreeDetails:{type:'json'},
    providerMedicalSpecialities:{type:'json'},
    providerPracticeLocations: {collection:"ProviderPracticeDetail", via: 'provider'},
    appointments:{collection:"Appointment",   via: 'provider'}
 }
};

