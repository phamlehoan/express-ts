-- This script removes the default administrator user.
-- This script removes the default administrator user and associated permissions.

-- THU HỒI TẤT CẢ QUYỀN CỦA ROLE 'SuperAdmin'
DELETE FROM role_permissions 
WHERE role_id = (SELECT id FROM roles WHERE role_name = 'SuperAdmin');

-- XÓA TẤT CẢ CÁC QUYỀN ĐÃ TẠO
-- This script deletes all permissions, which were created by the corresponding 'up' script.
DELETE FROM permissions;

-- XÓA NGƯỜI DÙNG ADMIN MẶC ĐỊNH
DELETE FROM users WHERE username = 'admin';
