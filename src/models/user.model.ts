import * as mongoose from 'mongoose'

// esta interface é somente para nao perder a abstração, pois o tipo mongoDocument nao mostra os parametros registrados.
export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, unique: true},
  password: {type: String, select: false}
});

export const User = mongoose.model<User>('User', userSchema);
