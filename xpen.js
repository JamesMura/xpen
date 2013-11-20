Expenses = new Meteor.Collection("expenses");
if (Meteor.isClient) {
	Template.expenses.expenses = function () {
		return Expenses.find();
	};
	Template.totals.total = function(){
		var total = 0;
		Expenses.find().forEach(function (post) {
			total += post.amount;
		});
		return total;  
	};
	Template.selected_expense.expense = function () {
		var expense = Expenses.findOne(Session.get("selected_expense"));
		return expense;
	};
	
	Template.selected_expense.events({
		'click button#delete':function(event){
			var id = $(event.toElement).data('id');
			console.log(id);
			if (confirm("Are you sure you want to delete?")){
				Expenses.remove(id);
				Session.set("selected_expense",0);
			}
			
		}
	});
	Template.expenses.events({
		'click tr' : function (event) {
			// template data, if any, is available in 'this'
			if (typeof console !== 'undefined')
			var id = $(event.toElement).parent("tr").attr("id");
			console.log(id);
			Session.set("selected_expense",id);
		
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
