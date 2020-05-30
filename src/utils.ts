import axios from "axios";
import config from "../config";
import moment from "moment";

export const rgbToHex = async (r, g, b) => {
    return "0x" + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
}

export const postWebhook = async (options) => {
    await axios.post(config.discordWebhook, {
        embeds: [{
            color: options.overrideColor || options.conf.embedColor || config.fallbackColor,
            author: {
                name: options.conf.format.title.name,
                url: options.conf.format.title.url,
            },
            footer: {
                text: options.footer,
            },
            description: options.body,
            timestamp: options.conf.format.timestamp ? moment.utc() : null,
        }]
    })
}

export const getColumnNameByID = async (boardID, columnID) => {
    try {
        let res = (await axios.get(`https://gloapi.gitkraken.com/v1/glo/boards/${boardID}?fields=columns`, {
            headers: {
                Authorization: `Bearer ${config.apiKey}`
            }
        })).data;
        for (let i = 0; i < res.columns.length; i++) {
            if (res.columns[i].id == columnID) {
                return res.columns[i].name
            }
        }
    } catch {
        return "Unknown Column"
    }
    return "Unknown Column"
}


export const replaceAllInsensitive = async (origin, replaceArray): Promise<string> => {
    return new Promise(async (resolve) => {
        for (let i = 0; i < replaceArray.length; i++) {
            let escapedValue = await replaceArray[i][0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            let reg = new RegExp(escapedValue, 'ig');
            origin = await origin.replace(reg, replaceArray[i][1]);
        }
        return resolve(origin)
    });
}

export const jsonEqual = async (JSON1, JSON2) => {
    return new Promise(async (resolve) => {
        resolve(JSON.stringify(JSON1) === JSON.stringify(JSON2));
    });
};
