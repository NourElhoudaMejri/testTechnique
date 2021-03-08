import userController from '../controllers/userController';
import weatherController from '../controllers/weatherController'

export default (app, passport) => {

   
    app.use('/profile', passport.authenticate('jwt', {
        session: false
    })).get('/profile', userController.profile);
    
    app.use('/all-users', passport.authenticate('jwt', {
        session: false
    })).get('/all-users', userController.getAllUsers);

   app.use('/update-user', passport.authenticate('jwt', {
        session: false
    })).post('/update-user', userController.updateUser);

    app.use('/delete-user', passport.authenticate('jwt', {
        session: false
    })).delete('/delete-user', userController.deleteUser);
    
    app.use('/weather', passport.authenticate('jwt', {
        session: false
    })).get('/weather', weatherController.getWeatherByCity);




}