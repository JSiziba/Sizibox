@echo off
call ng build
scp -r dist/sizibox/* su@192.168.100.10:/home/su/CustomPrograms/Sizibox/Frontend
