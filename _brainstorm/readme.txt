daily journal


### 2021-06-19 Warbler, home.html, line 58

{{'btn-primary' if msg.id in likes else 'btn-secondary'}}


### 2021-06-19

ipython
% load filename.py


### 2021-06-14

Feels like I'm starting over again with postgresql and flask. but I was able to rely on notes and experience / fuzzy memory. 1.5 hrs from updating macports, starting flask, connecting to pgsql.

2 hrs total with table schema so far.

Documenting my terminal tabs:
1- flask commandline
2- whatever
3- su postgres
4- su postgres


### 2021-06-06

24.9 preparing for capstone project 1
https://ddf46429.springboard.com/uploads/resources/1581813551_SEC_Capstone_Overview.pdf

43.1 preparing for capstone project 2
https://ddf46429.springboard.com/uploads/resources/1617998287_SEC_Final_Capstone__Overview_2_.pdf


### 2021-05-23

choosing API:
- good documentation
- miniimal limitation, e.g. calls

what additional value are you adding?
how visible is that from user perspective?
you need to enter your meal information?



### 2021-05-22
51.1% of curriculum

Doing exercise 24.5, hashing and login.

Other concepts: authentication, encryption

### 2021-05-12

I made it to 47.1% of curriculum with last update, trying to get to goal of
50% this weekend.

Finished all the data structures and algorithms assignments. Now circling
back to flask, python, postgresql. Hopefully won't run into configuration
issues.


### 2021-05-01

test file with nodejs / jest
> jest sorted-frequency.test.js


### 2021-04-25
consulting companies
accenture
capgemeni
ibm
staffing companies


### 2021-04-25

Documenting for past week. I had momentum in coding, finishing projects left and
right in flask/postgres. Then hit a problem and got derailed. The postgres db
connection wasn't giving me error messages, and nothing was updating to the db.

I didn't have a problem earlier from cookie cutter code I crafted, copying and
pasting project to project. But when I started from scratch on the latest project
to learn more about each line, I ran into this issue.

I could have raised the issue and asked someone. But I hadn't done my own search,
kept procrastinating and I finally made the effort.

PGSQL by default installation using macports sets to trust authentication. this
meant that connections succeeded, despite password errors. I'll have to confirm
this, but for now I changed pg_hba.conf to require md5 authentication.

Another issue was I wasn't sure which instance of postgres was being used. I had
multiple instances installed via macports, and regular install. So I removed
other instances to just the macport version.

Moral of the story, configuration management is important.


https://stackoverflow.com/questions/43122175/automatically-hard-wrap-lines-at-column-in-vscode



### 2021-04-17

https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
https://www.srihash.org/

Subresource Integrity (SRI) is a security feature that enables browsers to
verify that resources they fetch (for example, from a CDN) are delivered without
unexpected manipulation. It works by allowing you to provide a cryptographic hash
that a fetched resource must match.



### 2021-04-10 11:56 pm

: pip install flask-shell-ipython
: flask shell


insert this in to app.py source code for break point
: import pdb; pdb.set_trace()



### 2021-04-09 5:57 am

setting up a new flask project folder:

install virtual environment module
: python -m venv venv

edit activate, insert these two environment variables
: vi venv/bin/activate
: export FLASK_APP=flaskr
: export FLASK_ENV=development
: export FLASK_RUN_PORT=5002

activate virtual environment
: . venv/bin/activate
: pip install --upgrade pip

install flask
: pip install flask
: pip install flask_debugtoolbar
: pip install flask-sqlalchemy
: pip install psycopg2-binary
: pip install python-dotenv
: pip install flask-wtf
: pip install email_validator

flask init-db
flask run


https://guide.macports.org/chunked/using.html#using.port.selfupdate
: port help selfupdate

If the installation of a port fails,
you should always clean and try again: port clean portname
: port clean portname

port clean can also be used to remove corrupted downloads
after a failed fetch phase, by specifying the --dist flag
: port clean --dist portname

You might also want to try enabling trace mode,
which can prevent conflicts caused by files installed by other
ports or in common system locations, such as /usr/local.
To do that, re-run the installation with the -t flag:
: port -t install portname


https://guide.macports.org/chunked/installing.shell.html
: export PATH=/opt/local/bin:/opt/local/sbin:$PATH

To verify that the file containing the MacPorts variables is in effect,
type env in the terminal to verify the current environment settings
after the file has been created.
: env

