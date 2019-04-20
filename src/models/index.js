import mongoose from 'mongoose';
import User from './user';
import Message from './message';

const connectDb = ()=> {
  return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true })
}

const models = {
  User,
  Message
}

export {
  connectDb
};

export default models;

// export default {
//     users:_getUsers (),
//     messages:_getMessages (),
// }



// function _getUsers () {
//     return {
//     1: {
//       id: '1',
//       username: 'Robin Wieruch',
//     },
//     2: {
//       id: '2',
//       username: 'Dave Davids',
//     },
//   };
// }

// function _getMessages  () {
//     return {
//         1: {
//           id: '1',
//           text: 'Hello World',
//           userId: '1',
//         },
//         2: {
//           id: '2',
//           text: 'By World',
//           userId: '2',
//         },
//       };
// }