const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please add a company name'],
    },
    ownerName: {
      type: String,
    },
    totalEmployee: {
      type: String,
    },
    location: {
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please add a company description.'],
    },
    logo: {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
