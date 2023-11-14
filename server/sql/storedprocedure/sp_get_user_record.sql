CREATE PROCEDURE sp_get_user_record(IN user_id_param INT)
BEGIN
    SELECT * FROM users WHERE user_id = user_id_param;
END;
