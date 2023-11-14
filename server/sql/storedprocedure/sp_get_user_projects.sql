CREATE PROCEDURE sp_get_all_projects_for_user(IN user_id_param INT)
BEGIN
    SELECT * FROM projects WHERE user_id = user_id_param;
END;
