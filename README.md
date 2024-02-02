Hi, This is the basic clone for Paytm signup and signin Page.
 It also contains the basic functionality of sending money with CRUD operation with Atomicity.

Code follows monoservice architecture.

# For FrontEnd - 
  go into client directory and run NPM START

# For Server -
  go into the server directory and run NPM START


This repo used some Technologies mentioned below.

React, Redux-toolkit, Nodejs, ExpressJs, Monoodb, Zod, JWT, Twillo...


you will face sending OTP issue.
APIs will not allow you to send OTP.

the only step you should do to run otp service is just Login on "https://login.twilio.com/" and generate a  SID and AUTH-Tokem 
and replace it in the server directory env variable file.

After setting the token and SID just restart the server and you are ready to go.
