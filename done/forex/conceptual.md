### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

>#####Application
>Python is backend language / environment handling the database, webserver, middleware. It is more used in scientific applications.

>Javascript was initially made for the browser, but can now be used for the backend.

>#####Language Syntax
  Python syntax utilizes indentation and colon, and is minimalistic

>Javascript syntax utlizes curly braces and semi-colons.

>#####Variable declaration
>Python variables do not need to be declared

>Javascript variables need to be declared with var, let

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.

>if key in dict.keys()

>if dict.has_key(key)

- What is a unit test?

>A unit test tests one component of the application in isolation from other components.


- What is an integration test?

>An integraion test tests the interactions of functions across 2 or more compoents.


- What is the role of web application framework, like Flask?

>A web application framework provides prepackaged software that can be extended.
It is usually written with design patterns. Used within its intended purposes,
it can shorten development time and effort. Allows developers to focus on the
business logic.


- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

>A route parameter might be better for content that doesn't change as often,
and stability is desired. Such as to identify resources.
The list of all users. /users

>A query parameter might be better fit for content that change more often,
and applications requiring sorting, filtering. e.g. The list of all users
who are X, Y, Z. /users?a=X&b=Y&c=Z


- How do you collect data from a URL placeholder parameter using Flask?

>Use brackets on the URL of the view definition to get the parameter, and
it passes in as a function parameter.


- How do you collect data from the query string using Flask?

>Use the flask request.args object to get the query string parts as a
dictionary of key-value pairs.


- How do you collect data from the body of the request using Flask?

>use the following:
>request.form, 
>request.files, 
>request.json, 
>request.values (combines requeset.args and request.form data)


- What is a cookie and what kinds of things are they commonly used for?
>Cookies are data stored on the browser and can be used to store logins, session info, application state, shopping cart info.


- What is the session object in Flask?

>The sessoin object stores user state info on the server side, similar to cookies on the client side.


- What does Flask's `jsonify()` do?

>jsonify() converts data to a flask.Response() object, where the data is converted to a JSON string, and the response object has the application/json mimetype.

