import { useState, useEffect } from 'react';

function useTokenVerification() {
   const [loggedIn, setLoggedIn] = useState(false);
   const [name, setName] = useState("");

   useEffect(() => {
       const user = JSON.parse(localStorage.getItem("user"));

       if (!user || !user.token) {
           setLoggedIn(false);
           return;
       }

       fetch("http://localhost:8080/api/auth/verify", {
           method: "POST",
           headers: {
               'jwt-token': user.token
           }
       })
           .then(r => r.json())
           .then(r => {
               if ('success' === r.message) {
                   setLoggedIn(true);
                   setName(user.name);
                

               } else {
                   setLoggedIn(false);
                   setName("");
               }
           })
           .catch(error => {
               console.error('Error verifying token:', error);
               setLoggedIn(false);
           });
   }, []);

   return { loggedIn, name };
}

export default useTokenVerification;