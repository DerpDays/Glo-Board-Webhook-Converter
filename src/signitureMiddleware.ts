import { HmacSHA1 } from "crypto-js";
import config from "../config";

const createSignature = async (body) => {
    try {
        return `sha1=${await HmacSHA1(body, config.webhookSecret)}`
    } catch (err) {
        console.log(err)
        return "error while trying to create Hmac."
    }
};

const signitureMiddleware = async (req, res, next) => {
    try {
        if (
            config.webhookSecret === undefined ||
            config.webhookSecret == null ||
            config.webhookSecret.length <= 0
        ) { next() } else {
            const signature = await createSignature(JSON.stringify(req.body));
            console.log(signature)
            if (signature !== req.headers['x-gk-signature']) {
                return await res
                .status(403)
                .json({
                    "result": "Invalid Signiture"
                });
            }
            next();
        }
    } catch (err) {
        console.log(err)
    }
};

export default signitureMiddleware