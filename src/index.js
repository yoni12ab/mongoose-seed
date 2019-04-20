import 'dotenv/config';
import bodyParser from 'body-parser';
import uuidv4 from 'uuid/v4';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import models,{connectDb} from './models';
const app = express();
 app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(async (req, res, next) => {
    req.context = {
      models,
      me: await models.User.findByLogin('yoni'),
    };
    next();
  });
 
 app.use('/session', routes.session);
 app.use('/users', routes.user);
 app.use('/messages', routes.message);

 const eraseDatabaseOnSync = true;
 connectDb().then(async ()=>{
    if (eraseDatabaseOnSync) {
        await Promise.all([
          models.User.deleteMany({}),
          models.Message.deleteMany({}),
        ]);
        createUsersWithMessages();
      }

    app.listen(process.env.PORT,()=>{
        console.log(`Start listen on port ${process.env.PORT}`);
    });
 });

 const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'yoni',
      });
    
      const user2 = new models.User({
        username: 'ddavids',
      });
    
      const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
      });
    
      const message2 = new models.Message({
        text: 'Happy to release ...',
        user: user2.id,
      });
    
      const message3 = new models.Message({
        text: 'Published a complete ...',
        user: user2.id,
      });
    
      await message1.save();
      await message2.save();
      await message3.save();
    
      await user1.save();
      await user2.save();
  };






  