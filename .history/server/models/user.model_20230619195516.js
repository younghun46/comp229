import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
     name: {
	type: String, 
	trim: true,
	required: 'Name is required' 
    },
    email: {
	type: String, 
	trim: true,
	unique: 'Email already exists',
	match: [/.+\@.+\..+/, 'Please fill a valid email 	address'], 
	required: 'Email is required'
    },
    created: {
	type: Date, 
	default: Date.now
	},
	updated: Date,
hashed_password: { 
	type: String,
	required: "Password is required" 
},
	salt: String


 })
export default mongoose.model('User', UserSchema)
