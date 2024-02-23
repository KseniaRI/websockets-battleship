import { wsServer } from "../ws_server/index.js";

export const handleTerminationSignals = () => {
    console.log("Terminating program...");
    wsServer.close(() => {
        process.exit(0);
    });
};