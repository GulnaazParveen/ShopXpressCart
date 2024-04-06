import usercollection from "../model/accountSchema.js"
import { product,  anotherproducts } from "../model/product.js";

class shopping {
    static home = async (req, res) => {
        // res.render('index');
        try{
            const  products=await product.find()
            const  products2=await anotherproducts.find()

            // console.log(products);
            res.render('index', { title: '' ,datas:products,anotherDatas:products2})
        }catch(error){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
       
    }
    static login = (req, res) => {
        res.render('login', { title: '' })
    }
    static registerpagedisplay = (req, res) => {
        // res.render('register')
        res.render('register', { title: '' });
    }
    static shoppingcart = (req, res) => {
        res.render('shoppingcart')
    }
    static addtocart = (req, res) => {
        res.render('addToCart')
    }
    static shop = (req, res) => {
        res.render('shop')
    }
    static userdatafetch = async (req, res) => {
        try {
            const { name, email, password, Confirmpassword } = req.body; // Destructuring req.body

            console.log("Password:", password);
            console.log("Confirm Password:", Confirmpassword);

            if (password !== Confirmpassword) {
                console.log("Passwords do not match");
                res.render('register', { title: 'Password does not match' }); // Return early to prevent further execution
            }

            const userWithEmail = await usercollection.findOne({ email: email });
            if (userWithEmail) {
                res.render('register', { title: 'Email already exists, please choose a different one' });
            } else {
                const userdoc = new usercollection({
                    name: name,
                    email: email,
                    password: password,
                    Confirmpassword: Confirmpassword,
                });
                // save document
                await userdoc.save();
                res.redirect('/login'); // Corrected syntax for res.redirect
            }
        } catch (error) {
            console.log(error);
            res.render('register', { title: 'An error occurred, please try again later' });
        }
    }
    // static varifiedLogin = async (req, res) => {
    //     try {
    //         // when login page is submit
    //         const { email, password } = req.body
    //         const resultid = await usercollection.findById(res.params.id)
    //         const result = await usercollection.findOne({ email: email });
    //         // console.log(result.email); this will print database email
    //         // result null when email is not present in database
    //         if (result != null) {
    //             if (result.email == email && result.password == password) {
    //                 res.render('index', { title: 'resultid' })
    //             } else {
    //                 res.render('login', { title: 'plz  enter the valid email or password' })
    //             }
    //         } else {
    //             res.render('login', { title: ' you are not a registered user' })
    //         }

    //     }
    //     catch (error) {
    //         console.log(error);
    //     }

    // }
    
    // static logoutUser = async (req, res) => {
    //     try {
    //         const userId = req.params.id;
    //         if (!userId) {
    //             return res.status(400).send("User ID not provided");
    //         }

    //         await usercollection.findByIdAndDelete(userId);
    //         res.redirect('/login');
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send("An error occurred during logout");
    //     }
    // }
    static logoutUser = async (req, res) => {
        try {
            // Destroy the user session
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    return res.status(500).send("An error occurred during logout");
                }
                // Redirect to home page after successfully logging out
                res.redirect('/');
            });
        } catch (error) {
            console.error("Error logging out:", error);
            res.status(500).send("An error occurred during logout");
        }
    }
    
    static varifiedLogin = async (req, res) => {
        try {
            const { email, password } = req.body
            const result = await usercollection.findOne({ email: email, password: password });
    
            if (result) {
                req.session.userId = result._id; // Store user ID in session
                res.redirect('/'); // Redirect to home page
            } else {
                res.render('login', { title: 'Please enter a valid email or password' });
            }
        } catch (error) {
            console.log(error);
            res.render('login', { title: 'An error occurred, please try again later' });
        }
    }
    

}



export default shopping
