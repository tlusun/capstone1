# Blip Capstone
Project consists of two separate folders, client and server. Client runs on Ionic 2 with TypeScript, while Server is a Node.js server
with Express and MongoDB as server.
All the files should be there to run, but if need be

##Install Client dependencies: 
1. `npm install -g ionic cordova`
2. `ionic info`

Make sure Ionic is up to v2, and cordova is using the latest version. 

##Install Server dependencies:  
1. `cd server`
2. `npm install`

Server dependencies are configured in `package.json` in `\server` folder.

#Run Client
1. `ionic serve` or `ionic serve -l`
The first one, or [http://localhost:8100](http://localhost:8100) tests on a normal website, while the second one, or 
[http://localhost:8100/ionic-lab](http://localhost:8100/ionic-lab) tests on a phone emulator

##Run Server: 
1. `npm start`
