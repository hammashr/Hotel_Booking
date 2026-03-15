const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    heroImage: {
      type: String,
      required: true,
      trim: true,
    },
    galleryImages: {
      type: [String],
      default: [],
      validate: {
        validator: (images) => Array.isArray(images),
        message: 'galleryImages must be an array of image URLs',
      },
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    beds: {
      type: Number,
      required: true,
      min: 0,
    },
    baths: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    baseLocation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    mapEmbedUrl: {
      type: String,
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

houseSchema.index({ isActive: 1, sortOrder: 1 });

module.exports = mongoose.model('House', houseSchema);
