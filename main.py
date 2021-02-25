from fastapi import FastAPI , Request;
import sqlite3, config
import alpaca_trade_api as tradeapi
from datetime import date , timedelta

app = FastAPI()

@app.post("/stocks")
async def index(request: Request):
  body = await request.json()
  print(body['filter'])
  connection = sqlite3.connect('app.db')

  connection.row_factory = sqlite3.Row

  cursor = connection.cursor()
  if body['filter'] == "Intraday Highs":
    cursor.execute("""
   SELECT * FROM(
SELECT symbol , name , exchange, stock_id,max(close),date
from stock_price JOIN stock on stock.id = stock_price.stock_id
GROUP by stock_id
ORDER by symbol
) WHERE date = ?
    """ , ((date.today() - timedelta(days=2)).isoformat(),))
  else:
    cursor.execute("""
      SELECT id, symbol, name , exchange FROM stock
  """)

  rows = cursor.fetchall()

  return {"stocks" : rows}

@app.get("/strategy")
async def strategy():
  connection = sqlite3.connect('app.db')
  connection.row_factory = sqlite3.Row
  cursor = connection.cursor()

  cursor.execute("""
  SELECT * FROM strategy
  """)

  strategies = cursor.fetchall()
  return {"strategies" : strategies}

@app.post("/setStrategy")
async def setStr(request:Request):
  body = await request.json()
  connection = sqlite3.connect('app.db')
  cursor = connection.cursor()
  s = (body['symbol'],)
  cursor.execute("""
  SELECT id from stock where symbol = ?
  """  , s)
  id = cursor.fetchone()
  try:
    cursor.execute("""
      INSERT INTO stock_strategy (stock_id , strategy_id) VALUES (?, ?)
    """ , (id[0] , body['strategy']))
  except Exception:
    return False
  connection.commit()
  return True