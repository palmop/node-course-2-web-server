# command line 
- `npm install express --save`  
- `sudo npm install nodemon -g`  
- `nodemon server.js`  
- `npm install hbs --save`

# links
- (express)[https://expressjs.com]
- (handlebars)[https://www.handlebarsjs.com], (npm hbs)[https://www.npmjs.com/package/hbs]


# git zone
```bash
git init
git status
git add package.json public readme.md server.js views
vim .gitignore # aggiunte 2 righe per evitare di considerare i log ed i moduli
git status
git add .gitignore
git commit -m 'initial commit'
```

per settare delle variabili di ambiente che servono poi per dei comandi di interazione con il server di github fai questo:  
```eval "$(ssh-agent -s)"```

in pratica setta queste 2 variabili:
```bash
SSH_AUTH_SOCK=/tmp/ssh-ylL9hUxPX4k0/agent.15123; export SSH_AUTH_SOCK;
SSH_AGENT_PID=15124; export SSH_AGENT_PID;
```

ora bisogna dire al servizio ssh_agent qual è la mia chiave, così:  
`ssh-add ~/.ssh/id_rsa` 
così potremo interagire con terze parti.

la chiave pubblica la metti nella sezione "ssh and GPG keys" di github 


la connessione di test con github la si fa così:  
`ssh -T git@github.com`  

mi accorgo che mi saluta com "hello <identità sbagliata legata a .ssh/id_rsa>" .... mmm non va bene, faccio una chiave personale   
```bash
paolo@paolo-Inspiron-5548:~/Progetti/mynotes/courses-udemy-node/webserver_app-deploy/node-web-server$ ssh-keygen -t rsa -b 4096 -C 'paolo.palmonari@gmail.com'
Generating public/private rsa key pair.
Enter file in which to save the key (/home/paolo/.ssh/id_rsa): /home/paolo/.ssh/id_rsa_personal
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/paolo/.ssh/id_rsa_personal.
Your public key has been saved in /home/paolo/.ssh/id_rsa_personal.pub.
The key fingerprint is:
SHA256:6xWFM7nq4rtLTTAtNCjrWIpdUvb+IcD5CcvmS3RcwQ8 paolo.palmonari@gmail.com
The key's randomart image is:
+---[RSA 4096]----+
|     .o..        |
|  . +. oE. o     |
|   * o+ oo= .    |
|  + *..=  .=     |
|.* +.*o.S o      |
|+ o.+.=o.o .     |
|   o. .o+..      |
|   ....o..       |
|    .o==o        |
+----[SHA256]-----+
```  

la metto in github dopo averla aggiunta al ssh-agent con `ssh-add ~/.ssh/id_rsa_personal`

ed infatti ora se faccio `ssh -i ~/.ssh/id_rsa_personal -T git@github.com` ottengo la giusta risposta:   
```
paolo@paolo-Inspiron-5548:~/Progetti/mynotes/courses-udemy-node/webserver_app-deploy/node-web-server$ ssh -i ~/.ssh/id_rsa_personal -T git@github.com
Hi palmop! You've successfully authenticated, but GitHub does not provide shell access.
```

mi accorgo che il push prende la chiave sbagliata, allora edito .ssh/config in questo modo:
```bash
#Host dokku.me
#  IdentityFile "~/.ssh/id_rsa"
Host github-as-palmop
  HostName github.com
  User git
  IdentityFile /home/paolo/.ssh/id_rsa_personal
  #IdentitiesOnly yes
```

e in .git/config nel progetto metto come remote: 
```
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
    logallrefupdates = true
[remote "origin"]
    #url = git@github.com:palmop/node-course-2-web-server.git
    url = git@github-as-palmop:palmop/node-course-2-web-server.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[user]
	email = paolo.palmonari@gmail.com
    name = Paolo Palmonari

[branch "master"]
	remote = origin
	merge = refs/heads/master
```
al prosto della url commentata metto qiella che fa riferimento a **github-as-palmop**

# heroku zone
- fai un account su heroku.com
- vai su https://devcenter.heroku.com , consigliano di fare `sudo snap install --classic heroku` per ubuntu.
- `heroku login`
- la porta in listen del server deve essere settata con una variabile di ambiente. (process.env)
- heroku guarda lo "start" (nella sezione scripts) in package.json , che poi in locale se fai `npm start` fa la stessa cosa
