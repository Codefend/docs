WITH ox0(ox1) AS (
  VALUES (12), (18), (12)
)
SELECT SUM(ox1) AS total
FROM ox0;
