# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
default_pic = "default_face.png"

Event.create(lat: 40.71766400377538, lng: -74.00004386901855, venue_name: "Aplace", score: 0)
Event.create(lat: 40.715387077160194, lng: -74.00579452514648, venue_name: "Bplace", score: 0)
Event.create(lat: 40.72449431636692, lng: -73.9793586730957, venue_name: "Cplace", score: 0)

User.create(first_name: "bob", popularity: 5, profile_pic_url: default_pic)
User.create(first_name: "tob", popularity: 10, profile_pic_url: default_pic)
User.create(first_name: "rob", popularity: 15, profile_pic_url: default_pic)

Vote.create(user_id: 1, votable: Event.first, vote_direction: 1)
Vote.create(user_id: 2, votable: Event.first, vote_direction: 1)
Vote.create(user_id: 1, votable: Event.last, vote_direction: -1)
Vote.create(user_id: 3, votable: Event.last, vote_direction: -1)

Remark.create(description: "Hey hair is wonderful", giver_id: 1, receiver_id: 2, event: Event.last, remark_direction: 1)
Remark.create(description: "boots are terrible bruh",giver_id: 3, receiver_id: 1, event: Event.last, remark_direction: -1)
