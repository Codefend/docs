WITH m_items(m_amount) AS (
  VALUES (12), (18), (12)
)
SELECT SUM(m_amount) AS total
FROM m_items;
