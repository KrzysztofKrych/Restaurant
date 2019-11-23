
import ActionType from "./notification.actions";
import { store } from "../..";

let timeout: NodeJS.Timeout;

export const toggleNotificationBarAction = (message: string, variant: string) => {
    store.dispatch({ type: ActionType.SHOW_NOTIFICATION_BAR, payload: { message, variant } });
    if(timeout) clearTimeout(timeout);
        
    timeout = setTimeout(() => {
        store.dispatch({ type: ActionType.HIDE_NOTIFICATION_BAR, payload: {message, variant} });
    }, 2000)
}


