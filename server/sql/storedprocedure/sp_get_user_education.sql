CREATE PROCEDURE sp_get_all_education_for_user(IN user_id_param INT)
BEGIN
    SELECT * FROM education WHERE user_id = user_id_param;
END;
