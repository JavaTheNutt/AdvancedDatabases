/**
 * This is the overall file for the assignment. The data can be populated in a number of ways. 
 * 1.) Run as a script.
 *     To do this, just save this file as a javascript file (.js). Open command prompt/terminal and use the command `mongo path\to\file.js`. 
 *     NOTE:
 *     In order for this method to work, either the mongo shell must be added to your path, or you must type the relative path to this file from the mongo installations `bin/` dir.
 * 
 * 2.) Copy data directly.
 *     To do this, copy the `db.collection.insertMany()` statements in the highlighted section and paste them to the mongo shell.
**/
conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
db.dropDatabase();
db = conn.getDB("finance_tracker");

/**
 * BEGIN DATA INSERTION
*/
/**
 * INSERT TO USERS COLLECTION
 */
db.users.insertMany([{
  userFirstName: 'eddard',
  userSurname: 'stark',
  userEmail: 'eddardstark@gmail.com'
}, {
  userFirstName: 'catelyn',
  userSurname: 'tully',
  userEmail: 'catelynstark@gmail.com'
}, {
  userFirstName: 'robb',
  userSurname: 'stark',
  userEmail: 'robbstark@gmail.com'
}]);
db.users.createIndex({userEmail:1}, {unique: true});
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
/**
 * INSERT TO FINANCE COLLECTION
 */
/**
 * INSERT TO FINANCE COLLECTION
 */
db.finance.insertMany([{
    user: 'eddardstark@gmail.com',
    amount: 1234.56,
    isIncome: true,
    title: 'wages',
    timestamp: '1492807458'
}, {
    user:'catelynstark@gmail.com',
    amount: 2798.90,
    isIncome: true,
    title: 'wages',
    timestamp: '1492807458'
},{
    user: 'robbstark@gmail.com',
    amount: 100,
    isIncome: true,
    title: 'allowance',
    timestamp: '1492807458'
},{
    user: 'robbstark@gmail.com',
    amount: 150,
    isIncome: true,
    title: 'wages',
    timestamp: '1492807458'
}, {
    user:'eddardstark@gmail.com',
    amount: 100,
    isIncome: false,
    title: 'allowance',
    timestamp: '1492807458'
},{
    user: 'eddardstark@gmail.com',
    amount: 100,
    isIncome: false,
    title: 'clothes',
    timestamp: '1492807458'
}, {
    user:'catelynstark@gmail.com',
    amount: 70,
    isIncome: false,
    title: 'clothes',
    timestamp: '1492807458'
},{
    user: 'robbstark@gmail.com',
    amount: 100,
    isIncome: false,
    title: 'clothes',
    timestamp: '1492807458'
}, {
    user:'eddardstark@gmail.com',
    amount: 300,
    isIncome: false,
    title: 'new_phone',
    timestamp: '1492807458'
}])
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
 /**
 * BEGIN DATA AGGREGATION
 **/
 /**
  * This will aggregate all of the single items contained in each food_transactions, 
  * and insert a list of expenditures into the finance collection
  **/
db.finance.insertMany(db.runCommand({
    aggregate: 'food_transactions',
    pipeline: [
        {$match: {hasBeenAggregated: false}},
        {$unwind: '$items'},
        {$group:{_id: '$_id',amount:{$sum: '$items.cost'}, user:{$first:'$user'}, timestamp:{$first: '$timestamp'}}},
        {$project: {
            _id:0,
            user:1,
            amount:1,
            isIncome: {$literal: false},
            title:{$literal: 'food_shopping'},
            timestamp:1
        }}
    ]
}).result);

/**
 * This will aggregate the food transactions in preperation for insertion to the food_details collection
 */
var food_result = db.runCommand({
    aggregate: 'food_transactions',
    pipeline:[
        {$match:{hasBeenAggregated: false}},
        {$unwind:'$items'},
        {$project: {
            _id:0,
            name: '$items.name',
            supplier:'$items.supplier',
            measurementSymbol: '$items.measureSymbol',
            expiryDate: '$items.expiry',
            currentStock: '$items.amount'
        }}
    ]
});
/**
 * This will handle inserting the data to the food_details collection. If a record already exists with the same
   name, supplier and expiry date, that record will be updated. Otherwise, a new record is created.
 */
