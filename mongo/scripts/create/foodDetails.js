conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
/**
 * INSERT TO FOOD_DETAILS COLLECTION
 */
db.food_details.insertMany([{
	name: 'butter',
	supplier: 'kerrygold',
	measurementSymbol: 'g',
	expiryDate: '1492807458',
	currentStock: 227
},{
	name: 'milk',
	supplier: 'avenmore',
	measurementSymbol: 'ml',
	expiryDate: '1492807458',
	currentStock: 1750
},{
	name: 'bread',
	supplier: 'brennans',
	measurementSymbol: 'units',
	expiryDate: '1492807458',
	currentStock: 22
},{
	name: 'coffee_pods',
	supplier: 'tassimo',
	measurementSymbol: 'units',
	expiryDate: '1492807458',
	currentStock: 12
},{
	name: 'instant_coffee',
	supplier: 'aldi',
	measurementSymbol: 'g',
	expiryDate: '1492807458',
	currentStock: 123
},{
	name: 'potatoes',
	supplier: 'aldi',
	measurementSymbol: 'g',
	expiryDate: '1492807458',
	currentStock: 1250
},{
	name: 'bolognase_sauce',
	supplier: 'aldi',
	measurementSymbol: 'ml',
	expiryDate: '1492807458',
	currentStock: 350
},{
	name: 'tea_bags',
	supplier: 'lyons',
	measurementSymbol: 'units',
	expiryDate: '1492807458',
	currentStock: 30
},{
	name: 'cheese',
	supplier: 'dubliner',
	measurementSymbol: 'g',
	expiryDate: '1492807458',
	currentStock: 200
},{
	name: 'ham',
	supplier: 'countrystyle',
	measurementSymbol: 'g',
	expiryDate: '1492807458',
	currentStock: 50
}]);
