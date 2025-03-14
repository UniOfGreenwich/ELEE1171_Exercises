# Web Security

~~~admonish warnnig

Do not attempt this on machines or targets you are not authorised to! 

You do not want to break the law!

~~~

**Password Capture**

{Lab demo would be done by the instructor - Follow and ask questions as needed} 

~~~admonish information title="Learning outcome:" 

You will be able to see the importance of traffic encryption, understand sniffing and how to 
protect against them from design phase of any project, understand how HTML components work 
together to present a requested web page and accept input including sensitive information like 
passwords or credit card information. Overall, you will be able to better picture security from 
beyond a theoretical perspective. 

~~~


1. Start Wireshark and commence capture on the appropriate interface 

2. On your machine, visit any of the websites on the target machine that has a login page 

3. You or your team member can enter a random password and username (does not have to be the correct one) and hit enter/submit/login. 

4. Go to Wireshark and use the filter to display only HTTP traffic. 

5. You will see GET requests and POST packets. We are more interested in the POST packets because that contains submissions that were 'posted' or sent to the website whereas GET is to display what you requested such as the Homepage. 

6. Double click on the POST packet(s) you see and investigate further. See if you can find the password you or your partner submitted. 



~~~admonish success

Congratulations on achieving your first ethical password sniffing attack! 

~~~


~~~admonish question title="What security measures can be implemented to prevent the capture of the password or to prevent the capture of the password in plaintext?"

~~~