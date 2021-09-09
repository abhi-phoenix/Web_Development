// Get the required modules from the built_in modules
modules = require('./req_modules');
utility = require("./utility");

// Export the function to other files that add these into it.
module.exports =
{
    verfiy_credentials
};

function verfiy_credentials(req, res)
{
    // Get the variables
    //console.log(req);
    username = req.body.username;
    full_name = req.body.name;
    email = req.body.email;

    // query to check if this record already exists.
    var sql = "select name from users where user_id='" + username + "'";

    // Make the query to the database.
    connection.query(sql, async (err, response) =>
    {
        try
        {
            //console.log(response);
            if (response.length > 0)
            {
                // The entered credentials already exists
                var string = encodeURIComponent('Username already exists');
                res.redirect('/login?valid=' + string);
            }
            else
            {
                // The entered credentials donot exist and can be logged in.
                var sql = "insert into users values(?,?,?)";

                //connection.query(sql,[username, full_name, email],function(error,rows,response1)
                connection.query(sql,[username, full_name, email],function(error,rows,response1)
                {
                    if(!!error)
                    {
                        console.log("Error while inserting new user" + error);
                        res.redirect("/error");
                    }
                    else
                    {
                        console.log('successful query inside login!!');
                        res.redirect("/landing_page");
                    }
                });
            }

        }
        catch(err)
        {
            console.log(err);
            res.redirect("/error");
        }

    });

}
