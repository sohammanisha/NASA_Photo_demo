//const mongoose = require("mongoose") ;
//const UserShema = new mongoose.Schema({
//		password: String,
//		username: String
//	}
//)
//const UserModel = mongoose.model("User", UserShema, "users");
//console.log("In User.js", {UserModel});
//export default UserModel;
//module.exports = {userModel: UserModel};
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

const UserModel = mongoose.model("User", UserSchema, "users");

console.log("In User.js", { UserModel });

// Correct export
module.exports = UserModel;