select max_date.* from 
(select s.id,s.name,max(sp.close) as close from stock_price as sp, stock as s where s.id = sp.stock_id and date = '2020-09-01' group by s.id,s.name) as max_date,
(select s.id,s.name,max(sp.close) as close from stock_price as sp, stock as s where s.id = sp.stock_id group by s.id,s.name) as max_overall
where max_date.id = max_overall.id and max_date.close = max_overall.close