SELECT `category`.`id`, `category`.`category_name`, `products`.`id` AS `products.id`, `products`.`product_name` AS `products.product_name`, `products`.`price` AS `products.price`, `products`.`stock` AS `products.stock`, `products`.`category_id` AS `products.category_id`, `products`.`category_id` AS `products.categoryId` FROM `category` AS `category` LEFT OUTER JOIN `product` AS `products` ON `category`.`id` = `products`.`category_id` WHERE `category`.`id` = '1';