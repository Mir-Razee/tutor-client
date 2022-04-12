import { createContext, useContext } from "react";
import io from "socket.io-client";

const SOCKET_URL = window.location.origin.includes("localhost")
	? "http://localhost:5000"
	: "https://online-tutor-portal.herokuapp.com/";

const socket = io(SOCKET_URL);

const SocketContext = createContext();

const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export { useSocketContext, SocketProvider };
