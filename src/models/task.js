const mongoose = require("mongoose");

const checklistSchema = mongoose.Schema({
	name: { type: String, require: true },
	done: { type: Boolean, default: false },
	checklist: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Checklists",
		required: true,
	},
});

module.exports = mongoose.model("Checklists", checklistSchema);
