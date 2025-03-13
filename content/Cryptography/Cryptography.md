# Cryptography

In this lab you are going to investigate digital sigatures and experiment with some asymmetric encryption

## 1 Basic Digital Cert Analysis

1. Using the current web page/url for this lab click on the **padlock**(🔒) or **triangle** sign next to the URL 
2. If connection is secure, click on **connection is secure**, and read what it says. 

    ~~~admonish example title="Example of text" collapsible=true

    This site has a valid certificate, issued by a trusted authority.

    This means information (such as passwords or credit cards) will be securely sent to this site and cannot be intercepted.

    Always be sure you're on the intended site before entering any information.​

    ~~~
3. Click the certifcate icon 


4. If certificate is valid, click on it, and go to details (see figure 1 below). 


5.  Analyse the certificate by clicking on each field. Answer the questions below.

    ~~~admonish question title="Is the connection secure?"

    ~~~

    ~~~admonish question title="Why do you think the connection appears as secure/not secure?"

    ~~~

    ~~~admonish question title="What is the intended purpose for the digital certificate? "

    ~~~

    ~~~admonish question title="Can you find the public key for the website? What is it?"

    ~~~

    ~~~admonish question title="What algorithm is used for the signature hash?"

    ~~~


## 2 Creating an OpenSSL Certifcate

### 2.1  Install OpenSSL

The first step in creating a self-signed SSL certificate is to install the `OpenSSL` package, which provides the necessary tools for generating SSL certificates. On most Linux distributions, you can install `OpenSSL` using the package manager.

6. Installation

    ~~~admonish terminal title="Linux - Ubuntu or Debian based"

    ```sh
    sudo apt update 
    sudo apt install openssl 
    ```

    ~~~

    ~~~admonish terminal title="macOS"

    ```sh
    brew update
    brew install openssl
    echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile
    source ~/.bash_profile
    ```

    ~~~


    ~~~admonish terminal title="Windows - Terminal"

    ```sh
    winget search openssl
    winget install --id=FireDaemon.OpenSSL -e
    $Env:PATH += ";C:\Program Files\FireDaemon OpenSSL 3\bin"
    ```

    ~~~

### 2.2 Generate a Private Key

7. Once you have OpenSSL installed, the next step is to generate a private key. 
   
   ~~~admonish important

   The private key is an essential component of the SSL certificate, as it is used to sign and decrypt data. 

   ~~~

8. Run the following command to generate a 2048-bit RSA private key:

    ~~~admonish terminal

    ```
    openssl genrsa -out elee1171.key 2048 
    ```

    ~~~

    ~~~admonish warning

    Replace elee1171.key” with your desired file name, if this was a real certifcate. Make sure to keep this private key secure, as it is critical for maintaining the security of your SSL certificate.

    ~~~

