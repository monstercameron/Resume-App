DROP TABLE IF EXISTS education_history;

CREATE TABLE education (
    education_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    grade VARCHAR(50),
    activities TEXT,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
