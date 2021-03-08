import userController from '../controllers/userController';


export default (app) => {

app.route('/login')
.post(userController.login)

}

