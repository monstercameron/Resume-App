CREATE PROCEDURE sp_get_all_jobs_for_user(IN user_id_param INT)
BEGIN
    SELECT * FROM jobs WHERE user_id = user_id_param;
END;
