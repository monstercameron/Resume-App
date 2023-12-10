CREATE PROCEDURE sp_get_isadmin(IN user_id_input INT)
BEGIN
    SELECT IF(COUNT(*) > 0, 1, 0) AS is_admin
    FROM user_admin_info
    WHERE user_id = user_id_input
    AND is_admin = TRUE;
END;
