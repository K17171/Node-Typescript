import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {UserValidators} from '../validators/UserValidators';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/send/verification/email', GlobalMiddleWare.authenticate, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/reset/password', UserValidators.sendResetPasswordEmail(), GlobalMiddleWare.checkError,
            UserController.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleWare.checkError,
        UserController.verifyResetPasswordToken)
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signUp(), GlobalMiddleWare.checkError, UserController.signUp);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddleWare.checkError,
            GlobalMiddleWare.authenticate, UserController.verify);
        this.router.patch('/update/password', UserValidators.updatePassword(), GlobalMiddleWare.checkError,
            GlobalMiddleWare.authenticate, UserController.updatePassword)
    }

    deleteRoutes() {

    }
}

export default new UserRouter().router;
