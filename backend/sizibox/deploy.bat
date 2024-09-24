@echo off
call ./mvnw clean package
scp target/sizibox-0.0.1-SNAPSHOT.jar su@192.168.0.10:/home/su/CustomPrograms/Sizibox/Backend