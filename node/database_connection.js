// This file has all the code that can maintain connection to the database

// Import the modules that are installed for this module.
var mysql = require('mysql');
const fs = require('fs');
const utility = require('./utility')

// Export the function to other files that add these into it.
module.exports = 
{
	setup_database,
	create_connection,
	connect_database,
	addlogstodb
}

function setup_database()
{
	// Get the connection object given the credentials
	connection = create_connection(host, user, db_pswd, database);

	// Connect to the database
	connect_database(connection)
	
	// Insert into study table if not yet done.
	add_study(config["study_id"]);

}

function create_connection(host, user, password, database)
{
	// Create a mysql connection with all the credentials
	var connection = mysql.createConnection(
	{
		host: host,
		user: user,
		password: password,
		database: database
	});

	return connection;
}

function connect_database(connection)
{
	// Connect to the above database
	// Errors are handled and will be logged.
	connection.connect(function(error)
	{
		if(!!error)
		{
			console.log(error);
		}
		else
		{
			console.log('connected');
		}
	});

} 

// Insert study into study table if not already exists
function add_study(study_id)
{
	var sql = "select * from study where study_id ='" + study_id + "'";

	connection.query(sql,function(error,response)
	{
		if(error)
		{
			console.log(error);
			res.redirect('/');
		}	

		if (response.length <= 0)
		{
			insert_sql = "insert into study values(?,?,?)";

			created_date = new Date()

			connection.query(insert_sql,[study_id, created_date,null],function(error,rows,response2)
			{
				if(!!error)
				{
					return console.log(error);
				}
				else
				{
					console.log('Successfully inserted study into the database');
				}	
			});
		}

	});
}

function addlogstodb(logs, network_no, study_id, user_id)
{
	console.log(logs, network_no);
	data = eval(logs);
	for(var i = 0; i < data.length; i++) {
		if (i == 0)
		{
			continue;
		}
		
		var obj = data[i];
		console.log(obj)
		if(obj != null)
		{
			insert_sql = "insert into logs values(?,?,?,?,?,?,?)";
			connection.query(insert_sql,[obj["timestamp"], study_id, user_id, network_no, obj["ID"], obj["button"], obj["resources"]],function(error,rows,response)
			{
				if(!!error)
				{
					return console.log(error);
				}
				else
				{
					console.log('Successfully inserted logs into the database');
				}	
			});
		}
	}
	
	console.log(data);
}