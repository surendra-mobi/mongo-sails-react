module.exports = {
  attributes: {
    appointmentDate:{type:"string", columnType: 'date'},
    appointmentTime: "number",
    appointmentType: "string",
    discount: "number",
    total: "number",
    paymentDetails:{type:"json"},
    disountDetails:{type:"json"},
    isRefunded: "number",
    refundAmount: "number",
    patientTimeZone: "string",
    patient:{
    	model:"User"    	
    },
    provider:{
    	model:"Provider"    	
    },
    isActive: "number",
    isCompleted: "number",
  }
};