9. Check the content of the generated key

    ~~~admonish terminal 

    ```sh
     cat elee1171.key
    ```

    ~~~

    ~~~admonish output collapsible=true
    
    ```
    -----BEGIN PRIVATE KEY-----
    MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDtPoZbRFiznfR5
    pjKIlf5LQ8UfxAkLg+IE1piJ2BYIMzmgGDZiynuaQqS1KuCKFWCpflxd5clW3nsr
    VwDJr1eh8Ytz62EHnfth4qaT8xHxtNmT157yWZvixI3db1A2XXG+nkBKJIF7GVrz
    46aM5v5OAMVrzEIegWVJL2uoxOY6rMf8ciHWa+/v4lbDpY6oXRJwYURZdKTNgyZ2
    YYU1bgtN8A4VDMxctamuJa/P/jXSCiNO3HbV4cWTWGUa7qVMQuZI4bQGQsU51oPn
    EzFgn0sJRXLaxVG8l9LTkiUf8d90l1hG5+6ysrUFaGXmlTV835+7AuwXm+mPDLKw
    PtT5B8cxAgMBAAECggEAC0W7g2DNDc8X7jjHRrtJFMvrSkNZrQD5mgJqnIVrzzzE
    hJa/Qh89/g95EnzvTs2jD7fyjRPtkVxVrLKVVb/oUXLv4z81l3Ok8wVz0JdNzLbW
    WLfidEBC5SSIML4zfjsfPAVPvNtyWzDnpADMKX6R6jm5/PwnTxpAVQN1DCo7iIw/
    hyhyTkPcJIEyUn7XTO0m/fhOTlnISy0EICrUG00ifX2Si5oOIbwXVWDaiUkW7M4g
    D96TI778gOPpVGR0tq94Mn/Taozg7NBFf6xpv5GRrHQL0rTU1NnlRxAvjYLKX8S9
    dlu8LKQz49aa+8fPOtgMBujgb59xakorLvD3CUavDQKBgQD6jKDHsFhuX/SOngWt
    QkQLGmKiJqDiOB8YWqljRHpMcr5jmwOHgGwqZUSY3uPvYWtFmPdCxRyJ9VecDerr
    Trjf/ygBwX7ZLjCWEz+BMDMhoYh0+ExQoxYyQ5cp6r3jDCP/enW2GhqVklROGvA9
    7uUrA/g5ayctDxn9PwMpvl9IpQKBgQDyZ8wiex/IpS/YoNikzrWC6tIyMyYVRzPl
    O+psbY0kXtECcwa4xomaWTeVTaKXkGJli4gLEEKM/wpPh+W7K7vePWRJFQ0wNCKJ
    PT/85ODT0/clvIv287mk0DtUZ6jb8zwhMegMUlO/ZUfxJtdF1bZsOS8MU063mk+A
    HLpaFkgynQKBgCqxEahU/Qx5nzM569+03eFCcrIMgPdq9qlwsVIv1eL23kgcnsJU
    +JlUvhaKTC563At04BTpf05mlrIJkRDdThUk5g0+ij25aB/6UaTSsLO3UYgU0vQe
    hea0q6pBzG9Gn0+l7y7DTepUj7brUipLbZMhzwcBoiBEZXpIZWKUhKndAoGAQWTf
    HS46FNb7YWWDDHL3ZKoUqpZB39ullGHli/rB6N3rZM3DMnXdCVaoOA8JnfnFkb9i
    pBlu2rqy/WGcCDJ0LDBDrbOQK0DlUEDF0mOsg3jbY8LJv4Vgv6WtW8fbNfsYbZwZ
    Dbnn/epEzjm8OYq9+9QxbRHMWpu2dslJPKRmNcECgYBPQvoBD6IDHQA1jPvqfDc9
    qkN2mkLV/pheOAmfW+auWn1RGpvqLI2+zhcYaKvNQRCgjdYwvEx0oig181NgaDY5
    7yXhCCzpIyzQKgS/RlKpW2Bo17hJxjQKFYaKw8pBObaoliQH4vC/bBKS2aZKnjlQ
    AFc24siCoKwkVXwM5ibhGA==
    -----END PRIVATE KEY-----
    ```

    ~~~

### 2.3 Create a Certificate Signing Request (CSR)

Next, you’ll need to create a Certificate Signing Request (CSR) that includes information about your server and organization. The CSR is required to generate the SSL certificate.

10. Run the following command to create a CSR:

    ~~~admonish terminal

    ```sh
    openssl req -new -key elee171.key -out elee171.csr 
    ```

    ~~~

    ~~~admonish warning

    Replace elee171.key” with the name of your private key and elee171.csr” with your desired CSR file name, when deploying for real. 
    
    You will be prompted to enter various details, such as your country, state, locality, organization name, common name (domain name), and email address. 
    
    In real scenario you would feel out the details as to your company or as an individual

    ~~~

