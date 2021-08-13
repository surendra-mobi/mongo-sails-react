const imageUpload = function(req, path, name) {
     return new Promise((resolve, reject)=>{
     		 req.file('images').upload({
           			 dirname: require('path').resolve(sails.config.appPath, 'assets/images')
      		  }, function(err, uploadedFiles) {
      		  	if(err){
      		  		reject(err);
      		  	}
      		  	let finalImage = [];
		        var baseUrl = sails.config.custom.baseUrl;
		        for (let frow of uploadedFiles) {
		            let url = frow["fd"].replace('/var/www/testpeoject/testsails/assets/', baseUrl)
		            finalImage.push(url);
		        }
		       // console.log(finalImage);
      		  	resolve(finalImage);
      		  });
     })
};

module.exports ={
imageUpload
}

