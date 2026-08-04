const mongoose = require("mongoose");

const accountschema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: [true, "ACCOUNT MUST BE ASSOCIATED WITH SPECIFIC USER"],
            index: true
        },
        status: {
            type: String,
            enum: {
                values: ["ACTIVE", "FROZEN", "CLOSED"]
            },
            default: "ACTIVE"
        },
        currency: {
            type: String,
            required: [true, "CURRENCY IS REQUIRED FOR CREATING ACCOUNT"],
            default: "PKR"
        }
        // ✅ Removed extra closing brace and timestamps from here
    },
    {
        timestamps: true // ✅ Correct placement as schema option
    }
);

accountschema.index({ user: 1, status: 1 });

const accountmodel = mongoose.model("account", accountschema);

module.exports = accountmodel;