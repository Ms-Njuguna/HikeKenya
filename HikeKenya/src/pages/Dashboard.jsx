import React from "react";
import UserInfo from '../components/Dashboard/UserInfo';
import Badges from "../components/Dashboard/Badges";

function Dashboard({ badges, users}) {
    return (
        <diV>
            <h1>This is the Dashboard page</h1>
            <div>
                {users.map((user) => {
                    return(
                        <UserInfo name={user.name} email={user.email} points={user.points}/>
                    )
                })}
            </div>
            <div>
                {users.map(user => {
                    return (
                        <Badges user={user} badges={badges}/>
                    );
                })}
            </div>
        </diV>
    );
};

export default Dashboard;