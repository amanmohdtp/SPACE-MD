require('dotenv').config();

module.exports = {
  //Enter your session id here (optional)
  SESSION_ID: process.env.SESSION_ID || 'CYPHER-X:~UEsDBBQAAAgIAKkeRltwqteaWgQAAH0HAAAKAAAAY3JlZHMuanNvbpVU25KiSBD9l3ptY5o7akRHLCIIIooi3jb2oYACCxCwKBCc8N83sLtn5mF3tpenoi4nT+Y5md9BXuAKWagD4++gJLiBFPVL2pUIjMGkjiJEwACEkEIwBubcUgqkH0dYg9oMLkR+udfgSJ5Kxn5q3hp092nXuhbPx2*gMQBl7Wc4+A3gvmaJ1SxS84q6ObzLonllSJBU2vQuwukkQfpeku5HXVWDN*DoESEmOI+18owuiMDMQp0DMfka*eFykfBS4gllFb4GOivta*lwlrY2hDLWF8rQFe4RYxceo32NvrOzhqlSrRpr27yoxTDL2yPk8sU6vGXzTbmKiu16E9x0zfPe6Vc4zlFohiinmHZfrnunexuB2619bSGwsxnv+ljbqo19erUNsbI7cafu6eWwKLPj14hPGUrTBB8YJE24ub67ZTkbBKSF3L7atcrGNcqjQp3LSyr8Stwhn15J*0*dJVtfRMvZOSLqSVwvF7jh3VGTpQZji2E6LYT1VC5WKF3yxdfo72Q*MpYT+YoDbaNsOYmVKK3Tq58cyVHwSh6myzpl9Xyt*KQPaU1+xzJJ2Daj11iz+ZXn2*mq2F6HDcmk0HMPp*1Fnm2c7GoqaFi39sVZ+boxq8uwkxaGmG*LJna4jC0ObJXc6mrYnhth1iXrt2dGKerMEIzZxwAQFOOKEkhxkfd7vDwAMGxcFBBEn9UFdzP1tuQ0RCuOj1182ApDY9bGxlp5DWYHjQlv+6teu26dK29gAEpSBKiqUGjgihaks1FVwRhVYPznXwOQo5a+6*aMxg5AhElFvbwuswKGn6J+HsIgKOqcul0eqP0CETBmfm4jSnEeV30Z6xyS4IwbpJ4hrcA4glmFfiSICArBmJIa*WhatQj7uqvqxFrMRkswAJenHjgEYzBiR8JIHg55QebHnPhH9e3Ww8Ky*JYjCgYgh*1tEBfhHYEByJ6vWHnICaw0kgRZ5hi5f9gfPH4Q7vFDRCHOqj60uUDC63GqWYmU2MFspmixosYK+Jngp1HeleDVecs3qeodsnSSCYXVlsnllJbW*FBz4SvvJDdzbae5OAne*gHkiTDyaNqJzIREzvF035WrWCw2rd0s64WOpzZvHYWlokY+fCmM+a4jUc0G6qXdLjmF8dnb0TedtXfXHXSYqxZj5Uw26V01ACFqcIB+DUb3jme8nLTRkLvymynaLCbS3c*S+7ZKDvsq0ORTnB2cyHG5nefAwtdvpblyXvx5fLbj2Fwi42zE2dahafvqFtgumzz+sPCzhbKP0YWf7uql638jjJ6T4EOi*5TynXjvOOYx+AXjY7b8S39OwhsOQllUMl08KSdkqRU8ipeT5eKdTPNodBeGqjadz1*WB*B4*DUAZQZpVJALGIPq4kMwAKSoe*+aeVT8JpKqmGulVZQ+7QxWVPnZE1t8QRWFlxKMWVkcyRwnj8T3Ww4pSgNWZzAGnK1bzro3eKeUpUsh*WwxoPTfrJ6Ax99QSwECFAMUAAAICACpHkZbcKrXmloEAAB9BwAACgAAAAAAAAAAAAAAgIEAAAAAY3JlZHMuanNvblBLBQYAAAAAAQABADgAAACCBAAAAAA=',
  
  //Enter your number here for administrative access to the bot
  BOT_ADMIN: process.env.BOT_ADMIN || '918304063560',
  
  //Bot web server port
  PORT: parseInt(process.env.PORT) || 2605,
  
  //Enter your Github username here (Compulsory unless you have a valid premium key)
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'amanmohdtp',
  
  //Enter your desired bot password here. Users will be asked for this password when they try to connect to your bot via telegram or web
  //Must be numbers only and a total of 8 digits
  BOT_PASSWORD: parseInt(process.env.BOT_PASSWORD) || 33336666,
  
  //Enter the desired password for accessing administrative access to the bot 
  //⚠️ Do not share with anyone as they can use it to control your bot
   //Must be numbers only and a total of 8 digits
  ADMIN_PASSWORD: parseInt(process.env.BOT_PASSWORD) || 33336666,
  
  //Enter telegram bot token for interaction with this bot via telegram (optional)
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '8244233411:AAHkp1LFh7p7c1E98XtgqcwZrkOYvRIxEvg',
  
   //Antidelete and Antiedit functionality, set true to enable and false to disable. (⚠️ This function consumes a lot of memory + storage, only enable if you have enough resources ⚠️)
   ANTI_DELETE: process.env.ANTI_DELETE || 'true',
  
  
  //⚠️ Premium users settings ⚠️
   PREMIUM_KEY: process.env.PREMIUM_KEY || '',
   MAX_SESSIONS: parseInt(process.env.MAX_SESSIONS) || 3,
   EXPIRY: process.env.EXPIRY || ''
};

// You must set GITHUB_USERNAME to use the bot unless you are a premium user
// You must fork SPACE-MD repo in order to use the bot unless you're a premium user
