# socialMediaDB

## Description

This application can be used to store and update, Users, thoughts, friends, and reactions through a mongoDB database.

- My motivation for creating this project was I wanted to create an application to demonstrate the strength of mongoDB structuring and it can be useful for things like social media applications where data needs to be slightly less structured.
- The problem I am trying to solve is that people underestimate the power of mongoDb databases and this is a great example of their power.

## Installation

The steps you need to take to install this project are to first fork my repository and clone it down to your local computer. Then you need to run npm i to install the necessary packages. Then you use the a tool like insomnia to add the content you want to the database. When you first start the database you must have mongoDB Compass to store your database and a tool like insomnia to interact with it.

## Usage

To start the the application you input "npm run start" in the command line. Then to create a user you need to include a username and email key value pairs, this will create a user with a unique \_id. You can then use that \_id to get that specific user, update their profile, view their friends, and even delete it. If you have someone elses \_id then you can add them to your friends with the friends appropriate friends route, you can also use the \_id to remove specific friends. To create a thought you need thoughtText and username key value pairs so that the thought can be created and added to the correct user. You can then use the \_id created to find, update, and delete thoughts. You can also use the thought \_id to add reactions. The reaction routes need reactionBody and username key value pairs as well as the \_id of the thought you are adding a reaction to. You can then get reactions and delete reactions with the reaction \_id.

## Links

[Link to github repo](https://github.com/Twray95/socialMediaDB)
[Link to video walkthrough](https://drive.google.com/file/d/1rLZ_2GCIAOTOVVLR-OdGDtdfRGgH81JN/view)

## License

![License](https://img.shields.io/badge/license-mit-lightgrey)

[License Link](https://choosealicense.com/licenses/mit/)
