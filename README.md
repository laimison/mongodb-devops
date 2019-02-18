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
yum install git -y
git clone https://github.com/laimison/mongodb-devops.git
cd mongodb-devops
alias pull='git pull origin master'
pull

sudo cp mongodb-org-4.0.repo /etc/yum.repos.d/
sudo yum install -y mongodb-org-4.0.6
sudo setenforce 0
sudo service mongod start
mongo
```

Create admin user

```
mongo < delete_admin.js
mongo < list_users.js
mongo < create_admin.js
mongo < list_users.js
```

Consider (different roles)[https://docs.mongodb.com/manual/reference/built-in-roles/#root]
For super user, use 'root'
