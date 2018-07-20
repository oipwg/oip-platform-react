import { Artifact } from 'oip-index'

var demoContent = [
	{  
	    "oip042":{  
	        "artifact":{  
	            "info":{  
	                "description":"Combining the forces of Chicago, New York City, Orlando, and Sao Jose do Rio Preto, Brazil creates the eclectic sound known as Siricutico, meaning \"The Shivers\" in Portuguese. Davi (keyboard, bass, guitar, xylophone, cavaquinho), Geoff (vocals, guitar, bass), Latisha (violin), and Renee (vocals, accordion, percussion, guitar, piano) bring together their diverse musical heritage to create original songs. The band began its roots with Davi and Geoff getting together to jam. Latisha then joined in, adding the soft harmonies of the violin. However, the crew was not complete until the addition of Renee. Her unique voice, imaginative songs, and pure creativity, as well as her past experiences as a professional musician, helped to organize the group, and point them in the right direction. The group's foundation started in Knoxville, TN at the Preservation Pub where they performed surrounded by friends and fans for an enthusiastic crowd. In the end, what started out as a group of friend's playing music in the guys' front living room, resulted in this original debut cd titled, sample AB-11-26. Enjoy.",
	                "title":"Sample AB-11-26",
	                "year":2012
	            },
                "details":{  
                    "artist":"Siricutico",
                    "genre":"Country & Folk",
                    "tags":[  
                        "knoxville",
                        "tennessee",
                        "UTK",
                        "folk",
                        "BrockHouse"
                    ]
                },
	            "payment":{  
	                "fiat":"USD",
                    "scale": "1:1000",
                    "disPer": 30
	            },
	            "floAddress":"FBqdwYLZnAoePCXqZExyR6wj9d1UZ5v4Xp",
	            "storage":{  
	                "files":[  
	                    {  
	                        "fname":"01 - L'Etranger.mp3",
	                        "fsize":12354788,
	                        "type":"Audio",
                            "sugPlay": 5,
                            "sugBuy": 1000,
	                    },
	                    {     
	                        "fname":"02 - the Morning Light.mp3",
	                        "fsize":9048653,
	                        "type":"Audio",
                            "disPlay": true,
                            "sugBuy": 2000,
	                    },
	                    {  
	                        "fname":"03 - New York City Song.mp3",
	                        "fsize":9853579,
	                        "type":"Audio",
                            "disBuy": true,
                            "sugPlay": 10
	                    },
	                    {  
	                        "fname":"04 - the Spider.mp3",
	                        "fsize":7627755,
	                        "type":"Audio"
	                    },
	                    {
	                        "fname":"05 - Minnesota Crown.mp3",
	                        "fsize":9156181,
	                        "type":"Audio"
	                    },
	                    {  
	                        "fname":"06 - Puzzle Pieces.mp3",
	                        "fsize":6778989,
	                        "type":"Audio"
	                    },
	                    {  
	                        "fname":"07 - Out of Tune Guitar.mp3",
	                        "fsize":8332471,
	                        "type":"Audio"
	                    },
	                    {  
	                        "fname":"08 - Anniversary Song.mp3",
	                        "fsize":8588247,
	                        "type":"Audio"
	                    },
	                    {  
	                        "fname":"Folder.jpg",
	                        "fsize":34223,
                            "type":"Image",
	                        "subtype":"Thumbnail"
	                    }
	                ],
	                "location":"QmTrP9gAJJsrP5EYUQmJFHPiKx3hZwxk7PKcYnxmXWCzWR",
	                "network":"IPFS"
	            },
	            "timestamp":1505517609,
	            "type": "Audio",
                "subtype": "Album"
	        }
	    },
	    "txid":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
	    "publisher":"FBqdwYLZnAoePCXqZExyR6wj9d1UZ5v4Xp",
	    "publisherName":"Davi Pirata"
	}
];

var hydratedArt = [];

for (var art of demoContent){
    hydratedArt.push(new Artifact(art));
}

export default hydratedArt;