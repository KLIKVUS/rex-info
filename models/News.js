const { Schema, model, Types } = require("mongoose");

function getFormattedDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('.');
}

const schema = new Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    imgLink: {
        type: String,
        require: false
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        require: true
    },
    created: {
        type: String,
        default: getFormattedDate()
    }
}, { versionKey: false })

module.exports = model("News", schema);