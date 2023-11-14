DROP TABLE IF EXISTS skills;

CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(100),      -- Field to store the proficiency level (e.g., Beginner, Intermediate, Expert)
    years_of_experience INT,             -- Number of years of experience with the skill
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
