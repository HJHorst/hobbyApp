
'use strict';

angular.module('starter.services',['ngResource'])
        .constant("baseURL","http://213.10.121.4:80/")
        .service('artikelService', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
                this.getArtikelen = function(){                    
                    return $resource(baseURL+"artikelen/:id",null,  {'update':{method:'PUT' }});                    
                };

                this.getArtikelSterren = function(){
                	return $resource(baseURL+"artikelSterren/:id",null, {'update':{method:'PUT'}});
                };

                this.getArtikelCommentaren = function(){
                	return $resource(baseURL+"artikelCommentaren/:id",null, {'update':{method:'PUT'}});
                };

                //Bepaal gemiddelde waardering, gaat niet werken vanwege asynchroon.
                //de functie is al klaar terwijl de promise nog 'hangt'.
                //Het scope-object moet bijgewerkt worden in de controler.
                //Dus deze code moet verplaatst naar controler...bah.
/*
                this.getWaardering = function(artikelId){
                	var sterren = 0;
                	var waarderingen = 0;
                	var waardering = 0;
                	// De verzameling ophalen:
                	this.getArtikelSterren().query({artikelId:artikelId}).$promise
                	.then(function(response){
                		console.log("Gevonden waarderingen: "+ response.length);	
                		for (var i=0;i<response.length;i++) {
                			sterren += response[i].sterren;
                			waarderingen++;
                			console.log('Tussenstand: '+sterren+' na '+waarderingen+' waarderingen');
                		}
	                	if (waarderingen>0) {
	                		waardering = sterren/waarderingen;
	                	} 
	                	console.log('...return');
	                	return {sterren:waardering,waarderingen:waarderingen};
                	},
                	function(error){
                		console.log('Fout '+error.statusText);
                	});
                }
*/                      
        }])

;
