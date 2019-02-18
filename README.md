# mongodb-devops

### Setup Vagrant

```
cd mongodb-devops
vagrant init centos/7
vagrant up
vagrant ssh
```

### Setup Centos virtual box

```
yum install git -y
git clone https://github.com/laimison/mongodb-devops.git
cd mongodb-devops
alias pull='git pull origin master'
pull
```
