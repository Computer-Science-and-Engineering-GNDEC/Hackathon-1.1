
# Install the Apache Web Server on Ubuntu 20.04 --

### Prerequisites :
[initial server setup guide for Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)

## Step 1 — Installing Apache

Apache is available within Ubuntu’s default software repositories, so you can install it using conventional package management tools.

Update your local package index:

```
 $ sudo apt update
 ```
 
 Install the apache2 package:
 
 ```
 $ sudo apt install apache2
```

## Step 2 — Adjusting the Firewall

Check the available ufw application profiles: 

```
$ sudo ufw app list
```
Output:

```
Available applications:
  Apache
  Apache Full
  Apache Secure
  CUPS
  OpenLDAP LDAP
  OpenLDAP LDAPS
  OpenSSH
  ```
  
  Let’s enable the most restrictive profile that will still allow the traffic you’ve configured, permitting traffic on port 80 (normal, unencrypted web traffic): 
  
  ```
  $ sudo ufw allow 'Apache'
```

Verify the change:

```
$ sudo ufw status
```
output:

```
Status: active

To                         Action      From
--                         ------      ----
Apache                     ALLOW       Anywhere                  
OpenSSH                    ALLOW       Anywhere                  
389                        ALLOW       Anywhere                  
80/tcp                     ALLOW       Anywhere                  
22/tcp                     ALLOW       Anywhere                  
Apache (v6)                ALLOW       Anywhere (v6)             
OpenSSH (v6)               ALLOW       Anywhere (v6)             
389 (v6)                   ALLOW       Anywhere (v6)             
80/tcp (v6)                ALLOW       Anywhere (v6)             
22/tcp (v6)                ALLOW       Anywhere (v6)             

```

## Step 3 — Checking your Web Server

Check with the systemd init system to make sure the service is running by typing:

```
$ sudo systemctl status apache2
```
Output:

```
● apache2.service - The Apache HTTP Server
     Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor prese>
     Active: active (running) since Thu 2021-03-11 21:34:56 IST; 2h 51min ago
       Docs: https://httpd.apache.org/docs/2.4/
    Process: 849 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUC>
   Main PID: 962 (apache2)
      Tasks: 6 (limit: 4004)
     Memory: 9.4M
     CGroup: /system.slice/apache2.service
             ├─962 /usr/sbin/apache2 -k start
             ├─963 /usr/sbin/apache2 -k start
             ├─964 /usr/sbin/apache2 -k start
             ├─965 /usr/sbin/apache2 -k start
             ├─966 /usr/sbin/apache2 -k start
             └─967 /usr/sbin/apache2 -k start

Mar 11 21:34:49 codehunter systemd[1]: Starting The Apache HTTP Server...
Mar 11 21:34:56 codehunter systemd[1]: Started The Apache HTTP Server.
lines 1-18/18 (END)...skipping...

```

Access the default Apache landing page to confirm that the software is running properly through your IP address:

```
http://your_server_ip
```

## Step 4 — Setting Up Virtual Hosts (Recommended)

Create the directory for your_domain:

```
sudo mkdir /var/www/your_domain
```
Assign ownership of the directory:

```
$ sudo chown -R $USER:$USER /var/www/your_domain
```

The permissions of your web roots should be correct if you haven’t modified your unmask value, but you can make sure by typing:

```
$ sudo chmod -R 755 /var/www/your_domain
```

Create a sample index.html page using nano or your favorite editor:

```
$ nano /var/www/your_domain/index.html
```

Inside, add the following sample HTML:

```
<html>
    <head>
        <title>Welcome to Your_domain!</title>
    </head>
    <body>
        <h1>Success!  The your_domain virtual host is working!</h1>
    </body>
</html>
```

Save and close the file when you are finished.

Make a new virtual host file at /etc/apache2/sites-available/your_domain.conf: 

```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName your_domain
    ServerAlias your_domain
    DocumentRoot /var/www/your_domain
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Save and close the file when you are finished.

Enable the file with a2ensite: 

```
 $ sudo a2ensite your_domain.conf
```

Disable the default site defined in 000-default.conf:

```
sudo a2dissite 000-default.conf

```

Test for configuration errors: 

```
$ sudo apache2ctl configtest
```
Output:
```
Syntax Ok
```

Restart Apache to implement your changes:

```
sudo systemctl restart apache2
```
