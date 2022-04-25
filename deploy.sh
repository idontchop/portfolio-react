npm update
npm run build
ssh jeff@192.168.1.55 "rm -rf /home/jeff/idontchop.com/portfolio/*"
scp -r build/* jeff@192.168.1.55:/home/jeff/idontchop.com/portfolio
