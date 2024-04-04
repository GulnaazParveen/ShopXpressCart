// import  express from 'express';
// const router=express.Router();
// import shopping from "../controller/shopingcontroller.js";

// router.get('/',shopping.home);

// router.get('/login',shopping.login);
// router.get('/register',shopping.registerpagedisplay);
// router.get('/shoppingCart',shopping.shoppingcart);
// router.get('/shop',shopping.shop)
// router.post('/signup',shopping.userdatafetch);
// router.post('/loginUser/:id',shopping. varifiedLogin)
// router.post('/logout/:id',shopping.logoutUser)
// export default router

import express from 'express';
const router = express.Router();
import shopping from "../controller/shopingcontroller.js";
import usercollection from '../model/accountSchema.js';

// Middleware to check if user is logged in
router.use(async (req, res, next) => {
    if (req.session && req.session.userId) {
        const user = await usercollection.findById(req.session.userId);
        res.locals.user = user; // Make user available in all views
    } else {
        res.locals.user = null; // Set user to null if not logged in
    }
    next();
});


router.get('/', shopping.home);
router.get('/login', shopping.login);
router.get('/register', shopping.registerpagedisplay);
router.get('/shoppingCart', shopping.shoppingcart);
router.get('/shop', shopping.shop)
router.post('/signup', shopping.userdatafetch);
router.post('/loginUser/:id', shopping.varifiedLogin);
router.post('/logout/:id', shopping.logoutUser);

export default router;
