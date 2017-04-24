conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
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
