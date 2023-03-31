------------------------------------------
--9.Вивести кількість юзерів за ролями
SELECT role, count(role) FROM "Users" GROUP BY role;

------------------------------------------
--10.Усім юзерам з роллю customer, які здійснювали замовлення 
--в новорічні свята в період з 25.12 по 14.01, 
--необхідно зарахувати по 10% кешбеку з усіх замовлень у цей період.


UPDATE "Users"
SET balance = balance * 1.1
WHERE EXISTS (
SELECT *
FROM "Users" AS u
JOIN "Contests" AS c
ON u.id = c."userId"
WHERE "Users".role = 'customer'
AND extract ('day' from c."createdAt")
BETWEEN 25 AND 31
AND extract ('day' from c."createdAt")
BETWEEN 1 AND 14
AND extract ('month' from c."createdAt") = 12 
AND extract ('month' from c."createdAt") = 1);


------------------------------------------
--11. Для ролі сreative необхідно виплатити 3-м юзерам 
--з найвищим рейтингом по 10$ на їхні рахунки.

UPDATE "Users"  
SET balance = balance + 2
WHERE rating IN (
  SELECT rating
  FROM "Users"
  WHERE role = 'creator' 
  ORDER BY rating DESC
  LIMIT 3
);