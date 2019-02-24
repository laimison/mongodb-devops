# mongodb-devops

### Setup Vagrant

```
cd mongodb-devops
vagrant init centos/7
vagrant up
vagrant ssh
```

### Steps on Centos virtual box

```
sudo yum install git lsof -y
git clone https://github.com/laimison/mongodb-devops.git
cd mongodb-devops
alias pull='git pull origin master'
pull

sudo cp mongodb-org-4.0.repo /etc/yum.repos.d/
sudo yum install -y mongodb-org-4.0.6
sudo setenforce 0
sudo service mongod start
mongo

sudo mkdir -p /data/1/log /data/2/log /data/3/log
sudo mkdir -p /data/1/db /data/2/db /data/3/db
sudo mkdir -p /data/1/config /data/2/config /data/3/config
sudo mkdir -p /data/1/pid /data/2/pid /data/3/pid

sudo cp mongod-1.conf /data/1/config/mongod.conf
sudo cp mongod-2.conf /data/2/config/mongod.conf
sudo cp mongod-3.conf /data/3/config/mongod.conf

sudo mongod -f /data/1/config/mongod.conf --replSet myset

mongo --port 27001
rsconf={ _id:"myset", members: [ { _id: 0,host:"localhost:27001"}]}
rs.initiate(rsconf)

db.test.insert({"Test": 1})
db.test.find()
rs.status()

sudo mongod -f /data/2/config/mongod.conf --replSet myset
sudo mongod -f /data/3/config/mongod.conf --replSet myset

sudo lsof -n -i -P | grep LISTEN | grep 2700

mongo --port 27001

rsconf={ _id:"myset", protocolVersion: 1, members: [ { _id: 0, host:"localhost:27001" }, { _id: 1, host:"localhost:27002" }, { _id: 2, host:"localhost:27003"}]}
rs.reconfig(rsconf)
rs.status()
db.isMaster()

mongo --port 27002
rs.slaveOk()

mongo --port 27003
rs.slaveOk()
db.test.find()

mongo --port 27001
db.test.insert({"Test2": 2})

mongo --port 27002
db.test.find()
```

Create admin user

```
mongo < delete_admin.js
mongo < list_users.js
mongo < create_admin.js
mongo < list_users.js
mongo -u mongoadmin -p mongoadmin
mongo < admin_user_exists.js
```

Consider [different roles](https://docs.mongodb.com/manual/reference/built-in-roles/#root)

For super user, use 'root'

To disable [anonymous authentication](https://stackoverflow.com/questions/22647842/disable-anonymous-access-to-mongodb)