11. Fill in these details accurately, as they will be used in your SSL certificate, with the following:

    ~~~admonish terminal

    ```sh
    $ openssl req -new -key elee1171.key -out elee1171.csr
    You are about to be asked to enter information that will be incorporated
    into your certificate request.
    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:UK
    State or Province Name (full name) [Some-State]:Kent
    Locality Name (eg, city) []:Gillingham
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:ELEE1171
    Organizational Unit Name (eg, section) []:Engineering
    Common Name (e.g. server FQDN or YOUR name) []:elee1171.ac.uk
    Email Address []:elee1171@elee1171.ac.uk

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:123456789
    An optional company name []:ELEE1171
    ```

    ~~~

12. Check the content of the generated Certificate Signing Request file

    ~~~admonish terminal

    ```sh
     cat elee1171.csr
    ```

    ~~~

    ~~~admonish output collapsible=true
    
    ```
    -----BEGIN CERTIFICATE REQUEST-----
    MIIDFDCCAfwCAQAwgZsxCzAJBgNVBAYTAlVLMQ0wCwYDVQQIDARLZW50MRMwEQYD
    VQQHDApHaWxsaW5naGFtMREwDwYDVQQKDAhFTEVFMTE3MTEUMBIGA1UECwwLRW5n
    aW5lZXJpbmcxFzAVBgNVBAMMDmVsZWUxMTcxLmFjLnVrMSYwJAYJKoZIhvcNAQkB
    FhdlbGVlMTE3MUBlbGVlMTE3MS5hYy51azCCASIwDQYJKoZIhvcNAQEBBQADggEP
    ADCCAQoCggEBAL7v0RzkygL3Wc+PK436YYpflD8ahZCyOVW6/ndZCTjwAVzBsc5v
    6bOPmSOLc8M9autlCdDuWpLeCqBUpCx6YPiUxmNGIoq63fZY2VG68WHeHoMflRfJ
    ShZl+b6g09l9XHdnkT3gzPDrKDrJVzUJxVKdSdpfcjaBVQ9bPsIqX3bKZwb0gGqt
    /4Lwfq18zao2Rc9He7LNlDnXFezKXEy567RLahAgX37sMjcE8AJf1wh/iUR8K5Dn
    M1Ytj5Bn7yBldAQd8O/kTcpvqTU6ZEKdGjBUPydwUwoJ2FzWAskufgyVMB+AUHoF
    jpYn+yDiLKgyj9KRXWgTnSYY2wXfPGKLKc8CAwEAAaAzMBcGCSqGSIb3DQEJAjEK
    DAhFTEVFMTE3MTAYBgkqhkiG9w0BCQcxCwwJMTIzNDU2Nzg5MA0GCSqGSIb3DQEB
    CwUAA4IBAQC3ydjAoNY4D3UiON8SK+Y7NdpoprCzYiNOfVqjjvy5DCEFr7qK8ukD
    2zUtSAqUv0GZb2JIZTalLls6/27K1pz6SBh4FhOvzTB9diYKKCSYybViNucKXTpd
    kNzrYjZ8sCxJsckrvSJ6Jc2KmeRrnKGUlq8vyD0Lx2tPevDvNmOcZR/MahY51cog
    svjbEnEfLgvztxKmKZyY67VXqOvvGm0qzqMqvs+whbFO5kYNiTOIOkoN2M6KQWV6
    ih4UNM9stkhjStt6DbQ5W93Z4RyVvjDcxfiEptyS2YUtPyPJ9KR9eM5dwIX+f4fn
    4pvWxBMku/8N8I8oEkkGre36o0Oqge7H
    -----END CERTIFICATE REQUEST-----
    ```

    ~~~

### 2.4 Generate the Self-Signed SSL Certificate


