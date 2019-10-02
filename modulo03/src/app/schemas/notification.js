import { Schema, model } from 'mongoose';

// Definition of The Model Schema - Table
const NotificationSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // This option adds createdAt & updatedAt columns to new table
    timestamps: true,
  }
);

export default model('Notification', NotificationSchema);
