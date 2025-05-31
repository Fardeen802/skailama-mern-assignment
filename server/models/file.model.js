const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    filename: { type: String, required: true },
    transcript: { type: String, default: '' },
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('File', fileSchema);