13. Now that you have a CSR, you can generate your self-signed SSL certificate using the following command:

    ~~~admonish terminal

    ```sh
    openssl x509 -req -days 365 -in elee1171.csr -signkey elee1171.key -out elee1171.crt 
    ```

    ~~~

    ~~~admonish output collapsible=true

    ```
    Certificate request self-signature ok
    subject=C=UK, ST=Kent, L=Gillingham, O=ELEE1171, OU=Engineering, CN=elee1171.ac.uk, emailAddress=elee1171@elee1171.ac.uk
    ```

    ~~~


    ~~~admonish warning

    Replace `elee1171.csr` with your CSR file name, `elee1171.key` with your private key file name, and `elee1171.crt` with your desired SSL certificate file name, when deploying for real

    ~~~

    ~~~admonish example title="Explanation"

    - `x509`: The command used to perform `x509` certificate operations, such as signing, generating, and displaying information.

    - `-req`:	Specifies that the input file should be treated as a certificate signing request (CSR) rather than a certificate.

    - `-days 365`:	Sets the validity period of the certificate in days (in this case, 365 days). You can change this value as needed.

    - `-in`: Specifies the input file to be used, which is the CSR file (`elee1171.csr` in this case). Replace `elee1171.csr` with the appropriate file name.

    - `-signkey`:	Indicates the private key that will be used to sign the certificate. In this case, it is the `elee1171.key` file. Replace “example.key” with the appropriate file name.

    - `-out`:	Specifies the output file for the generated certificate. In this case, it is the `elee1171.crt` file. Replace `elee1171.crt` with the desired file name.

    ~~~

### 2.5 Configure A Web Server to Use the SSL Certificate

In this exercise we are going to create a python web server to use our newly created self-signed SSL certificate.

14. First we need to create a python virtual environment

    ~~~admonish terminal

    ```sh
    # Create a virtual environment
    <python/py> -m venv venv

    # Activate the virtual environment
    # On Windows:
    source venv\Scripts\activate

    # On macOS/Linux:
    source venv/bin/activate
    ```

    ~~~

15. Now you are in a virutal environment we can install so packages that will be isolated from the sytem wide python packages.

    ~~~admonish terminal

    ```
    $ pip install flask
    ```

    ~~~


16. Create a python script called `server.py` and reproduce the following: 

    
    ~~~admonish code

    ```py
    from flask import Flask
    import ssl

    app = Flask(__name__)

    @app.route('/')
    def home():
        return "Secure Flask Web Server with OpenSSL Certificate!"

    if __name__ == "__main__":
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(certfile="elee1171.crt", keyfile="elee1171.key")

        # Explicitly enable HTTPS
        app.run(host="127.0.0.1", port=5000, ssl_context=context)

    ```

    ~~~

17. Run the script: 

    ~~~admonish terminal
    
    ```sh
    python server.py
    ```

    ~~~

    ~~~admonish output collapsible=true
    
    ```
    * Serving Flask app 'server'
     * Debug mode: off
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
     * Running on https://127.0.0.1:5000
    ```

    ~~~

18. You can `curl` the url and see what it displays, open a second terminal and type:

    ~~~admonish terminal

    ```
    curl -k https://127.0.0.1:5000
    ```

    ~~~

    ~~~admonish output collapsible=true
    
    ```
    Secure Flask Web Server with OpenSSL Certificate!
    ```

    ~~~

19. Navigate to your web browser of your choice, best to run incognito and go to the URL `https:127.0.0.1:5000`

20. Here is and example of the certificate

<div align=center>

![](./figures/elee1171_cert.png)

</div>

### 2.6 Summary

Creating a self-signed SSL certificate using the terminal command line is a straightforward process that can be accomplished with just a few commands. While self-signed SSL certificates should not be used for production environments, they can be an invaluable tool for testing, development, or internal applications. By following this step-by-step guide, you can easily generate a self-signed SSL certificate and configure your web server to use it.

Keep in mind that self-signed SSL certificates may trigger security warnings in web browsers, as they are not signed by a trusted Certificate Authority (CA). For production environments, it is highly recommended to use an SSL certificate issued by a trusted CA to ensure the best security and user experience.

In summary, mastering the terminal command line to create self-signed SSL certificates is a valuable skill that can help you maintain the security and privacy of your applications during development and testing. By familiarising yourself with OpenSSL commands and understanding the importance of SSL certificates, you’ll be well-equipped to manage and secure your web services effectively.


