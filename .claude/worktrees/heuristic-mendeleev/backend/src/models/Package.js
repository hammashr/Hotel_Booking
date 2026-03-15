const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      enum: ['Standard'],
    },
    code: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['standard'],
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    minNights: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    perks: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.index({ houseId: 1, code: 1 }, { unique: true });

module.exports = mongoose.model('Package', packageSchema);
