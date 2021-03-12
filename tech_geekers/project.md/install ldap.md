# Install OpenLDAP on Ubuntu Server 20.04

## Prerequisites:
- The most popular iteration of LDAP for Linux is OpenLDAP. OpenLDAP is a free, open-source implementation of the Lightweight Directory Access Protocol, and makes it incredibly easy to get your LDAP server up and running.
- In this three-part series, I’ll be walking you through the steps of:
1. Installing OpenLDAP server.
2. Installing the web-based LDAP Account Manager.
3. Configuring Linux desktops, such that they can communicate with your LDAP server.

## Step 1 - Update/Upgrade

To update and upgrade Ubuntu, log into your server and run the following commands:

```
$ sudo apt-get update

$ sudo apt-get upgrade -y
```

When the upgrade completes, reboot the server (if necessary), and get ready to install and configure OpenLDAP.

## Step 2 - Installing OpenLDAP

Since we’ll be using OpenLDAP as our LDAP server software, it can be installed from the standard repository. To install the necessary pieces, log into your Ubuntu Server and issue the following command:

```
$ sudo apt-get instal slapd ldap-utils -y
```
During the installation, you’ll be first asked to create an administrator password for the LDAP directory. Type and verify that password.

## Step 3 - Configuring LDAP

With the installation of the components complete, it’s time to configure LDAP. Fortunately, there’s a handy tool we can use to make this happen. From the terminal window, issue the command:

```
$ sudo dpkg-reconfigure slapd
```
In the first window, hit Enter to select No and continue on. In the second window of the configuration tool (Figure 2), you must type the DNS domain name for your server. This will serve as the base DN (the point from where a server will search for users) for your LDAP directory. In my example, I’ve used example.com (you’ll want to change this to fit your needs).



- Database backend to use – select MDB.
- Do you want the database to be removed with slapd is purged? – Select No.
- Move old database? – Select Yes.

OpenLDAP is now ready for data.

## Step 4 - Adding Initial Data

One of the best ways to add data to the LDAP directory is via text file, which can then be imported in with the ldapadd command. Create a new file with the command:

```
nano ldap_data.ldif
```
In that file, paste the following contents:

```
dn: ou=People,dc=deepak,dc=local

objectClass: organizationalUnit

ou: People


dn: ou=Groups,dc=EXAMPLE,dc=COM

objectClass: organizationalUnit

ou: Groups


dn: cn=DEPARTMENT,ou=Groups,dc=EXAMPLE,dc=COM

objectClass: posixGroup

cn: SUBGROUP

gidNumber: 5000


dn: uid=USER,ou=People,dc=EXAMPLE,dc=COM

objectClass: inetOrgPerson

objectClass: posixAccount

objectClass: shadowAccount

uid: USER

sn: LASTNAME

givenName: FIRSTNAME

cn: FULLNAME

displayName: DISPLAYNAME

uidNumber: 10000

gidNumber: 5000

userPassword: PASSWORD

gecos: FULLNAME

loginShell: /bin/bash

homeDirectory: USERDIRECTORY
```
In the above file, every entry in all caps needs to be modified to fit your company needs. Once you’ve modified the above file, save and close it with the [Ctrl]+[x] key combination. 

To add the data from the file to the LDAP directory, issue the command:

```
To add the data from the file to the LDAP directory, issue the command:
```

Remember to alter the dc entries (EXAMPLE and COM) in the above command to match your domain name.

You can then ensure the data is there, by running a search like so:

```
ldapsearch -x -LLL -b dc=EXAMPLE,dc=COM 'uid=USER' cn gidNumber
```









