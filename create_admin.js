use admin
db.createUser(
  {
    user: "mongoadmin" ,
    pwd: "mongoadmin",
    roles: [
      "userAdminAnyDatabase",
      "dbAdminAnyDatabase",
      "readWriteAnyDatabase",
      "restore",
      "backup"
    ]
  }
)
