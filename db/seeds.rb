# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
default_pic = "default_face.png"

Event.create(lat: 40.71766400377538, lng: -74.00004386901855, venue_name: "Aplace", score: 0)
Event.create(lat: 40.715387077160194, lng: -74.00579452514648, venue_name: "Bplace", score: 11)
Event.create(lat: 40.72449431636692, lng: -73.9793586730957, venue_name: "Cplace", score: 101)
Event.create(lat: 40.706299941436384, lng: -74.0090936422348, venue_name: "DBC", score: 501)
Event.create(lat: 40.72966400377538, lng: -74.00504386901855, venue_name: "hello", score: 1001)
Event.create(lat: 40.716387077160194, lng: -74.00579452514648, venue_name: "i", score: 1200)
Event.create(lat: 40.72049431636692, lng: -73.9723586730957, venue_name: "am", score: 700)
Event.create(lat: 40.708299941436384, lng: -74.0060936422348, venue_name: "ian", score: 15)


User.create(first_name: "bob", popularity: 5, profile_pic_url: default_pic)
User.create(first_name: "tob", popularity: 10, profile_pic_url: default_pic)
User.create(first_name: "rob", popularity: 15, profile_pic_url: default_pic)

Vote.create(user_id: 1, votable: Event.find(1), vote_direction: 1)
Vote.create(user_id: 2, votable: Event.find(1), vote_direction: 1)
Vote.create(user_id: 1, votable: Event.find(3), vote_direction: -1)
Vote.create(user_id: 3, votable: Event.find(3), vote_direction: -1)
Vote.create(user_id: 2, votable: Event.find(4), vote_direction: 1)

Remark.create(description: "Her hair is wonderful", giver_id: 1, receiver_id: 2, event: Event.find(1), remark_direction: 1)
Remark.create(description: "Those boots are terrible bruh",giver_id: 3, receiver_id: 1, event: Event.find(3), remark_direction: -1)
