import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id: '1',
            name: 'Stevanus Billy',
            image: 'https://www.shutterstock.com/image-vector/cute-panda-dabbing-pose-cartoon-260nw-2471990065.jpg',
            places: 3
        }
    ];

    return (
        <UsersList items={USERS} />
    );
}

export default Users;