https://www.activestate.com/resources/quick-reads/how-to-update-all-python-packages/
list outdated in python
: pip list --outdated
: pip freeze > requirements.txt
Edit requirements.txt, and replace all ‘==’ with ‘>=’.
: pip install -r requirements.txt --upgrade

### 2021-04-05 10:32 am

TODO: create .env file
# POSTGRESQL ENVIRONMENTAL VARIABLES
PGDRIVER=postgresql
PGHOST=localhost
PGHOSTADDR=127.0.0.1
PGPORT=5432
PGDATABASE=sb22
PGUSER=yu
PGPASSWORD=secretpassword


### 2021-04-03 10:09 pm

# hide files / folders in visual code explorer
https://www.donovanbrown.com/post/Hide-folders-in-Visual-Studio-Code-Explorer

# safeguarding passwords in env files
https://dynaconf.readthedocs.io/en/docs_223/guides/usage.html

$ pip install dynaconf

from some.db import Client

from dynaconf import settings

conn = Client(
    username=settings.USERNAME,             # attribute style access
    password=settings.get('PASSWORD'),      # dict get style access
    port=settings['PORT'],                  # dict item style access
    timeout=settings.as_int('TIMEOUT'),     # Forcing casting if needed
    host=settings.get('HOST', 'localhost')  # Providing defaults
)


https://itnext.io/start-using-env-for-your-flask-project-and-stop-using-environment-variables-for-development-247dc12468be
https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
https://martin-thoma.com/configuration-files-in-python/#:~:text=configuration%20handling%3A%20cfg_load-,Python%20Configuration%20File,to%20avoid%20uploading%20it%20accidentally.

# configuring sqlalchemy - postgresql connection string
https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/

SQLALCHEMY_DATABASE_URI
https://docs.sqlalchemy.org/en/14/core/engines.html#postgresql
dialect+driver://username:password@host:port/database
postgresql://scott:tiger@localhost/mydatabase
mysql://scott:tiger@localhost/mydatabase

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost/DBNAME"

POSTGRES = {
    'user': 'postgres',
    'pw': 'password',
    'db': 'my_database',
    'host': 'localhost',
    'port': '5432',
}
# Use of format_map() function
https://www.geeksforgeeks.org/python-string-format_map/
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{user}:{pw}@{host}:{port}/{db}'.format_map(POSTGRES)

# Migrate / Manager for database migrations and upgrades
https://blog.theodo.com/2017/03/developping-a-flask-web-app-with-a-postresql-database-making-all-the-possible-errors/

### 2021-03-29 10:24 am

https://lerner.co.il/2014/05/24/turning-postgresql-arrays-rows-unnest/


### 2021-03-23 10:18 am

export PATH=/opt/local/bin:/opt/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
set | grep PATH
python3 -m venv venv
source venv/bin/activate
pip install flask-debugtoolbar

deactivate

pip install --upgrade pip setuptools wheel


### 2021-03-06 08:33 am

# start a node project
npm init -y

# install a package
npm install axios


### 2021-03-05 05:58 am

beautify selection : ctrl shift i
beutify file : ctrl alt i


connecting to postgres, change password for test

# create new node package.json file and default yes
node-init --yes

### 2021-02-23 04:48 pm

git add .; git commit -m ""; git push

git pull




### 2021-02-23 6:02 pm
mac ports install of postgresql
port install postgresql13-server

postgresql13-server has the following notes:
To create a database instance, after install do
    sudo mkdir -p /opt/local/var/db/postgresql13/defaultdb
    sudo chown postgres:postgres /opt/local/var/db/postgresql13/defaultdb
    sudo su postgres -c 'cd /opt/local/var/db/postgresql13 && /opt/local/lib/postgresql13/bin/initdb -D /opt/local/var/db/postgresql13/defaultdb'

You can now start the database server using:
/opt/local/lib/postgresql13/bin/pg_ctl -D /opt/local/var/db/postgresql13/defaultdb -l logfile start

/opt/local/lib/postgresql13/bin/pg_ctl -D /opt/local/var/db/postgresql13/defaultdb -l logfile stop

pg_ctl: cannot be run as root
Please log in (using, e.g., "su") as the (unprivileged) user that will own the server process.



https://www.postgresql.org/docs/9.5/app-pg-ctl.html

pg_ctl start
pg_ctl stop
pg_ctl restart
pg_ctl status
pg_ctl --version


### 2021-02-14 03:00 am

