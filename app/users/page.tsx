"use client"

import { signOut } from "next-auth/react";

const Users = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full bg-graySeven text-white">
    
  <button onClick={() => signOut()}>
Logout
  </button>
    </div>
  );
};

export default Users;
