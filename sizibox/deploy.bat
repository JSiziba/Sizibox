@echo off
call ng build
scp -r dist/sizibox/* su@192.168.0.10:/home/su/CustomPrograms/Sizibox/Frontend
