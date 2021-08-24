const { User } = require('./db/models');
const { asyncHandler } = require('./utils');

const loginUser = (req, res, user)=>{
    req.session.auth = {
        userId: user.id,
    }
}

const restoreUser = asyncHandler(async(req, res, next) => {
    if(req.session.auth){
        const { userId } = req.session.auth;
        const user = await User.findOne({where: {id:userId}});
        if(user){
            res.locals.authenticated = true;
            res.locals.user = user;
        } else {
            res.locals.authenticated = false;
        }
    } else {
        res.locals.authenticated = false;
    }
    next();
});

const logoutUser = (req, res) => {
    delete req.session.auth;
}

module.exports = { loginUser, restoreUser, logoutUser }
