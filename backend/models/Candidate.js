import mongoose from "mongoose";

const CandidateSchema=mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    user_id: { type:mongoose.Schema.Types.ObjectId ,ref:'User'},
    
})

const Candidate = mongoose.model('Candidate', CandidateSchema);
export default Candidate
