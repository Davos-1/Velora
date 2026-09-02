-- Placeholder stock for imported products. TODO(operator): set real quantities.
-- 3D-printed products are print-on-demand and have no inventory rows.
INSERT OR IGNORE INTO inventory (variant_sku, stock) VALUES
  ('VP-BAL-3ER', 25),
  ('VP-PRO-ELB-S', 25),
  ('VP-PRO-ELB-M', 25),
  ('VP-PRO-ELB-L', 25),
  ('VP-GRP-1ER-WHT', 25),
  ('VP-GRP-1ER-BLK', 25),
  ('VP-GRP-1ER-PET', 25),
  ('VP-GRP-3ER-WHT', 25),
  ('VP-GRP-3ER-BLK', 25),
  ('VP-GRP-3ER-PET', 25),
  ('VP-BAG-BCK', 25),
  ('VP-BAG-PAL', 25),
  ('VP-RKT-CTRL', 25),
  ('VP-RKT-PWR', 25);
