-- DROP TABLE asdf;



-- 매핑된 결과 조회
-- SELECT id || kor_name  
-- FROM menus;

-- SELECT *
-- FROM menus
-- WHERE kor_name LIKE '%아%' or price >= 2000
-- ORDER BY price DESC, kor_name ASC;


INSERT INTO menus(kor_name, eng_name, price, category_id)
VALUES('아메리카노', 'Americano', 1000, 1),
    ('카페라떼', 'Cafe Latte', 2500, 1),
    ('바나나라떼', 'Banana Latte', 3500, 1);