CREATE SCHEMA advanced_databases_project;
USE advanced_databases_project;

CREATE TABLE `user_group` (
  `user_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(20) NOT NULL,
  PRIMARY KEY (`user_group_id`),
  UNIQUE KEY `user_group_group_name_uindex` (`group_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='This will represent user groups that will be able to view one anothers transactions';
  CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email_address` varchar(30) NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `user_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_address_uindex` (`email_address`),
  KEY `user_group___fk` (`user_group_id`),
  KEY `user_first_name_surname_index` (`first_name`,`surname`),
  CONSTRAINT `user_group___fk` FOREIGN KEY (`user_group_id`) REFERENCES `user_group` (`user_group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='This will store all of the users in the database';
CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(20) NOT NULL,
  `supplier_type` enum('grocery','utilities','clothing','entertainment','other') NOT NULL DEFAULT 'grocery',
  `supplier_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `supplier_supplier_name_uindex` (`supplier_name`),
  KEY `supplier_supplier_name_index` (`supplier_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
CREATE TABLE `food_categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL,
  `category_location` enum('fridge','freezer','shelf','cupboard','other') NOT NULL DEFAULT 'fridge',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `food_categories_category_name_uindex` (`category_name`),
  UNIQUE KEY `food_categories_category_name_category_location_uindex` (`category_name`,`category_location`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
CREATE TABLE `food_type` (
  `food_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `food_type_name` varchar(20) NOT NULL,
  `standard_measure` int(10) unsigned NOT NULL DEFAULT '1',
  `unit_of_measurement` enum('unit','gram','milliliter','other') NOT NULL DEFAULT 'gram',
  `food_type_category` int(11) NOT NULL,
  PRIMARY KEY (`food_type_id`),
  UNIQUE KEY `food_type_food_type_name_uindex` (`food_type_name`),
  KEY `food_type_category___fk` (`food_type_category`),
  CONSTRAINT `food_type_category___fk` FOREIGN KEY (`food_type_category`) REFERENCES `food_categories` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
CREATE TABLE `current_food_stocks` (
  `current_food_stock_id` int(11) NOT NULL AUTO_INCREMENT,
  `current_standard_units` float(6,3) unsigned NOT NULL,
  `food_type` int(11) NOT NULL,
  `user_group` int(11) NOT NULL,
  PRIMARY KEY (`current_food_stock_id`),
  KEY `current_food_stocks_type___fk` (`food_type`),
  KEY `current_food_stocks_user_group_user_group_id_fk` (`user_group`),
  CONSTRAINT `current_food_stocks_type___fk` FOREIGN KEY (`food_type`) REFERENCES `food_type` (`food_type_id`) ON UPDATE CASCADE,
  CONSTRAINT `current_food_stocks_user_group_user_group_id_fk` FOREIGN KEY (`user_group`) REFERENCES `user_group` (`user_group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COMMENT='This will store all of the current food stocks in the house. This table will need to be optimised for frequent read/writes';
CREATE TABLE `recipe` (
  `recipe_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_name` varchar(40) NOT NULL,
  `description` varchar(2000) NOT NULL,
  PRIMARY KEY (`recipe_id`),
  UNIQUE KEY `recipe_recipe_name_uindex` (`recipe_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
CREATE TABLE `recipe_ingredient` (
  `recipe_ingredient_id` int(11) NOT NULL AUTO_INCREMENT,
  `number_of_units` float(6,3) unsigned NOT NULL,
  `recipe_food_type` int(11) NOT NULL,
  `recipe` int(11) NOT NULL,
  PRIMARY KEY (`recipe_ingredient_id`),
  KEY `recipe_ingedient_food_type_food_type_id_fk` (`recipe_food_type`),
  KEY `recipe_ingredient_recipe_recipe_id_fk` (`recipe`),
  CONSTRAINT `recipe_ingedient_food_type_food_type_id_fk` FOREIGN KEY (`recipe_food_type`) REFERENCES `food_type` (`food_type_id`) ON UPDATE CASCADE,
  CONSTRAINT `recipe_ingredient_recipe_recipe_id_fk` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`recipe_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
CREATE TABLE `food_transaction` (
  `food_transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` int(11) NOT NULL,
  `supplier` int(11) NOT NULL,
  PRIMARY KEY (`food_transaction_id`),
  KEY `food_transaction_user_user_id_fk` (`user`),
  KEY `food_transaction_suppliers_supplier_fk` (`supplier`),
  CONSTRAINT `food_transaction_suppliers_supplier_fk` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`supplier_id`) ON UPDATE CASCADE,
  CONSTRAINT `food_transaction_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='This will be a list of items purchased together, in a single transaction.';
CREATE TABLE `food_purchase` (
  `food_purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `number_of_standard_units` int(11) unsigned NOT NULL DEFAULT '1',
  `cost` float(5,2) unsigned NOT NULL,
  `food_type` int(11) NOT NULL,
  `food_transaction` int(11) NOT NULL,
  PRIMARY KEY (`food_purchase_id`),
  KEY `food_purchase_food_type_food_type_id_fk` (`food_type`),
  KEY `food_purchase_transaction__fk` (`food_transaction`),
  CONSTRAINT `food_purchase_food_type_food_type_id_fk` FOREIGN KEY (`food_type`) REFERENCES `food_type` (`food_type_id`) ON UPDATE CASCADE,
  CONSTRAINT `food_purchase_transaction__fk` FOREIGN KEY (`food_transaction`) REFERENCES `food_transaction` (`food_transaction_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COMMENT='This will be a purchase of a single item.';
CREATE TABLE `income` (
  `income_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` enum('wages','child benefit','dividends','freelance','other') NOT NULL DEFAULT 'wages',
  `amount` float(5,2) unsigned NOT NULL,
  `time_entered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_date` date NOT NULL,
  `user` int(11) NOT NULL,
  PRIMARY KEY (`income_id`),
  KEY `income_user___fk` (`user`),
  CONSTRAINT `income_user___fk` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COMMENT='This is the table to track the incomes that will be stored in the database';
CREATE TABLE `recurring_income` (
  `recurring_income_id` int(11) NOT NULL AUTO_INCREMENT,
  `interval_in_days` int(11) unsigned NOT NULL DEFAULT '7',
  `income` int(11) NOT NULL,
  PRIMARY KEY (`recurring_income_id`),
  KEY `recurring_income_income_income_id_fk` (`income`),
  CONSTRAINT `recurring_income_income_income_id_fk` FOREIGN KEY (`income`) REFERENCES `income` (`income_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
CREATE TABLE `unplanned_expenditure` (
  `expenditure_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL DEFAULT 'misc',
  `time_entered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` float(5,2) unsigned NOT NULL,
  `user` int(11) NOT NULL,
  `supplier` int(11) NOT NULL,
  PRIMARY KEY (`expenditure_id`),
  KEY `expenditure_suppliers_supplier_fk` (`supplier`),
  CONSTRAINT `expenditure_suppliers_supplier_fk` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`supplier_id`) ON UPDATE CASCADE,
  CONSTRAINT `expenditure_user___fk` FOREIGN KEY (`expenditure_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
CREATE TABLE `planned_expenditure` (
  `expenditure_id` int(11) NOT NULL AUTO_INCREMENT,
  `due_date` date NOT NULL,
  `unplanned_id` int(11) NOT NULL,
  PRIMARY KEY (`expenditure_id`),
  KEY `planned_expenditure_unplanned_expenditure_expenditure_id_fk` (`unplanned_id`),
  CONSTRAINT `planned_expenditure_unplanned_expenditure_expenditure_id_fk` FOREIGN KEY (`unplanned_id`) REFERENCES `unplanned_expenditure` (`expenditure_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
CREATE TABLE `recurring_expenditure` (
  `recurring_expenditure_id` int(11) NOT NULL AUTO_INCREMENT,
  `interval_days` int(10) unsigned NOT NULL DEFAULT '30',
  `planned_id` int(11) NOT NULL,
  PRIMARY KEY (`recurring_expenditure_id`),
  KEY `recurring_planned_expenditure__fk` (`planned_id`),
  CONSTRAINT `recurring_planned_expenditure__fk` FOREIGN KEY (`planned_id`) REFERENCES `planned_expenditure` (`expenditure_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
CREATE VIEW food_view AS
  SELECT food_type.food_type_name, food_type.standard_measure, food_type.unit_of_measurement, food_categories.category_name,
    food_categories.category_location, recipe.recipe_name, recipe_ingredient.number_of_units,
    current_food_stocks.current_standard_units
  FROM food_categories
  LEFT JOIN food_type ON food_categories.category_id = food_type.food_type_category
  LEFT JOIN current_food_stocks ON food_type.food_type_id = current_food_stocks.food_type
  LEFT JOIN recipe_ingredient ON food_type.food_type_id = recipe_ingredient.recipe_food_type
  LEFT JOIN recipe ON recipe_ingredient.recipe = recipe.recipe_id;
CREATE VIEW food_transaction_view AS
  SELECT user.user_group_id AS 'User Group', user.user_id AS 'User ID', CONCAT(user.first_name, ' ', user.surname) AS 'Username',
    SUM(food_purchase.cost) AS 'Total Food Cost'
  FROM user
  JOIN food_transaction ON user.user_id = food_transaction.user
  JOIN food_purchase ON food_transaction.food_transaction_id = food_purchase.food_transaction GROUP BY user.user_id;
CREATE VIEW transaction_view AS
  SELECT `Username`, `Total Food Cost`, user_group.group_name,
    income.title AS 'Income Title', income.amount AS 'Income Amount', income.due_date AS 'Income Due',
    recurring_income.interval_in_days AS 'Income Interval', unplanned_expenditure.title as 'Expenditure Title',
    unplanned_expenditure.amount AS 'Expenditure Amount', planned_expenditure.due_date AS 'Expenditure Due',
    recurring_expenditure.interval_days AS 'Expenditure Interval', supplier.supplier_name, supplier.supplier_type, supplier.supplier_description
    FROM food_transaction_view
  LEFT JOIN user_group ON food_transaction_view.`User Group` = user_group.user_group_id
  LEFT JOIN food_transaction ON food_transaction_view.`User ID` = food_transaction.user
  LEFT JOIN food_purchase ON food_transaction.food_transaction_id = food_purchase.food_transaction
  LEFT JOIN income ON food_transaction_view.`User ID` = income.user
  LEFT JOIN recurring_income ON income.income_id = recurring_income.income
  LEFT JOIN unplanned_expenditure ON food_transaction_view.`User ID` = unplanned_expenditure.expenditure_id
  LEFT JOIN planned_expenditure ON unplanned_expenditure.expenditure_id = planned_expenditure.unplanned_id
  LEFT JOIN recurring_expenditure ON planned_expenditure.expenditure_id = recurring_expenditure.planned_id
  LEFT JOIN supplier ON food_transaction.supplier = supplier.supplier_id;
INSERT INTO advanced_databases_project.user_group (group_name) VALUES ('Power');
INSERT INTO advanced_databases_project.user_group (group_name) VALUES ('Wemyss');
INSERT INTO advanced_databases_project.user (email_address, first_name, surname, user_group_id) VALUES ('joewemyss@gmail.com', 'joe', 'wemyss', 1);
INSERT INTO advanced_databases_project.user (email_address, first_name, surname, user_group_id) VALUES ('marywemyss@gmail.com', 'mary', 'wemyss', 1);
INSERT INTO advanced_databases_project.user (email_address, first_name, surname, user_group_id) VALUES ('michellepower@gmail.com', 'michelle', 'power', 2);
INSERT INTO advanced_databases_project.user (email_address, first_name, surname, user_group_id) VALUES ('johnpower@gmail.com', 'john', 'power', 2);
INSERT INTO advanced_databases_project.supplier (supplier_name, supplier_type, supplier_description) VALUES ('aldi', 'grocery', 'shop for groceries');
INSERT INTO advanced_databases_project.supplier (supplier_name, supplier_type, supplier_description) VALUES ('tesco', 'grocery', 'shop for groceries');
INSERT INTO advanced_databases_project.supplier (supplier_name, supplier_type, supplier_description) VALUES ('pre pay power', 'utilities', 'electricity provider');
INSERT INTO advanced_databases_project.supplier (supplier_name, supplier_type, supplier_description) VALUES ('virgin media', 'utilities', 'internet provider');
INSERT INTO advanced_databases_project.supplier (supplier_name, supplier_type, supplier_description) VALUES ('netflix', 'entertainment', 'entertainment provider');
INSERT INTO advanced_databases_project.supplier (supplier_name, supplier_type, supplier_description) VALUES ('jack and jones', 'clothing', 'clothing provider');
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('wages', 500, '2017-02-26 20:26:06', '2017-04-01', 1);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('dividends', 1250.34, '2017-02-26 20:26:07', '2017-03-28', 1);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('wages', 300, '2017-02-26 20:26:07', '2017-04-03', 2);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('child benefit', 160, '2017-02-26 20:26:07', '2017-03-28', 2);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('wages', 700, '2017-02-26 20:26:07', '2017-03-27', 3);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('freelance', 250.34, '2017-02-26 20:26:07', '2017-04-05', 3);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('wages', 500, '2017-02-26 20:26:07', '2017-04-03', 4);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('child benefit', 160, '2017-02-26 20:26:07', '2017-03-28', 4);
INSERT INTO advanced_databases_project.income (title, amount, time_entered, due_date, user) VALUES ('wages', 1260, '2017-02-26 22:17:14', '2017-04-28', 1);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (7, 9);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (365, 10);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (7, 11);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (7, 12);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (30, 13);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (7, 15);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (30, 16);
INSERT INTO advanced_databases_project.recurring_income (interval_in_days, income) VALUES (30, 17);
INSERT INTO advanced_databases_project.unplanned_expenditure (title, time_entered, amount, user, supplier) VALUES ('Prepay power', '2017-02-26 20:42:57', 20, 1, 3);
INSERT INTO advanced_databases_project.unplanned_expenditure (title, time_entered, amount, user, supplier) VALUES ('internet bill', '2017-02-26 20:42:57', 75, 2, 4);
INSERT INTO advanced_databases_project.unplanned_expenditure (title, time_entered, amount, user, supplier) VALUES ('new clothes', '2017-02-26 20:42:57', 100, 3, 6);
INSERT INTO advanced_databases_project.unplanned_expenditure (title, time_entered, amount, user, supplier) VALUES ('netflix', '2017-02-26 20:42:57', 9, 4, 5);
INSERT INTO advanced_databases_project.planned_expenditure (due_date, unplanned_id) VALUES ('2017-03-02', 2);
INSERT INTO advanced_databases_project.planned_expenditure (due_date, unplanned_id) VALUES ('2017-03-02', 4);
INSERT INTO advanced_databases_project.recurring_expenditure (interval_days, planned_id) VALUES (30, 1);
INSERT INTO advanced_databases_project.recurring_expenditure (interval_days, planned_id) VALUES (30, 2);
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('cereals', 'cupboard');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('chilled vegetables', 'fridge');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('cold meats', 'fridge');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('dairy', 'fridge');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('dry goods', 'cupboard');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('frozen desserts', 'freezer');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('fruits', 'shelf');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('hot drinks', 'cupboard');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('raw meats', 'fridge');
INSERT INTO advanced_databases_project.food_categories (category_name, category_location) VALUES ('vegetables', 'cupboard');
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('milk', 250, 'milliliter', 5);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('coffee', 100, 'gram', 8);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('ham', 1, 'unit', 3);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('carrots', 1, 'unit', 7);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('potatoes', 500, 'gram', 7);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('spring onions', 1, 'unit', 6);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('vienetta', 1, 'unit', 2);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('frosties', 250, 'gram', 1);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('cornflakes', 250, 'gram', 1);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('butter', 225, 'gram', 5);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('bread', 1, 'unit', 9);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('cheese', 100, 'gram', 5);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('steak', 1, 'unit', 10);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('mushrooms', 50, 'gram', 6);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('onions', 1, 'unit', 7);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('chicken breast', 1, 'unit', 10);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('flour', 500, 'gram', 9);
INSERT INTO advanced_databases_project.food_type (food_type_name, standard_measure, unit_of_measurement, food_type_category) VALUES ('pastry cases', 1, 'unit', 5);
INSERT INTO advanced_databases_project.recipe (recipe_name, description) VALUES ('ham and cheese sandwich', 'ham and cheese sandwich');
INSERT INTO advanced_databases_project.recipe (recipe_name, description) VALUES ('steak dinner', 'steak dinner');
INSERT INTO advanced_databases_project.recipe (recipe_name, description) VALUES ('vol au vents', 'vol au vents');
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.1, 20, 1);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.01, 19, 1);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.2, 21, 1);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (2, 22, 2);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.1, 14, 2);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.33, 24, 2);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (1, 23, 2);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (1, 27, 3);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (3, 25, 3);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.01, 26, 3);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (1, 23, 3);
INSERT INTO advanced_databases_project.recipe_ingredient (number_of_units, recipe_food_type, recipe) VALUES (0.01, 19, 3);
INSERT INTO advanced_databases_project.food_transaction (transaction_time, user, supplier) VALUES ('2017-02-27 17:02:23', 1, 1);
INSERT INTO advanced_databases_project.food_transaction (transaction_time, user, supplier) VALUES ('2017-02-27 17:02:23', 2, 2);
INSERT INTO advanced_databases_project.food_transaction (transaction_time, user, supplier) VALUES ('2017-02-27 17:02:23', 3, 2);
INSERT INTO advanced_databases_project.food_transaction (transaction_time, user, supplier) VALUES ('2017-02-27 17:02:23', 4, 1);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (2, 2.19, 19, 1);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (2, 1.49, 10, 1);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (1, 2, 12, 1);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (1, 0.99, 15, 1);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (1, 0.87, 13, 2);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (2, 0.99, 14, 2);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (1, 0.99, 10, 3);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (2, 2.2, 17, 3);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (3, 2, 10, 4);
INSERT INTO advanced_databases_project.food_purchase (number_of_standard_units, cost, food_type, food_transaction) VALUES (1, 2.19, 11, 4);
SELECT concat(user.first_name, ' ', user.surname) as 'name', food_type.food_type_name, food_purchase.cost FROM user
  LEFT JOIN food_transaction ON user.user_id = food_transaction.user
  RIGHT JOIN food_purchase ON food_transaction.food_transaction_id = food_purchase.food_transaction
  LEFT JOIN food_type ON food_purchase.food_type = food_type.food_type_id ORDER BY food_purchase.cost DESC;


