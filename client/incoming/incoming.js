Template.incoming.helpers({
	topic: function(){
		return Trades.findOne(Session.get("secretId")).title;
	}

})

Template.incoming.events({
	'click .submit-secret': function(e, tmpl){
		var secretId = Session.get('secretId');
		var secretContent = tmpl.find('.secret-content').value;
		if (secretContent.length < 2){
			$('.input-error').show()
			return;
		}
		else{
			$('.input-error').hide();
		}

		Trades.update(secretId, {$set: {content2: secretContent, answered: true}})
		tmpl.find('.their-secret').innerHTML = Trades.findOne(secretId).content1;
		tmpl.find('.secret-content').disabled = true;
		$('.submit-secret').attr("disabled", "disabled");
	}
})

Template.incoming.rendered = function(){
	//if(Trades.find({$and:[{_id: Session.get('secretId')},{content2:{$exists:true, $ne: ""}}]}).fetch().length == 1)
	var id = Session.get("secretId");
	var currentSecret = Trades.findOne(id).answered;
	if (currentSecret == true){
		$('.already-answered').show();
		$('.secret-content').prop('disabled', true);
		$('.submit-secret').attr("disabled", "disabled");
	}
}