/**
 * Created by joewe on 21/04/2017.
 */
conn = new Mongo('localhost:27017');
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
