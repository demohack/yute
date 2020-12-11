import sys
print("### path of modules for testsql.py:")
for path in sys.path:
    print(path)

import sqlite3
conn = sqlite3.connect('test.db')

c = conn.cursor()

# Create table
c.execute('''CREATE TABLE stocks
             (date text, trans text, symbol text, qty real, price real)''')

# Save (commit) the changes
conn.commit()

# Insert a row of data
c.execute("INSERT INTO stocks VALUES ('2006-01-05','BUY','RHAT',100,35.14)")

# Save (commit) the changes
conn.commit()

print("show one row")
for row in c.execute('SELECT * FROM stocks ORDER BY price'):
    print(row)

# Do this instead
t = ('RHAT',)
c.execute('SELECT * FROM stocks WHERE symbol=?', t)
print("fetch one using parameter")
print(c.fetchone())

# Larger example that inserts many records at a time
purchases = [('2006-03-28', 'BUY', 'IBM', 1000, 45.00),
             ('2006-04-05', 'BUY', 'MSFT', 1000, 72.00),
             ('2006-04-06', 'SELL', 'IBM', 500, 53.00),
            ]
c.executemany('INSERT INTO stocks VALUES (?,?,?,?,?)', purchases)

# Save (commit) the changes
conn.commit()

print("show four rows")
for row in c.execute('SELECT * FROM stocks ORDER BY price'):
    print(row)

print("show full table")
for row in c.execute('SELECT * FROM stocks ORDER BY price'):
    print(row)
        
# We can also close the connection if we are done with it.
# Just be sure any changes have been committed or they will be lost.
conn.close()
