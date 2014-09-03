Router.configure({
  notFoundTemplate: 'notfound'
})
Router.map(function() {
  this.route('home', {path: '/'});
  this.route('secret', {path:'/secret'});
  this.route('success', {
  	path:'/success/:_id',
  	waitOn: function(){ Session.set("secretId", (this.params._id))}
  });
  this.route('incoming', {
  	path:'/id/:_id',
  	waitOn: function(){ Session.set("secretId", (this.params._id)) }
  })
});