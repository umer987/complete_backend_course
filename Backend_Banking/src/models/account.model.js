const mongoose = require("mongoose");
const ledgermodel = require("../models/ledger.model")
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

accountschema.methods.getBalance = async function () {

    const balanceData = await ledgermodel.aggregate([
        { $match: { account: this._id } },
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: [ "$type", "DEBIT" ] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: [ "$type", "CREDIT" ] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balance: { $subtract: [ "$totalCredit", "$totalDebit" ] }
            }
        }
    ])

    if (balanceData.length === 0) {
        return 0
    }

    return balanceData[ 0 ].balance

}


const accountmodel = mongoose.model("account", accountschema);

module.exports = accountmodel;