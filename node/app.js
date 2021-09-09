
// Get the required modules from the built_in modules
modules = require('./req_modules');

// Get the modules from the database_connection module.
db_connection = require('./database_connection');

// Get the functions from utility module.
utility = require('./utility');

// Get the functions from routes module
routes = require('./routes')

// Get the functions from login module
user_login = require('./login');

// Use the express app object created.
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// Set the global variables
var port_no = 2000;
var curr_user_id = "";
var study_id = config.study_id;
var start_time = new Date();

// Setup the database with the necessary additions into tables
db_connection.setup_database(start_time);

// Error page (invoked when there is an error)
app.get("/error",function(req,res)
{
    res.render("error.ejs");
});

// This is an endpoint (login page)
app.get("/login",function(req,res)
{
  var passedVariable = req.query.valid;
	res.render("login_page.ejs", {message_login: passedVariable});
});

app.post("/verify_login", function(req, res)
{
    curr_user_id = req.body.username;

    user_login.verfiy_credentials(req, res);
});

// This is an endpoint (landing page)
app.get("/landing_page",function(req,res)
{
	res.render("landing_page.ejs",{jsondata: sample_1, networks: network1_json});
});

app.post("/simulation_page_1", function(req, res)
{
    console.log(req.body.logs);
    db_connection.addlogstodb(req.body.logs, req.body.network_no, study_id, curr_user_id);
    res.render("simulation_page_1.ejs");
});

app.post("/network2", function(req, res)
{
    res.render("network2.ejs",{jsondata: sample_2, networks: network2_json});
});

app.post("/simulation_page_2", function(req, res)
{
    db_connection.addlogstodb(req.body.logs, req.body.network_no, study_id, curr_user_id);
    res.render("simulation_page_2.ejs");
});

app.post("/network3", function(req, res)
{
    res.render("network3.ejs",{jsondata: sample_3, networks: network3_json});
});

app.post("/simulation_page_3", function(req, res)
{
    db_connection.addlogstodb(req.body.logs, req.body.network_no, study_id, curr_user_id);
    res.render("simulation_page_3.ejs");
});

app.post("/final", function(req,res)
{
    console.log("I'm here");
	routes.completion(start_time,curr_user_id, study_id, res);
});

app.listen(process.env.port || port_no, function()
{
    if (process.env.port != null)
    {
        console.log("server has started at port " + process.env.port);
    }
    else
    {
        console.log("server has started at port " + port_no);
    }
});
