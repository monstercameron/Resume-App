CREATE PROCEDURE sp_insert_user_record(
    IN p_username VARCHAR(255), 
    IN p_email VARCHAR(255), 
    IN p_hash VARCHAR(255), 
    IN p_recovery_hash VARCHAR(255), 
    IN p_phone_number VARCHAR(20), 
    IN p_objectives TEXT
)
BEGIN
    INSERT INTO users (username, email, hash, recovery_hash, phone_number, objectives) 
    VALUES (p_username, p_email, p_hash, p_recovery_hash, p_phone_number, p_objectives);
END;
