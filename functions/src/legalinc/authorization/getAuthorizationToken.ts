import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { firestoreDB } from "../../index";
import axios from "axios";
import * as Credentials from "../../config/index.json";

export async function getAuthorizationToken(
    req: functions.https.Request,
    res: functions.Response<any>
) {
    try {
        const extractData = await axios.post(
            Credentials.legalinc.key.api + `oauth/${Credentials.legalinc.key.secret}`,
            Credentials.legalinc.credentials
        );

        console.log("extractData ", extractData);

        return res.status(201).json(extractData);
    } catch (error) {
        console.log("error ", error);
        return res.status(403).json(error);
    }
}
