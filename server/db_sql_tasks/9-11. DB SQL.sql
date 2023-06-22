------------------------------------------
--9.Вивести кількість юзерів за ролями
SELECT role, count(role) FROM "Users" GROUP BY role;

------------------------------------------
--10.Усім юзерам з роллю customer, які здійснювали замовлення 
--в новорічні свята в період з 25.12 по 14.01, 
--необхідно зарахувати по 10% кешбеку з усіх замовлень у цей період.

WITH "cashback_subquery" AS (
  SELECT "userId", SUM(prize * 0.1) AS cashback
  FROM "Contests"
  WHERE extract('month' from "createdAt") = 12 AND extract('day' FROM "createdAt") >=25
  OR extract('month' from "createdAt") = 1 AND extract('day' FROM "createdAt") <= 14
  GROUP BY "userId"
)
UPDATE "Users"
SET balance = balance + "cashback_subquery".cashback
FROM "cashback_subquery"
WHERE "Users"."id" = "cashback_subquery"."userId"
AND "Users"."role" = 'customer';

------------------------------------------
--11. Для ролі сreative необхідно виплатити 3-м юзерам 
--з найвищим рейтингом по 10$ на їхні рахунки.

UPDATE "Users"  
SET balance = balance + 10
WHERE rating IN (
  SELECT rating
  FROM "Users"
  WHERE role = 'creator' 
  ORDER BY rating DESC
  LIMIT 3
);