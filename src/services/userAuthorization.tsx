import React, { useState, createContext } from "react";
const UserRoleContext: any = createContext(null);
const UserRoleContextConsumer = UserRoleContext.Consumer;

const UserRoleContextProvider = (props: any) => {
  const [userDetails, setUserDetails] = useState({
    isLoggedIn: false,
  });

  // Update the details context
  const updateContext = (data: any) => {
    setUserDetails((prevState) => ({
      ...prevState,
      ...data,
    }));
  };


  return (
    <UserRoleContext.Provider
      value={{
        ...userDetails,
        updateContext: updateContext,
      }}
    >
      {props.children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleContext, UserRoleContextProvider, UserRoleContextConsumer };
