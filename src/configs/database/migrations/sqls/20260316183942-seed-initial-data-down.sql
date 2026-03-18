-- Xóa theo danh sách chính xác để không ảnh hưởng data của học viên
DELETE FROM categories WHERE name IN ('Linh kiện PC', 'Laptop & Workstation', 'Màn hình máy tính', 'Gaming Gear', 'Thiết bị mạng', 'Thiết bị lưu trữ', 'Phần mềm bản quyền', 'Máy in & Thiết bị VP', 'Phụ kiện & Cáp', 'Âm thanh');
DELETE FROM features WHERE feature_key IN ('dash.view', 'user.all', 'rbac.all', 'prod.all', 'inv.all', 'cust.all', 'sale.order', 'sale.debt', 'report.rev', 'sys.config');
DELETE FROM roles WHERE role_name IN ('SuperAdmin', 'Manager', 'Accountant', 'Warehouse_Manager', 'Warehouse_Staff', 'Sales_Leader', 'Sales_Staff', 'Shipper', 'Customer_Service', 'Technical_Support');

-- Xóa sản phẩm theo định dạng SKU đã tạo
DELETE FROM products WHERE sku LIKE 'SKU-%';

-- Xóa khách hàng theo định dạng số điện thoại đã tạo
DELETE FROM customers WHERE phone LIKE '090%';

-- Vì mình seed 100 đơn đầu tiên trong môi trường sạch, có thể xóa theo ID
-- Hoặc an toàn hơn là xóa các đơn hàng có ngày tháng trong 31 ngày qua mà mình đã seed
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE payment_method IN ('Cash', 'Transfer'));
DELETE FROM orders WHERE payment_method IN ('Cash', 'Transfer');
