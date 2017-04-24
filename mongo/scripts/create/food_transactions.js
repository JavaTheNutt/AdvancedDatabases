/**
 * Created by joewe on 22/04/2017.
 */
conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
db.food_transactions.drop();
/**
 * INSERT TO FOOD_TRANSACTION COLLECTION
 */
db.food_transactions.insertMany([{
	supplier: 'aldi',
	timestamp: '1492807458',
	user: 'eddardstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'butter',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 454,
		measureSymbol: 'g',
		cost: 2.19
	},{
		name: 'milk',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 2000,
		measureSymbol: 'ml',
		cost: 1.49
	}]},{
	supplier: 'tesco',
	timestamp: '1492807458',
	user: 'catelynstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'coffee_pods',
		supplier: 'tassimo',
		expiry: '1492807458',
		amount: 16,
		measureSymbol: 'units',
		cost: 5
	},{
		name: 'cheese',
		supplier: 'dubliner',
		expiry: '1492807458',
		amount: 200,
		measureSymbol: 'g',
		cost: 3
	}]
},{
	supplier: 'aldi',
	timestamp: '1492807458',
	user: 'robbstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'cheese',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 200,
		measureSymbol: 'g',
		cost: 1.28
	},{
		name: 'instant-coffee',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 750,
		measureSymbol: 'g',
		cost: 3
	}]
},{
	supplier: 'tesco',
	timestamp: '1492807458',
	user: 'catelynstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'steak',
		supplier: 'butcher',
		expiry: '1492807458',
		amount: 3,
		measureSymbol: 'units',
		cost: 9
	},{
		name: 'tea',
		supplier: 'lyons',
		expiry: '1492807458',
		amount: 80,
		measureSymbol: 'units',
		cost: 3
	}]
},{
	supplier: 'aldi',
	timestamp: '1492807458',
	user: 'eddardstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'sausages',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 454,
		measureSymbol: 'g',
		cost: 3
	},{
		name: 'ham',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 10,
		measureSymbol: 'units',
		cost: 2.23
	}]
},{
	supplier: 'tesco',
	timestamp: '1492807458',
	user: 'catelynstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'flour',
		supplier: 'odlums',
		expiry: '1492807458',
		amount: 1000,
		measureSymbol: 'g',
		cost: 2.99
	},{
		name: 'cocco_pops',
		supplier: 'kellogs',
		expiry: '1492807458',
		amount: 750,
		measureSymbol: 'g',
		cost: 4
	},{
		name: 'corn flakes',
		supplier: 'kellogs',
		expiry: '1492807458',
		amount: 750,
		measureSymbol: 'g',
		cost: 3
	}]
},{
	supplier: 'aldi',
	timestamp: '1492807458',
	user: 'robbstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'cocco_pops',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 750,
		measureSymbol: 'g',
		cost: 1.28
	},{
		name: 'corn flakes',
		supplier: 'aldi',
		expiry: '1492807458',
		amount: 750,
		measureSymbol: 'g',
		cost: 0.99
	}]
},{
	supplier: 'tesco',
	timestamp: '1492807458',
	user: 'catelynstark@gmail.com',
	hasBeenAggregated:false,
	items:[{
		name: 'ham_joint',
		supplier: 'butcher',
		expiry: '1492807458',
		amount: 1000,
		measureSymbol: 'g',
		cost: 4.5
	},{
		name: 'milk',
		supplier: 'avenmore',
		expiry: '1492807458',
		amount: 2000,
		measureSymbol: 'ml',
		cost: 2.25
	}]
}]);
/**
 * END DATA INSERTION
 */