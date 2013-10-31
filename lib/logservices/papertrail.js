function Service(config){
  if(!config)
    throw new Error('no papertrail config found')
}

Service.prototype.log = function(type,message) {
  console.log('papertrail',type,message);
};
module.exports = Service;