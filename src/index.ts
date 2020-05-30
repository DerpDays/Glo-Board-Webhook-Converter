// import * as dotenv from "dotenv";
// dotenv.config();
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import signitureMiddleware from "./signitureMiddleware";
import axios from "axios";
import moment from "moment";
import chalk from "chalk";
import figlet from "figlet";
import { rgbToHex, postWebhook, replaceAllInsensitive, jsonEqual, getColumnNameByID } from "./utils";
import config from "../config";


const app = express();
const port = config.port;

// Configure Express to use EJS
app.use(helmet())
app.use(bodyParser.json())
app.use(signitureMiddleware)

// https://discordapp.com/api/webhooks/714268393385230356/pu8AEzs5Kut-JhkXO5m4-YZM0KuR2nekzcC7jbcw2XIm1TvS1arwRmITPMZ_AHXGQKu0
// define a route handler for the default home page
app.post("/", async (req, res) => {
    try {
        if (req.headers["x-gk-event"] === "boards") {
            if (req.body.action === "archived" && config.settings.board.events.archived.enabled) {
                const actionOptions = config.settings.board.events.archived
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.board.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "unarchived" && config.settings.board.events.unarchived.enabled) {
                const actionOptions = config.settings.board.events.unarchived
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.board.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "updated" && config.settings.board.events.renamed.enabled) {
                const actionOptions = config.settings.board.events.renamed
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.board.name], ["{prevname}", req.body.board.previous.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "deleted" && config.settings.board.events.deleted.enabled) {
                const actionOptions = config.settings.board.events.deleted
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.board.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "labels_updated") {
                if (req.body.labels.added.length !== 0 && config.settings.label.events.added.enabled) {
                    const actionOptions = config.settings.label.events.added
                    const label = req.body.labels.added[0];
                    await postWebhook({
                        overrideColor: actionOptions.useLabelColor ? Number(await rgbToHex(label.color.r, label.color.g, label.color.b)).toString() : null,
                        body: await replaceAllInsensitive(
                            actionOptions.format.body, [["{name}", label.name], ["{r}", label.color.r], ["{g}", label.color.g], ["{b}", label.color.b]]
                        ),
                        footer: await replaceAllInsensitive(
                            actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                        ),
                        conf: actionOptions
                    })
                } else if (req.body.labels.deleted.length !== 0 && config.settings.label.events.deleted.enabled) {
                    const actionOptions = config.settings.label.events.deleted;
                    const label = req.body.labels.deleted[0];
                    await postWebhook({
                        overrideColor: actionOptions.useLabelColor ? Number(await rgbToHex(label.color.r, label.color.g, label.color.b)).toString() : null,
                        body: await replaceAllInsensitive(
                            actionOptions.format.body, [["{name}", label.name], ["{r}", label.color.r], ["{g}", label.color.g], ["{b}", label.color.b]]
                        ),
                        footer: await replaceAllInsensitive(
                            actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                        ),
                        conf: actionOptions,
                    });
                } else if (req.body.labels.updated.length !== 0) {
                    const label = req.body.labels.updated[0];
                    if (!(await jsonEqual(label.color, label.previous.color)) && label.name === label.previous.name && config.settings.label.events.updated.color.enabled) {
                        const actionOptions = config.settings.label.events.updated.color;
                        await postWebhook({
                            overrideColor: actionOptions.useLabelColor ? Number(await rgbToHex(label.color.r, label.color.g, label.color.b)).toString() : null,
                            body: await replaceAllInsensitive(
                                actionOptions.format.body, [
                                    ["{name}", label.name], ["{r}", label.color.r], ["{g}", label.color.g], ["{b}", label.color.b],
                                    ["{rprev}", label.previous.color.r], ["{gprev}", label.previous.color.g], ["{bprev}", label.previous.color.b]
                                ]
                            ),
                            footer: await replaceAllInsensitive(
                                actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                            ),
                            conf: actionOptions,
                        })
                    } else if (await jsonEqual(label.color, label.previous.color) && label.name !== label.previous.name && config.settings.label.events.updated.name.enabled) {
                        const actionOptions = config.settings.label.events.updated.name;
                        await postWebhook({
                            overrideColor: actionOptions.useLabelColor ? Number(await rgbToHex(label.color.r, label.color.g, label.color.b)).toString() : null,
                            body: await replaceAllInsensitive(
                                actionOptions.format.body,
                                [["{name}", label.name], ["{r}", label.color.r], ["{g}", label.color.g], ["{b}", label.color.b], ["{prevname}", label.previous.name]
                            ]
                            ),
                            footer: await replaceAllInsensitive(
                                actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                            ),
                            conf: actionOptions,
                        });
                    } else if (!(await jsonEqual(label.color, label.previous.color)) && label.name !== label.previous.name && config.settings.label.events.updated.both.enabled) {
                        const actionOptions = config.settings.label.events.updated.both;
                        await postWebhook({
                            overrideColor: actionOptions.useLabelColor ? Number(await rgbToHex(label.color.r, label.color.g, label.color.b)).toString() : null,
                            body: await replaceAllInsensitive(
                                actionOptions.format.body,
                                [["{name}", label.name], ["{r}", label.color.r], ["{g}", label.color.g], ["{b}", label.color.b], ["{prevname}", label.previous.name],
                                ["{rprev}", label.previous.color.r], ["{gprev}", label.previous.color.g], ["{bprev}", label.previous.color.b]
                            ]
                            ),
                            footer: await replaceAllInsensitive(
                                actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                            ),
                            conf: actionOptions,
                        });
                    };
                };
            }
        } else if (req.headers["x-gk-event"] === "columns") {

            if (req.body.action === "archived" && config.settings.column.events.archived.enabled) {
                const actionOptions = config.settings.column.events.archived
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.column.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "unarchived" && config.settings.column.events.unarchived.enabled) {
                const actionOptions = config.settings.column.events.unarchived
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.column.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "added" && config.settings.column.events.added.enabled) {
                const actionOptions = config.settings.column.events.added
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.column.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "updated" && config.settings.column.events.renamed.enabled) {
                const actionOptions = config.settings.column.events.renamed
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.column.name], ["{prevname}", req.body.column.previous.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "deleted" && config.settings.column.events.deleted.enabled) {
                const actionOptions = config.settings.column.events.deleted
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.column.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            }





        } else if (req.headers["x-gk-event"] === "cards") {



            if (req.body.action === "added" && config.settings.card.events.added.enabled) {
                const actionOptions = config.settings.card.events.added
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{column}", await getColumnNameByID(
                            req.body.card.board_id, req.body.card.column_id
                        )]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "updated") {
                if (req.body.card.name !== req.body.card.previous.name && config.settings.card.events.updated.renamed.enabled) {
                    const actionOptions = config.settings.card.events.updated.renamed
                    await postWebhook({
                        body: await replaceAllInsensitive(
                            actionOptions.format.body, [["{name}", req.body.card.name], ["{prevname}", req.body.card.previous.name],
                                ["{column}", await getColumnNameByID(req.body.card.board_id, req.body.card.column_id)]
                            ]
                        ),
                        footer: await replaceAllInsensitive(
                            actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                        ),
                        conf: actionOptions
                    })
                } else if (req.body.card.description.text !== req.body.card.previous.description.text && config.settings.card.events.updated.renamed.enabled) {
                    const actionOptions = config.settings.card.events.updated.description
                    await postWebhook({
                        body: await replaceAllInsensitive(
                            actionOptions.format.body, [["{name}", req.body.card.name], ["{prevdescription}", req.body.card.previous.description.text],
                            ["{description}", req.body.card.description.text], ["{column}", await getColumnNameByID(req.body.card.board_id, req.body.card.column_id)]
                        ]
                        ),
                        footer: await replaceAllInsensitive(
                            actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                        ),
                        conf: actionOptions
                    })
                } else {
                    const actionOptions = config.settings.card.events.updated.other
                    await postWebhook({
                        body: await replaceAllInsensitive(
                            actionOptions.format.body, [["{name}", req.body.card.name],
                            ["{column}", await getColumnNameByID(req.body.card.board_id, req.body.card.column_id)]
                        ]
                        ),
                        footer: await replaceAllInsensitive(
                            actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                        ),
                        conf: actionOptions
                    })
                }
            } else if (req.body.action === "archived" && config.settings.card.events.archived.enabled) {
                const actionOptions = config.settings.card.events.archived
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "unarchived" && config.settings.card.events.unarchived.enabled) {
                const actionOptions = config.settings.card.events.unarchived
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "deleted" && config.settings.card.events.deleted.enabled) {
                const actionOptions = config.settings.card.events.deleted
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{description}", req.body.card.description.text],
                        ["{column}", await getColumnNameByID(req.body.card.board_id, req.body.card.column_id)]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "moved_column" && config.settings.card.events.movedColumn.enabled) {
                const actionOptions = config.settings.card.events.movedColumn
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{column}", await getColumnNameByID(req.body.card.board_id, req.body.card.column_id)]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions
                })
            } else if (req.body.action === "labels_updated" && config.settings.card.events.labelsUpdated.enabled) {
                const actionOptions = config.settings.card.events.labelsUpdated;
                let updates = "";
                for (let i = 0; i < req.body.labels.added.length; i++) {
                    updates = updates.concat(`+ ${req.body.labels.added[i].name}\n`)
                }
                for (let i = 0; i < req.body.labels.removed.length; i++) {
                    updates = updates.concat(`- ${req.body.labels.removed[i].name}\n`)
                }
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{updates}", updates]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions,
                });
            } else if (req.body.action === "assignees_updated" && config.settings.card.events.assigneesUpdated.enabled) {
                const actionOptions = config.settings.card.events.assigneesUpdated;
                let updates = "";
                for (let i = 0; i < req.body.assignees.added.length; i++) {
                    updates = updates.concat(`+ ${req.body.assignees.added[i].name} (${req.body.assignees.added[i].username})\n`)
                }
                for (let i = 0; i < req.body.assignees.removed.length; i++) {
                    updates = updates.concat(`- ${req.body.assignees.removed[i].name} (${req.body.assignees.removed[i].username})\n`)
                }
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{updates}", updates]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions,
                });
            }




        } else if (req.headers["x-gk-event"] === "comments") {
            if (req.body.action === "added" && config.settings.comment.events.added.enabled) {
                const actionOptions = config.settings.comment.events.added;
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{comment}", req.body.comment.text]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions,
                });
            } else if (req.body.action === "deleted" && config.settings.comment.events.deleted.enabled) {
                const actionOptions = config.settings.comment.events.deleted;
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{comment}", req.body.comment.text]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions,
                });
            } else if (req.body.action === "updated" && config.settings.comment.events.updated.enabled) {
                const actionOptions = config.settings.comment.events.updated;
                await postWebhook({
                    body: await replaceAllInsensitive(
                        actionOptions.format.body, [["{name}", req.body.card.name], ["{comment}", req.body.comment.text], ["{prevcomment}", req.body.comment.previous.text]]
                    ),
                    footer: await replaceAllInsensitive(
                        actionOptions.format.footer, [["{username}", req.body.sender.username], ["{name}", req.body.sender.name]]
                    ),
                    conf: actionOptions,
                });
            }
        } else {
            console.log(
                chalk.red(
                    figlet.textSync("WARNING", {
                        horizontalLayout: "full",
                        font: "big"
                    })
                ),
                `\nInvalid data was recieved, this could mean that your secret was exposed.`
            )
            return res
                .status(400)
                .json({ "result": "Invalid data recieved." });
        }
        return res
            .status(200)
            .json({ "result": "Sent successfully." });
    } catch (err) {
        console.log(chalk.red(err))
        // console.error(err)
        return res
            .status(500)
            .json({ "result": "Error while processing the request." });
    }
});

app.listen(port, () => {
    console.log(
        chalk.yellow(
            figlet.textSync("STARTED", {
                horizontalLayout: "full",
                font: "big"
            })
        ),
        `\nListening for incoming requests on port ${chalk.green(port)}.`,
        `\n${chalk.red("http://127.0.0.1:" + port)}`
    );
});