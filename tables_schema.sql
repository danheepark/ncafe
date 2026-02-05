-- menus 테이블
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    kor_name VARCHAR(100) NOT NULL,
    eng_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10,2) NOT NULL,
    category_id INTEGER,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- menu_images 테이블
CREATE TABLE menu_images (
    id SERIAL PRIMARY KEY,
    menu_id INT NOT NULL,
    src_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
);
