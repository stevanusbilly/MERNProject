import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES=[
    {
        id:'p1',
        title:'Borobudur Temple',
        description: 'one of the funniest place',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SYpibWv2Wwn-RQKiBsnLBUCGrw7jXw3kHA&s',
        address: 'Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah',
        location: {
            lat: -7.6078738,
            lng: 110.2011764
        },
        creator: 'u1'
    },
    {
        id:'p2',
        title:'Borobudur Temple',
        description: 'one of the funniest place',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SYpibWv2Wwn-RQKiBsnLBUCGrw7jXw3kHA&s',
        address: 'Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah',
        location: {
            lat: -7.6078738,
            lng: 110.2011764
        },
        creator: 'u2'
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

    return <PlaceList items={loadedPlaces}/>;
}

export default UserPlaces;