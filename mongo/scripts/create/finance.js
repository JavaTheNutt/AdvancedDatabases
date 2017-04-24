conn = new Mongo('localhost:27017');
db = conn.getDB("finance_tracker");
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
