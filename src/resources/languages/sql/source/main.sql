WITH l_items(l_amount) AS (
  VALUES (12), (18), (12)
)
SELECT SUM(l_amount) AS total
FROM l_items;
