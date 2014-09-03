Template.secret.events({
	'click .close-alert' : function (e){
		$(".alert-div").toggle();
		$("#content-div").removeClass("col-md-8").addClass("col-md-12");
	},
	'click .get-link-btn' : function(e, tmpl){
		var error = false;
		var title = tmpl.find('.title').value;
		if (title.length < 3){
			error = true;
			$('.title-error').show();
		}
		var content1 = tmpl.find('.content').value;
		if (content1.length < 3){
			error = true;
			$('.content-error').show();
		}
		if (error){
			return
		}
		var content2 = ""; // Still waitinf for user2 to fille in.
		var newId = Trades.insert({title: title, content1: content1, content2: content2, answered:false});
		Session.set('secretId', newId)
		Router.go('/success/'+newId);
	}
})


Template.secret.rendered = function(){
	$('.title').tooltip({trigger: 'focus'});
	$('.content').tooltip({trigger: 'focus'});
}

Template.success.helpers({
	secretId : function(){
		return "http://youfirst.meteor.com/id/"+Session.get("secretId");
	},
	topic : function(){
		return Trades.findOne(Session.get("secretId")).title;
	},
	secret1: function(){
		return Trades.findOne(Session.get("secretId")).content1;
	},
	secret2: function(){
		return Trades.findOne(Session.get("secretId")).content2;
	}
})