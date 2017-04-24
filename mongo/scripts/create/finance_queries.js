conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
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


