module.exports = (req, res, next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('/users/login')
    }
    else{
      // console.log('is logged in', req.session.isLoggedIn)
    }
    next();
   }