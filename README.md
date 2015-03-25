# Signup Flow
CompStak Exchange signup flow – Dark Crystal project

1. Clone repo.
2. ```cd``` to the project
3. ```npm install```
4. ```bower install```
5. ```npm start```
6. Go to ```localhost:7000```

#### deployment

```bash
$ git checkout <branchName>
$ git pull --rebase
$ grunt build deploy:<env>
```
As env specify one of the environments: staging, prod, uat

Then ssh to salt (ec2-user@salt-master.cs-int-592.com) and run one of the following formulas:

```bash
$ sudo salt -N uat1 state.sls dark-crystal
$ sudo salt -N uat2 state.sls dark-crystal
$ sudo salt -N uat3 state.sls dark-crystal
$ sudo salt -N staging state.sls dark-crystal
$ sudo salt -N dark-crystal-prod state.sls dark-crystal
```