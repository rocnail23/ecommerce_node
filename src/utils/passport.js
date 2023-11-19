const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const {Cart,WishList,User} = require("../models")

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:4000/api/v1/login/google/redirect",
			scope: ["profile", "email"],
		},
	async	function (accessToken, refreshToken, profile, callback) {
          try {
            const user = await User.findOne({where:{email:profile._json.email}})
            if(!user){
                const newDataUser = {
                    name: profile._json.given_name,
                    email: profile._json.email,
                    password: "google",
                    isValid: true
                }
                const newUser = await User.create(newDataUser)
                await Cart.create({user_id:newUser.id})
                await WishList.create({user_id:newUser.id})

                const profileData = {
                    id: newUser.id,
                    email:newUser.email,
                    name:newUser.name
                }

               return callback(null,profileData)
            }else{
               return callback(null, user);
            }
          } catch (error) {
            return callback(error)
          }
			
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

module.exports = passport