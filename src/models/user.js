import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    }
});

userSchema.statics.findByLogin = async function(login){
    let user = await this.findOne({username:login});
    if(!user){
        user = await this.findOne({email:login});
    }
    return user;
}

userSchema.pre('remove', function(next) {
    this.model('Message').deleteMany({ user: this._id }, next);
  });
  
const user = new mongoose.model('user',userSchema);

export default user;