## 3. Reflection and Analysis

~~~admonish question title="What are the key differences between self-signed certificates and certificates issued by a trusted CA?" collapsible=true

<div style="padding-top:25px; padding-bottom:25px">

|Feature|	Self-Signed Certificate|	CA-Issued Certificate|
|---|----|---|
|Issuer|	Signed by the same entity that owns the certificate (i.e., the website itself)|	Signed by a Certificate Authority (CA), which is a trusted third party|
|Trust Level|	Not inherently trusted by browsers or operating systems	|Trusted because it is issued by a CA whose root certificate is pre-installed in browsers and OS|
|Use Case|	Internal testing, local development, private networks| Public-facing websites, online services, e-commerce|
|Validation	|No external validation – anyone can generate one |	Requires identity verification, domain control validation (DV), and sometimes organization validation (OV) or extended validation (EV)|
|Security Risk|	Susceptible to MITM attacks if improperly configured |	More resistant to forgery due to CA oversight and revocation mechanisms|
|Cost|	Free (generated by the user)	|Paid or free (e.g., Let's Encrypt), but involves external verification|
|Revocation and Transparency |	No built-in revocation mechanism	|Can be revoked by the CA and logged in Certificate Transparency (CT) logs|

</div>

~~~

~~~admonish question title="Why do browsers warn against self-signed certificates?" collapsible=true

- **Lack of Trust**

    A self-signed certificate is not issued by a recognized CA, so browsers cannot verify its legitimacy.

- **MITM Attack Risk** 

    If an attacker intercepts the connection and replaces the legitimate certificate with their own self-signed certificate, users might be deceived into thinking the connection is secure.

- **No Revocation or Transparency**

    There’s no way to revoke a self-signed certificate if it gets compromised.

- **No Identity Verification**

    Unlike CA-issued certificates, which require domain validation (and sometimes organizational identity validation), self-signed certificates provide no assurance of the entity behind the website.

**Exception**: Browsers allow users to manually trust a self-signed certificate, which is useful in private networks and testing environments.

~~~

~~~admonish question title="What are the real-world implications of an attacker creating a fraudulent certificate?" collapsible=true

A fraudulent certificate allows an attacker to impersonate a legitimate website and conduct **Man-in-the-Middle (MITM)** attacks. Some key implications:

- **Phishing Attacks** 

    An attacker can create a certificate for bankofamerica.com, tricking users into entering their credentials on a fake site.

- **SSL Interception (MITM)** 
    
    A fraudulent CA-issued certificate can allow attackers (or governments) to intercept and decrypt supposedly secure communications.

- **Supply Chain Attacks**

    Attackers can sign malicious software updates with a fraudulent certificate, making them appear legitimate.

- **Corporate Espionage** 
    
    A fake certificate could be used to eavesdrop on encrypted corporate communications.

~~~

~~~admonish question title="Exploration Task: Research certificate transparency logs. Can you find any reported fraudulent certificates?" collapsible=true

Certificate Transparency (CT) Logs are public records of SSL/TLS certificates issued by CAs, helping detect fraudulent or misissued certificates.

**Notable Examples of Fraudulent Certificates Found in CT Logs:**

1. (2017) – Symantec Misissuance Scandal

    - Google discovered that Symantec CAs had improperly issued over 30,000 certificates without proper validation.

    - Result: Chrome distrusted Symantec-issued certificates, forcing them to transfer operations to DigiCert.

2. (2019) – Apple and Google Revoke Trust in DarkMatter CA

    - DarkMatter, a UAE-based security company, applied to become a trusted CA.

    - CT logs revealed that DarkMatter had already issued certificates in questionable circumstances.

    - Result: Apple and Google preemptively distrusted the CA.

3. (2020) – Let's Encrypt Revokes 3 Million Certificates

    - Due to a bug in Let's Encrypt’s domain validation system, it was possible that some certificates were issued incorrectly.

    - Result: Let's Encrypt mass-revoked 3 million affected certificates.

~~~