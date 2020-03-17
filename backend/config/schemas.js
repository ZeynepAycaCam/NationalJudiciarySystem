const schema = require('schm');
const { validate } = schema;

const CITIZEN = schema({
    TCKno: {
        type: Number,
        min: [0],
        required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    apartmentNo: { type: Number, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    dateOfBirth: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
});

module.exports = { CITIZEN };