food_result.result.forEach(function(item){
    print('updating record for {name:' + item.name + ', supplier:' + item.supplier + ', expiry:' + item.expiryDate + '}');
    var currentRecord = db.food_details.findOne({name: item.name, supplier: item.supplier, expiryDate: item.expiryDate});
    if(currentRecord){
        print('record exists, updating record');
        db.food_details.updateOne(
            {_id: currentRecord._id},
            {$set: {currentStock: currentRecord.currentStock + item.currentStock}}
        )
    }else{
        db.food_details.insertOne(item);
       print('record does not exist, inserting new record'); 
    }
    print();
})
/**
 * This will update the hasBeenAggregated flag so that duplicate
   copies are not inserted into the other tables if this script is run again
 */
db.food_transactions.updateMany(
    {hasBeenAggregated: false},
    {$set:{hasBeenAggregated: true}}
)
/**
 * END DATA AGGREGATION
 */
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
/**
 * FOOD DETAILS REPORTS
 */
print();
print('****************************************');
print();
print('** FOOD DETAILS SECTION');
print();
print('****************************************');
print();
var allDetails = db.food_details.find();

if(allDetails && allDetails.hasNext()){
    print('* showing all current food stocks');
    print();
    while(allDetails.hasNext()){
        printjson(allDetails.next());
    }
}
print();
print('****************************************');
print();
print('****************************************');
print();
var allFoodWeighedInGrams = db.food_details.find({measurementSymbol: 'g'});

if(allFoodWeighedInGrams && allFoodWeighedInGrams.hasNext()){
    print('* showing all current food stocks that are measured in grams');
    print();
    while(allFoodWeighedInGrams.hasNext()){
        printjson(allFoodWeighedInGrams.next());
    }
}
print();
print('****************************************');
print();
print('****************************************');
print();
var allFoodBySupplier = db.food_details.aggregate([
    {$group: {
        _id: '$supplier',
        food_items: {$push:'$$ROOT'}
    }},
    {$project:{food_items:1}}
]);

if(allFoodBySupplier && allFoodBySupplier.hasNext()){
    print('* showing all current food stocks grouped by supplier');
    print();
    while(allFoodBySupplier.hasNext()){
        printjson(allFoodBySupplier.next());
    }
}
print();
print('****************************************');
print();
print('****************************************');
print();
var allFoodByName = db.food_details.aggregate([
    {$group: {
        _id: '$name',
        total_weight:{$sum:'$currentStock'},
        measure: {$first: '$measurementSymbol'}
    }},
    {$project:{total_weight:{$concat:[{$substr:['$total_weight', 0, -1]}, '$measure']}}}
]);
if(allFoodByName && allFoodByName.hasNext()){
    print('* showing all current food stocks in the house, irrespective of supplier');
    print();
    while(allFoodByName.hasNext()){
        printjson(allFoodByName.next());
    }
}
/**
 * FINANCE REPORTS
 */
print();
print('****************************************');
print();
print('** FINANCE SECTION');
print();
print('****************************************');
print();

var allTransactions = db.finance.find();

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
var allIncomes = db.finance.find({isIncome: true});

if (allIncomes && allIncomes.hasNext()) {
    print('* showing all incomes');
    print();
    while(allIncomes.hasNext()){
        printjson(allIncomes.next());
    }
}
print();
print('****************************************');
print();
print('****************************************');
print();

var perUserDetails = db.finance.aggregate([
  {$project:{
    user:1,
    income:{ 
      $cond:{if: {$cmp:["$isIncome", true]}, then: '$amount', else: 0}
    },
    expenditure:{ 
      $cond:{if: {$cmp:["$isIncome", false]}, then: '$amount', else: 0}
    }
  }},
    {$group:{
      _id: '$user',
      total_income: {
        $sum: '$expenditure'
      },
      total_expenditure:{
        $sum: '$income'
      }
    }},
    {$project:{ total_income: 1,total_expenditure:1, balance:{
      $subtract:['$total_income', '$total_expenditure']
    }}},
    {$sort:{ total_income: -1}}
  ])

if (perUserDetails && perUserDetails.hasNext()) {
    print('* showing financial details per user');
    print();
    while(perUserDetails.hasNext()){
        printjson(perUserDetails.next());
    }
}
/**
 * END REPORT GENERATION
 */