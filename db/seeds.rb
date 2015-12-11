# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Event.create(lat: 40.71766400377538, lng: -74.00004386901855, venue_name: "Aplace", score: 0)
Event.create(lat: 40.715387077160194, lng: -74.00579452514648, venue_name: "Bplace", score: 0)
Event.create(lat: 40.72449431636692, lng: -73.9793586730957, venue_name: "Cplace", score: 0)

<<<<<<< 14b81f6ce5f19c79fc12dd53f1c22e4708068aa4
User.create(popularity: 5)
User.create(popularity: 10)
User.create(popularity: 15)

Vote.create(user_id: 1, votable: Event.first, vote_direction: 1)
Vote.create(user_id: 2, votable: Event.first, vote_direction: 1)
Vote.create(user_id: 1, votable: Event.last, vote_direction: -1)
Vote.create(user_id: 3, votable: Event.last, vote_direction: -1)

Remark.create(description: "Hey hair is wonderful", giver_id: 1, receiver_id: 2, event: Event.last, remark_direction: 1)
Remark.create(description: "boots are terrible bruh",giver_id: 3, receiver_id: 1, event: Event.last, remark_direction: -1)
=======

User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)
User.create(popularity: 100)

Vote.create(user_id: 1, event_id: 1, vote_direction: 1)
Vote.create(user_id: 2, event_id: 1, vote_direction: 1)
Vote.create(user_id: 3, event_id: 1, vote_direction: 1)
Vote.create(user_id: 4, event_id: 1, vote_direction: 1)
Vote.create(user_id: 5, event_id: 1, vote_direction: -1)
Vote.create(user_id: 6, event_id: 1, vote_direction: -1)
Vote.create(user_id: 7, event_id: 1, vote_direction: 1)
Vote.create(user_id: 8, event_id: 1, vote_direction: 1)
Vote.create(user_id: 9, event_id: 1, vote_direction: 1)
Vote.create(user_id: 10, event_id: 1, vote_direction: 1)
Vote.create(user_id: 11, event_id: 1, vote_direction: 1)
Vote.create(user_id: 12, event_id: 1, vote_direction: 1)
Vote.create(user_id: 13, event_id: 1, vote_direction: 1)
Vote.create(user_id: 14, event_id: 1, vote_direction: 1)
>>>>>>> Add methods for updating Event Score and doling out popularity points.
