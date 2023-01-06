import messaging from '@react-native-firebase/messaging';

export class FireBase {
    private static SenderID = "951812056733";
    public static Unsubcribe: any;
    public static Token: string;
    static async Init(callbackAllow: Function = () => { }, callbackDeny: Function = () => { }): Promise<void> {
        const authenStatus = await messaging().requestPermission();
        const isAllow = authenStatus == messaging.AuthorizationStatus.AUTHORIZED || authenStatus == messaging.AuthorizationStatus.PROVISIONAL;
        if (isAllow) {
            return callbackAllow();
        }
        else {
            return callbackDeny();
        }
    }

    static async GetToken(callback: Function = () => { }): Promise<void> {
        this.Token = await messaging().getToken({ senderId: this.SenderID });
        return callback();
    }

    static ReceivedNotification(callbackExecute: Function): any {
        this.Unsubcribe = messaging().onMessage(async remoteMessage => {
            callbackExecute(remoteMessage);
        });

    }
}