const {Schema, model} = require('mongoose');
const TaskSchema = new Schema({
    trainee:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    supervisor:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    dueDate:{
        type: Date,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
    },
})
const Task = model('Task', TaskSchema);
module.exports = Task;