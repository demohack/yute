### 2021-01-07 creating a checklist

today's goals:
- modify flask to javascript front end
- read the flask code, get familar

I don't quite understand db.py.

assumes: 
- User logs in

steps:
- clicks on create checklist menu item
- create checklist screen appears
    a checklist is a document, that can be collaboratively edited
- by default, user who creates the document owns the document
- owner of document determines who has access to view, edit, delete

assumes:
- document management functionality
- documents can be grouped into folders / containers
- documents incldue messaging capability
- documents can be published, or unpublished
- documents can be versioned



### 2020-12-26 instant messaging

One of the basic applications is for users to instant message each other.

Basic test case for the UpdateQueue library calls.

The IM page updates on interval of 1 to 3 seconds.

The IM also updates when user posts a message, 
and server responds with what's changed since last update.


### 2020-12-26 creating other users

Only admin users can create other users.

Admin user will click on add new user.

App will switch to add new user mode.

Admin user enters new user info.

When ready, admin user clicks on submit button to create new user.

On the server end, server will doublecheck that it is an admin user
that is able to create a new user.

Server will return a success or failure, with error message back.


### 2020-12-26 first time user story

The first time that the server is accessed,
user is presented with a new user page, to create an admin account.


### 2020-12-26 login user story

I go to http://server:5000/ and typical page request is sent.

The server will check if I had previously logged in, by having a valid session token.

If no valid session, then server will return the unathenticated page.

Else if there is a valid session, the server will return an authenticated page.


### 2020-12-26 UpdateQueue user story

When a user loads up a page with dynamic updates,
the client app subscribes to the page,
this lets the server know to record updates for that client, and other subscribers.

When the server receives a subscription,
it records changes since the client's last pull.

When server receives a pull,
it returns a playback deck since prior pull, and clears out the UpdateQueue.

The client uses the playback deck to get caught up with changes since last checkin.

Each browser page/tab has its own session/subscription.

When a user enters a data field to make changes,
an edit request message is sent to server if that field can be locked.
When the user commits a change,
the change commit message is sent to the server.

On the server side, instead of merely editing data on the database,
the changes are recorded in the UpdateQueue for each subscriber.

frnot end / javascript
- IntervalCheck 
    - check with server at timed intervals, and on demand; return any data updates
- UserInfo
- UserPermissions 
    - client-side check of what user is allowed to do an action; return true or false
- PageRender 
    - handles rendering of HTML, UI interactions
- UpdateQueue 
    - playback updates received from server
- Subscriber 
    - subscribe to data for change updates

server end / python
- UserInfo
- UserPermissions 
    - server-side check to validate if user is allowed to do an action; return true or false
- UpdateQueue 
    - when a client makes a change, the change version is recorded for other client subsribers
    - when a client refresh is made, the change information is sent to that client
    - the queue is an ordered list of data and action that can be played back on the client
- Publisher 
    - publishes change updates to all UpdateQueue objects



### 2020-12-10 preparing new checklists project folder
Objective: provide a basic web app javascript on front end, live updates using json to backend, website hosted using python / flask, and msyql database

A good source code control is needed, and git is a good tool to use. It's what I'm learning. Github is a secured repository, owned by microsoft.

Development & Ops Workflow:
- code files will be created / edited on the desktop or laptop from work or home
- code changes are committed securely to my personal github account "demohack"
- then code is pulled / synced locally to the development server
- dev ready code will sync to the dev folder, with webpage served on intranet port X
- test ready code will sync to a test folder, with webpage served on port intranet port Y
- production ready code will sync to the production folder, and webpage served on intranet port Z

Security
- workplace configuration files, database files, other files with names of people, or computers, databases, other private data will be stored in a separate folder on the server that does not get committed using git
- I'm the only person who can commit changes to my repository
- the account is protected by two-factor authentication