# alter table
alter table t_user add column role text;

# insert data
insert into t_user (name, age, email) values ('user_name', 45, 'user_name@domain.com');

# create table
create table t_user (name text not null, age int, email text);

# change user password
ALTER USER name WITH PASSWORD 'pwd';

# grant user access to database
grant all on database testdb to user_name;

# switch database in psql
https://www.xspdf.com/resolution/50841341.html

\C db_name
\connect db_name

# create user
https://www.postgresql.org/docs/8.0/sql-createuser.html

create user test password 'test2hsAQan39';

# create database
https://www.postgresqltutorial.com/postgresql-create-database/

create database testdb with owner test;

# list Users
https://www.postgresqltutorial.com/postgresql-list-users/

\du
\du+

# list databases
https://www.postgresqltutorial.com/postgresql-show-databases/

\l
\l+

# list tables
https://www.postgresqltutorial.com/postgresql-show-tables/

\dt
\dt+


# connect to postgres with database name same as username
psql -U postgres -h localhost -p 5432

# connect to postgres with database specified
psql -d local -U test -h localhost -p 5432


https://stackoverflow.com/questions/38424102/why-isnt-psql-requiring-me-to-enter-a-password-to-access-psql-for-a-login-role
While you are in psql and connected to the database run SHOW hba_file; to find out where your pg_hba.conf file is located.
change connections from trust to md5


# different ways of connecting to PG
https://node-postgres.com/features/connecting

- sockets
- connection URI
- connection pooling
- environmental variables

# viewing commit history
https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History

# initializing node project folder with npm install
extract / copy over node project
open terminal
cd to project folder, e.g. C:\Users\user_name\sb\local\express-pg-intro-demo\simple

# this will create the node_modules folder and download any npm package dependencies
run: npm install


# use dotenv to securely store passwords, ip addresses in a separate file

https://codingsans.com/blog/node-config-best-practices
https://help.cloud66.com/node/how-to-guides/deployment/application-settings-node.html
https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/
https://stackoverflow.com/questions/52580754/nodejs-how-to-securely-store-ip-username-and-password-of-a-database
https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/
https://dev.to/getd/how-to-manage-secrets-and-configs-using-dotenv-in-node-js-and-docker-2214
https://medium.com/@victor.valencia.rico/environment-variables-with-node-js-1f84fa26f316
https://git-scm.com/docs/gitignore

# node & postgres

https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/
https://node-postgres.com/features/connecting

run: npm install --save dotenv

add .env to .gitignore
create a file named .env, store at root project folder, following content

HOST=localhost
PORT=3000
PGDB_HOST=localhost
PGDB_PORT=5432
PGDB_DATABASE=local
PGDB_USER=user_name
PGDB_PASSWORD=X

add to top of code file:

require('dotenv').config()

const db = new Client({
   host: process.env.PGDB_HOST,
   port: process.env.PGDB_PORT,
   database: process.env.PGDB_DATABASE,
   user: process.env.PGDB_USER,
   password: process.env.PGDB_PASSWORD,
});



### 2021-02-13

installed postgresql 13.2.1 via chocolatey, and 12.6.1 via cygwin

start user: psql -U user_name db_name
       e.g. psql -U user_name local

change password: ALTER ROLE user_name WITH PASSWORD 'X';



#upgrade node on windows through installer
https://nodejs.org/en/download/


# upgrade chocolatey
# run in windows powershell admin mode

> chocolatey upgrade chocolatey

# C:\ProgramData\chocolatey\logs\chocolatey.log



### 01-30 07:23

Use hooks for state, not local state in class objects.
Why?

### 01-30-2021 06:46 am
wrap a function call with parameter within an anonymous arrow function, to pass in parameters through an event function.
otherwise the function gets called when page is rendered, not when event occurs.
https://www.springboard.com/workshops/software-engineering-career-track/learn#/curriculum/17267

### 2021-01-30 06:35 am
event object wrapped in SyntheticEvent object, and event pooling means the SyntheticEvent object properties get nullified in the console.
event pooling means react will reuse a SyntheticEvent object when it can.

console.log print a copy of event object?

### 2021-01-27 08:06 am

- reorganized work folders to _brainstorm, _doing, _done

18-2-python-ds-practice
https://curric.rithmschool.com/springboard/exercises/python-ds-practice/

18-4-python-oo-practice
https://curric.rithmschool.com/springboard/exercises/python-oo-practice/

