/*******
		*
		*  IMPORTATION DE TOUT LES MODULES
		*
********/
/*
***@Core node modules
*/

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var twig = require('twig');
var path = require('path');
var router = require('router');

/*
*** Parse all form data
*/  
app.use(bodyParser.urlencoded({extended: false}));

/*
***@used for formatting dates
*/
var router = express.Router();


/*
moteur de template utiliser est twig
*
*/
app.use(express.static('views'))
app.set('view engine', 'twig');

app.use(express.static(path.join(__dirname,'public')));

/*connexion a notre base de donnée*/

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "agribusiness",
})
con.connect();

/*Global site title and base  url*/

const baseURL = "http://localhost:4000/"

/* charger avec les donnes de la base de donnee*/
app.get('/acceuil', function (req, res){
           
	res.render('../views/pages/acceuil');
})

app.get('/produit', function (req, res){
           
	res.render('../views/pages/produit');
})

app.get('/connexion', function (req, res){
           
	res.render('../views/pages/connexion');
})


/* requete pour inserer dans la base de donnee*/

app.post('/connexion', function(req, res){
	infos = req.body
	let valeur = [req.body.nom_commande, req.body.ville_commande, req.body.contact_commande, req.body.quantite_commade]
	con.query('INSERT INTO commande(nom_commande, ville_commande, contact_commande, quantite_commande) VALUES (?, ?, ?, ?)', valeur, (err,results) =>{
	console.log(req.body);
	if(!err)
	res.render('succes', {infos});
   else 
	console.log(err.message);
	//res.render('/');
	})
});



/* connection au serveur */

var server = app.listen(4000,function(){
	console.log("server started on 4000....");
}); 