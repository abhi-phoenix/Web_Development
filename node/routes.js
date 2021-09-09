// Get the required modules from the built_in modules
modules = require('./req_modules');

// Get the functions from utility module.
utility = require('./utility');

module.exports = {
    completion
}

completion_codes = [];

function completion(start_time,user_id, study_id, res)
{

	var code = utility.randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
	var message = '';
	var sql = "select * from completion_study where user_id = '"+user_id+"'";
  var end_time = new Date();
	connection.query(sql,function(err,response)
	{
		if(err)
		{
			console.log("ERROR: "+err);
			res.redirect('/');
		}
		if(response.length > 0 )
		{
            console.log("running");
            console.log(response);
			message = response[0].completion_code;
			console.log(response[0].completion_code);
			res.render("final_page.ejs", {message: message});
		}
		else
		{
            console.log(study_id, user_id,code);
			var new_sql = "insert into completion_study values(?,?,?,?,?)";
			var new_completion_code = code;
      console.log(start_time, end_time);
			connection.query(new_sql,[study_id, user_id,start_time, end_time, new_completion_code],function(error,rows,resp1)
			{
				if(!!error)
				{
					console.log('error inside completion code: '+error);
					res.redirect('/');
				}else
				{
					console.log('added completion code to database');
					res.render("final_page.ejs", {message: new_completion_code});
				}

				message = code;
			});
		}
	});

}
