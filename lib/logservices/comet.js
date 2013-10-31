function Service(config){
  if(!config)
    throw new Error('no comet config found')
}
Service.prototype.log = function(type,message) {
  console.log('comet',type,message);
};
module.exports = Service;