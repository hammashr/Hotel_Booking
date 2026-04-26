const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  { _id: false }
);

const staySchema = new mongoose.Schema(
  {
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    nights: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const preferencesSchema = new mongoose.Schema(
  {
    unitType: {
      type: String,
      trim: true,
      default: '',
    },
    viewType: {
      type: String,
      trim: true,
      default: '',
    },
    addOns: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2000,
    },
  },
  { _id: false }
);

const pricingSchema = new mongoose.Schema(
  {
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    addOnsFee: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    cleaningFee: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    taxRate: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    cancellationPolicy: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const squareSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      trim: true,
      default: null,
    },
    checkoutUrl: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { _id: false }
);

const bookingRequestSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
      index: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
      index: true,
    },
    guest: {
      type: guestSchema,
      required: true,
    },
    stay: {
      type: staySchema,
      required: true,
    },
    preferences: {
      type: preferencesSchema,
      default: () => ({}),
    },
    pricing: {
      type: pricingSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['none', 'pending', 'paid', 'failed'],
      default: 'none',
      index: true,
    },
    square: {
      type: squareSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

bookingRequestSchema.index({ houseId: 1, 'stay.checkIn': 1, 'stay.checkOut': 1 });

bookingRequestSchema.path('stay').validate(function validateStayDates(value) {
  if (!value || !value.checkIn || !value.checkOut) {
    return false;
  }

  return value.checkIn < value.checkOut;
}, 'checkOut must be after checkIn');

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
