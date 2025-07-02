import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile({handlelogout,settoken,user}){

  return (
    <div className="profile-container">
      <img
        className="profile-image"
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Default Avatar"
      />
      <h2 className="profile-username">{user.username}</h2>
      <p className="profile-email">{user.email}</p>
      <button className="logout-button" onClick={handlelogout}>
        Logout
      </button>
    </div>  
  );
}
export default Profile;

