conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
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