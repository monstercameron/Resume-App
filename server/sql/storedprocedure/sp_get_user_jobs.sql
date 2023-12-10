CREATE PROCEDURE sp_get_user_record(IN email_param VARCHAR(255))
BEGIN
    SELECT * FROM users WHERE email = email_param;
END;