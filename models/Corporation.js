const {Schema, model} = require('mongoose');
const CorporationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    industry: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
}),
Corporation = model('Corporation', CorporationSchema);

export default Corporation;