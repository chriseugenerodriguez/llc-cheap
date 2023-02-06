import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";
import * as Credentials from "./config/index.json";
import { getAuthorizationToken } from "./legalinc/authorization/getAuthorizationToken";
import * as firebaseServiceAccount from "./config/llc-cheap-service-account.json";

const serviceAccount = firebaseServiceAccount as admin.ServiceAccount;

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

export const firestoreDB = admin.firestore();

const whitelist = ["http://localhost:4200", `${Credentials.legalinc.key.api}`];

const corsHandler = cors({
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Origin: ${origin} not allowed by CORS!!`));
            // callback(null, true)
        }
    },
});

module.exports = {
    getAuthorizationToken: functions.https.onRequest(
        (req: functions.https.Request, res: functions.Response<any>) => {
            corsHandler(req, res, async () => await getAuthorizationToken(req, res));
        }
    ),
};
