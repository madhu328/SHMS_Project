import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  dob: String,
  age: String,
  gender: String,
  maritalStatus: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  nationality: String,
  email: String,
  phone: String,
  emergencyName: String,
  emergencyPhone: String,
  emergencyRelation: String,
  insuranceProvider: String,
  plan: String,
  policyNumber: String,
  groupNumber: String,
  insuredName: String,
  insuredPhone: String,
  insuredDOB: String,
  smoker: String,
  alcoholPerWeek: String,
  caffeinePerDay: String,
  recreationalDrugs: String,
  allergies: String,
  currentMedications: String,
  bloodGroup: String,
  conditions: String,
  roomType: String,
  bedType: String,
}, { timestamps: true });

// ✅ FIX: Check if already compiled
const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

export default Patient;
