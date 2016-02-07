# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
default_pic = "default_face.png"

# Users
u1=User.find(1)
u2=User.find(2)
u3=User.find(3)
u4=User.find(4)
u5=User.find(5)
u6=User.find(6)


# House Parties
e1=Event.create(lat: 40.7615435, lng: -73.9497317, address: "540 Main St Apt 474, New York, NY 10044", venue_name: "Ian's House Party", description: "It's going down y'all! BYOF (bring your own food)", score: 1000, house_party: true)
e2=Event.create(lat: 40.7870106, lng: -73.9753676, address: "85th and Amsterdam", venue_name: "Trashing my Aunt's place", description: "Everyone invited, ring 10F and say popular", score: 300, house_party: true)
e3=Event.create(lat: 40.7763909, lng: -73.963048, address: "10 E 79th Penthouse", venue_name: "Central Park Penthouse Bash", description: "You can come as long as you're a dude", score: 300, house_party: true)
e4=Event.create(lat: 40.7337966, lng: -73.9753676, address: "Palladium Dorm 1401", venue_name: "NYU Dorm Party", description: "NYU only", score: 100, house_party: true)
e5=Event.create(lat: 40.7161581, lng: -74.0000463, address: "101 Bayard", venue_name: "Chinatown Roof Blowout", description: "Yooooooo come party on my roof don't fall off lol", score: 200, house_party: true)
e6=Event.create(lat: 40.7637581, lng: -73.9918181, address: "10th and W 49th", venue_name: "Masked Guy Fighting Chick", description: "That dude in the mask is here fighting some chick, come watch", score: 250, house_party: true)
e7=Event.create(lat: 40.76399173, lng: -73.99163839, address: "ACROSS ST ON OTHER ROOF NOW", venue_name: "OMG CHICK HAS POWERS", description: "YO EVERYBODY GIRL IN BLACK IS A FREAK, HAS SUPER STRENGTH but way hotter than Cap lol ;)", score: 222, house_party: true)
e8=Event.create(lat: 40.70322257, lng: -73.99072741, venue_name: "Pizza rat j chillin'", description: "Rats only", score: 150, house_party: true)
e9=Event.create(lat: 40.75857141, lng: -73.93831061, address: "Placella Park", venue_name: "Wiccan Meetup", description: "Gonna cast some spells come on out", score: 100, house_party: true)
e10=Event.create(lat: 40.74023827, lng: -74.02584288, address: "Pier C", venue_name: "Hoboken Pier Hang", description: "Gonna look at Manhattan and dream big", score: 0, house_party: true)

# Bars/Venues/Nightclubs
e11=Event.create(lat: 40.714079, lng: -73.9614, place_id: "ChIJeadrRGBZwokRk36FfurfOkE", venue_name: "Rosamunde Sausage Grill", score: 1300)
e12=Event.create(lat: 40.7043615, lng: -74.0100459, place_id: "ChIJV_vNLhRawokRt36u5nIPaVw", venue_name: "Ulysses A Folk House", score: 1500)
e13=Event.create(lat: 40.7408001, lng: -73.9883453, place_id: "ChIJTbD_UqFZwokRqrxlscGF3AE", venue_name: "Live Bait", score: 1000)
e14=Event.create(lat: 40.7272403, lng: -73.9923516, place_id: "ChIJeRqd0JpZwokRG4UKjO1bU4I", venue_name: "Swift Hibernian Lounge", score: 650)
e15=Event.create(lat: 40.7317696, lng: -73.9841161, place_id: "ChIJZ1fMFZ5ZwokRkYrV85CZorY", venue_name: "Nowhere", score: 400)
e16=Event.create(lat: 40.7318657, lng: -73.985616, place_id: "Place ID: ChIJs0crYZ5ZwokR-ydMbNtK_VM", venue_name: "Durden", score: 0)
e17=Event.create(lat: 40.7183226, lng: -73.9905281, place_id: "ChIJkYH3FodZwokR4fVpywN0gps", venue_name: "RPM Bar", score: 0)
e18=Event.create(lat: 40.802742, lng: -73.9673764, place_id: "ChIJrVMzMTv2wokRL99F1aKkyss", venue_name: "Tara Hill Irish Tavern", score: 1100)
e19=Event.create(lat: 40.8143006, lng: -73.9441025, place_id: "ChIJmU3ycHH2wokR6A8gMLe9sNY", venue_name: "Shrine", score: 500)
e20=Event.create(lat: 40.7120405, lng: -73.9510741, place_id: "ChIJCRZAjFhZwokRv6cEvR8K8Ik", venue_name: "Barcade", score: 700)

Vote.create(user: u1, votable: e1, vote_direction: 1)
Vote.create(user: u2, votable: e2, vote_direction: 1)
Vote.create(user: u5, votable: e3, vote_direction: 1)
Vote.create(user: u4, votable: e4, vote_direction: 1)
Vote.create(user: u5, votable: e5, vote_direction: 1)
Vote.create(user: u1, votable: e6, vote_direction: 1)
Vote.create(user: u1, votable: e7, vote_direction: 1)
Vote.create(user: u5, votable: e8, vote_direction: 1)
Vote.create(user: u4, votable: e9, vote_direction: 1)
Vote.create(user: u5, votable: e10, vote_direction: 1)

Vote.create(user: u1, votable: e11, vote_direction: 1)
Vote.create(user: u2, votable: e12, vote_direction: 1)
Vote.create(user: u5, votable: e13, vote_direction: 1)
Vote.create(user: u4, votable: e14, vote_direction: 1)
Vote.create(user: u2, votable: e15, vote_direction: 1)
Vote.create(user: u5, votable: e16, vote_direction: 1)
Vote.create(user: u5, votable: e17, vote_direction: 1)
Vote.create(user: u5, votable: e18, vote_direction: 1)
Vote.create(user: u4, votable: e19, vote_direction: 1)
Vote.create(user: u2, votable: e20, vote_direction: 1)

