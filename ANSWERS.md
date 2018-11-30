<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   Using sessions we can make it provide some kind of Authorization, using a cookie that gives a user access to parts of our server that are otherwise restricted. The cookie is a small file we put on their browser that holds all the session information, including the expiration date when they will need to update their cookie by relogging in.

2. What does bcrypt do to help us store passwords in a secure manner.
   bcrypt generates a hash and adds it to the password before its stored on the server.

3. What does bcrypt do to slow down attackers?
   bcrypt adds an element of time to the encryption.

4. What are the three parts of the JSON Web Token?
   Header, Payload, Signature.
