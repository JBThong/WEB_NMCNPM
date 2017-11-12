var middleware = {
    isLoggedIn: function (req, res, next) {
        
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/login');
    },
    Logged: function (req, res, next) {
        
        // if user isnt authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();
    
        // if they are redirect them to the home page
        res.redirect('/');
    },
    
    LoggedAdmin: function (req, res, next) {
    
        // if user isnt authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();
    
        // if they are redirect them to the home page
        res.redirect('/admin/dashboard');
    },
    
    isAdminAccess: function (req, res, next) {
    
        // if user isnt authenticated in the session, carry on
        if (req.isAuthenticated())
        {
            if (req.user.role_id == 1)
                res.end("401 - Unauthorized: Access is denied due to invalid credentials");
                
        }
        return next();
    }
};

module.exports = middleware;
    
    