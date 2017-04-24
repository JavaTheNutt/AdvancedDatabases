conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
/**
 * BEGIN REPORT GENERATION
 */
/**
* FOOD_TRANSACTION SECTION
*/
print();
print('****************************************');
print();
print('** FOOD TRANSACTION SECTION');
print();
print('****************************************');
print();
var allTransactions = db.food_transactions.find();

if (allTransactions && allTransactions.hasNext()) {
	print('* showing all transactions');
	print();
	while(allTransactions.hasNext()){
		printjson(allTransactions.next());
	}
}
print();
print('****************************************');
print();
print('****************************************');
print();
var aldiTransactions = db.food_transactions.find({supplier: 'aldi'});

if (aldiTransactions && aldiTransactions.hasNext()) {
	print('* showing all aldi transactions');
	print();
	while(aldiTransactions.hasNext()){
		printjson(aldiTransactions.next());
	}
}
print();
print('****************************************');
print();
print('****************************************');
print();
var eddardTransactions = db.food_transactions.find({user: 'eddardstark@gmail.com'});

if (eddardTransactions && eddardTransactions.hasNext()) {
	print('* showing all aldi transactions');
	print();
	while(eddardTransactions.hasNext()){
		printjson(eddardTransactions.next());
	}
}
print();
print('****************************************');
print();
print('****************************************');
print();
var spendByFood = db.food_transactions.aggregate([
	{$unwind: '$items'},
	{$group: {
		_id: '$items.name',
		total:{
			$sum: "$items.cost"
		}
	}},
	{$project: {total: 1}},
	{$sort: {total: -1}}
]);

if (spendByFood && spendByFood.hasNext()) {
	print('* showing spending by food type');
	print();
	while(spendByFood.hasNext()){
		printjson(spendByFood.next());
	}
}
print();
print('****************************************');
print();
print('****************************************');
print();
var spendByUser = db.food_transactions.aggregate([
		{$unwind: '$items'},
		{$group: {
			_id: '$user',
			total:{
				$sum: '$items.cost'
			}
		}},
		{$project: {total: 1}},
		{$sort: {total: -1}}
])

if (spendByUser && spendByUser.hasNext()) {
	print('* showing spending by user');
	print();
	while(spendByUser.hasNext()){
		printjson(spendByUser.next());
	}
}
print();
print('****************************************');
print();
print('****************************************');
print();
var spendByShop = db.food_transactions.aggregate([
		{$unwind: '$items'},
		{$group: {
			_id: '$supplier',
			total: {
				$sum: '$items.cost'
			}
		}},
		{$project: {total: 1}},
		{$sort: {total: -1}}
])
if (spendByShop && spendByShop.hasNext()) {
	print('* showing spending by shop');
	print();
	while(spendByShop.hasNext()){
		printjson(spendByShop.next());
	}
}
