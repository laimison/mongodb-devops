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
sudo yum install git -y
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

mongod -f /data/1/config/mongod.conf --replSet myset --install --serviceName db27000

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
