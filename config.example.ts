export default {
    // Your discord webhook URL where the response will be sent to.
    discordWebhook: "YOUR DISCORD WEBHOOK URI (REQUIRED)",

    // The secret for your webhook, set this to "" or null to not use a secret
    // However using a secret is reccomended as webhooks can access things like @everyone
    // Which can make forged requests very bad.
    webhookSecret: "YOUR WEBHOOK SECRET (RECCOMENDED - LEAVE EMPTY TO DISABLE)",

    // This can be either a PAT (personal access token) or a OAUTH token, and is used to make API requests for info on things like comments etc.
    // We reccomend you use a PAT with the scope "Read" on Board.
    apiKey: "YOUR API KEY (REQUIRED)",
    // The port for the webserver to listen on.
    port: 8080,

    // The color used if a color for a specific action is not found.
    fallbackColor: 0x0080FF,



    //
    //
    //
    // SETTINGS BELOW CAN BE LEFT DEFAULT AND ARE THERE TO PROVIDE MORE CUSTOMIZABILITY.
    //
    //
    //

    // These settings are for the webhook responses, and wether events are enabled or disabled.
    // They describe the response webhook for each event on every type of incoming webhook.

    // Colours need to be defined as 0xHEXCODE instead of the traditional #HEXCODE format.

    // The following events have not been added because I felt like they weren't needed, however you make create an issue and discuss this
    // With me, or feel free to create a pull request with it added!
    // card: copied
    // card: reordered
    // card: moved_to_board
    // card: moved_from_board
    // column: reordered
    // board: members_updated
    settings: {
        board: {
            events: {
                // Dispatched events for board:
                archived: {
                    // This event is triggered whenever a board is archived.
                    enabled: true,
                    embedColor: 0xFF8000,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Board Archived",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The board name.
                        body: "The board `{name}` was archived.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                unarchived: {
                    // This event is triggered whenever a board is unarchived.
                    enabled: true,
                    embedColor: 0xFF8000,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Board Unarchived",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The board name.
                        body: "The board `{name}` was unarchived.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                renamed: {
                    // This event is triggered whenever a board is renamed.
                    enabled: true,
                    embedColor: 0x0080FF,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Board Renamed",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The new board name.
                        // {prevname}: The previous board name.
                        body: "The board `{prevname}` was renamed to `{name}`.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                deleted: {
                    // This event is triggered whenever a board is deleted.
                    enabled: true,
                    embedColor: 0xFF3333,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Board Deleted",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The delted board name.
                        body: "The board `{name}` was deleted.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
            },
        },
        label: {
            // Dispatched events for labels:
            events: {
                added: {
                    // This event is triggered whenever a label is added.
                    enabled: true,
                    // If this is true, instead of displaying the embedColor below, it will use label's color for the embed.
                    useLabelColor: true,
                    embedColor: 0x00FF80,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Label Added",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The new label's name.
                        // {r}: The R segment of the RGB value of the label.
                        // {b}: The B segment of the RGB value of the label.
                        // {g}: The G segment of the RGB value of the label.
                        body: "A new label called `{name}` was added.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                deleted: {
                    // This event is triggered whenever a label is deleted.
                    enabled: true,
                    // If this is true, instead of displaying the embedColor below, it will use label's color for the embed.
                    useLabelColor: true,
                    embedColor: 0xFF3333,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Label Deleted",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The delted label name.
                        // {r}: The R segment of the RGB value of the label.
                        // {b}: The B segment of the RGB value of the label.
                        // {g}: The G segment of the RGB value of the label.
                        body: "The label `{name}` was deleted.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                updated: {
                    color: {
                        // This event is triggered whenever a label's color is changed.
                        enabled: true,
                        // If this is true, instead of displaying the embedColor below, it will use label's color for the embed.
                        useLabelColor: true,
                        embedColor: 0xFF3333,
                        format: {
                            title: {
                                // The title of the embed.
                                name: "Label Updated",
                                // The URL that the title leads to when clicked, can be set to "" to be disabled.
                                url: "https://app.gitkraken.com/glo/",
                            },
                            // Variables:
                            // {name}: The label's name.
                            // {r}: The R segment of the RGB value of the label.
                            // {b}: The B segment of the RGB value of the label.
                            // {g}: The G segment of the RGB value of the label.
                            // {rPrev}: The R segment of the RGB value of the label's previous color.
                            // {gPrev}: The B segment of the RGB value of the label's previous color..
                            // {bPrev}: The G segment of the RGB value of the label's previous color..
                            body: "The label `{name}` had its color updated to RGB: `{r}`, `{g}`, `{b}`.",
                            // Variables:
                            // {username}: The user's username
                            // {name}: The user's real name
                            footer: "Triggered by: {name} ({username})",
                            timestamp: true,
                        },
                    },
                    name: {
                        // This event is triggered whenever a label is renamed.
                        enabled: true,
                        // If this is true, instead of displaying the embedColor below, it will use label's color for the embed.
                        useLabelColor: true,
                        embedColor: 0xFF3333,
                        format: {
                            title: {
                                // The title of the embed.
                                name: "Label Renamed",
                                // The URL that the title leads to when clicked, can be set to "" to be disabled.
                                url: "https://app.gitkraken.com/glo/",
                            },
                            // Variables:
                            // {name}: The label's name.
                            // {prevName}: The label's previous name.
                            // {r}: The R segment of the RGB value of the label.
                            // {b}: The B segment of the RGB value of the label.
                            // {g}: The G segment of the RGB value of the label.
                            body: "The label `{prevName}` was renamed to `{name}`.",
                            // Variables:
                            // {username}: The user's username
                            // {name}: The user's real name
                            footer: "Triggered by: {name} ({username})",
                            timestamp: true,
                        },
                    },
                    both: {
                        // This event is triggered whenever a label's color and name is changed.
                        enabled: true,
                        // If this is true, instead of displaying the embedColor below, it will use label's color for the embed.
                        useLabelColor: true,
                        embedColor: 0xFF3333,
                        format: {
                            title: {
                                // The title of the embed.
                                name: "Label Updated",
                                // The URL that the title leads to when clicked, can be set to "" to be disabled.
                                url: "https://app.gitkraken.com/glo/",
                            },
                            // Variables:
                            // {name}: The label's name.
                            // {prevName}: The label's previous name.
                            // {r}: The R segment of the RGB value of the label.
                            // {b}: The B segment of the RGB value of the label.
                            // {g}: The G segment of the RGB value of the label.
                            // {rPrev}: The R segment of the RGB value of the label's previous color.
                            // {gPrev}: The B segment of the RGB value of the label's previous color..
                            // {bPrev}: The G segment of the RGB value of the label's previous color..
                            body: "The label `{prevName}` was renamed to `{name}` and had it's color updated to RGB: `{r}`, `{g}`, `{b}`.",
                            // Variables:
                            // {username}: The user's username
                            // {name}: The user's real name
                            footer: "Triggered by: {name} ({username})",
                            timestamp: true,
                        },
                    },
                },
            },
        },
        column: {
            events: {
                // Dispatched events for board:
                archived: {
                    // This event is triggered whenever a column is archived.
                    enabled: true,
                    embedColor: 0xFF8000,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Column Archived",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The column name.
                        body: "The column `{name}` was archived.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                unarchived: {
                    // This event is triggered whenever a column is unarchived.
                    enabled: true,
                    embedColor: 0xFF8000,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Column Unarchived",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The column name.
                        body: "The column `{name}` was unarchived.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                added: {
                    // This event is triggered whenever a column is deleted.
                    enabled: true,
                    embedColor: 0x00FF80,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Column Added",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The new column name.
                        body: "A new column called `{name}` was added.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                renamed: {
                    // This event is triggered whenever a column is renamed.
                    enabled: true,
                    embedColor: 0x0080FF,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Column Renamed",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The new column name.
                        // {prevname}: The previous column name.
                        body: "The column `{prevname}` was renamed to `{name}`.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                deleted: {
                    // This event is triggered whenever a column is deleted.
                    enabled: true,
                    embedColor: 0xFF3333,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Column Deleted",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The delted column's name.
                        body: "The column `{name}` was deleted.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
            },
        },
        card: {
            events: {
                // Dispatched events for card:
                added: {
                    // This event is triggered whenever a card is added.
                    enabled: true,
                    embedColor: 0x00FF80,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Added",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The added card name.
                        // {column}: The column the card was added to.
                        body: "The card `{name}` was added to the column `{column}`.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                updated: {
                    renamed: {
                        // This event is triggered whenever a card is renamed.
                        enabled: true,
                        embedColor: 0x0080FF,
                        format: {
                            title: {
                                // The title of the embed.
                                name: "Card Renamed",
                                // The URL that the title leads to when clicked, can be set to "" to be disabled.
                                url: "https://app.gitkraken.com/glo/",
                            },
                            // Variables:
                            // {name}: The card's new name.
                            // {prevName}: The card's previous name.
                            // {column}: The column the card is in.
                            body: "The card `{prevName}` in `{column}` was renamed to `{name}`.",
                            // Variables:
                            // {username}: The user's username
                            // {name}: The user's real name
                            footer: "Triggered by: {name} ({username})",
                            timestamp: true,
                        },
                    },
                    description: {
                        // This event is triggered whenever a card has it's description updated.
                        enabled: true,
                        embedColor: 0x0080FF,
                        format: {
                            title: {
                                // The title of the embed.
                                name: "Card Description Updated",
                                // The URL that the title leads to when clicked, can be set to "" to be disabled.
                                url: "https://app.gitkraken.com/glo/",
                            },
                            // Variables:
                            // {name}: The added card name.
                            // {description}: The card's new description.
                            // {prevDescription}: The card's previous description.
                            // {column}: The column the card is in.
                            body: "The card `{name}` in `{column}` had its description changed from ```\n{prevDescription}\n``` to ```\n{description}\n```",
                            // Variables:
                            // {username}: The user's username
                            // {name}: The user's real name
                            footer: "Triggered by: {name} ({username})",
                            timestamp: true,
                        },
                    },
                    other: {
                        // This event is triggered whenever a card is updated in which the name and description stay the same.
                        enabled: true,
                        embedColor: 0x0080FF,
                        format: {
                            title: {
                                // The title of the embed.
                                name: "Card Updated",
                                // The URL that the title leads to when clicked, can be set to "" to be disabled.
                                url: "https://app.gitkraken.com/glo/",
                            },
                            // Variables:
                            // {name}: The card's name.
                            // {column}: The column the card is in.
                            body: "The card `{name}` in `{column}` had some attributes updated, to view them please visit the board!",
                            // Variables:
                            // {username}: The user's username
                            // {name}: The user's real name
                            footer: "Triggered by: {name} ({username})",
                            timestamp: true,
                        },
                    },
                },
                archived: {
                    // This event is triggered whenever a card is archived.
                    enabled: true,
                    embedColor: 0xFF8000,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Archived",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The card name.
                        body: "The card `{name}` was archived.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                unarchived: {
                    // This event is triggered whenever a card is unarchived.
                    enabled: true,
                    embedColor: 0xFF8000,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Unarchived",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The card name.
                        body: "The card `{name}` was unarchived.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                deleted: {
                    // This event is triggered whenever a card is deleted.
                    enabled: true,
                    embedColor: 0xFF3333,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Deleted",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The card's name.
                        // {column}: The column that the card was in.
                        // {description}: The card's description.
                        body: "The card `{name}` in `{column}` was deleted.\nIt had a description of: ```\n{description}\n```",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                movedColumn: {
                    // This event is triggered whenever a card is moved across columns.
                    enabled: true,
                    embedColor: 0x0080FF,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Moved",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The card's name.
                        // {column}: The column that the card is now in.
                        body: "The card `{name}` was moved to `{column}`.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                labelsUpdated: {
                    // This event is triggered whenever labels are added/removed from a card.
                    enabled: true,
                    embedColor: 0x0080FF,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Labels Updated",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The card's name.
                        // {updates}: The updates that the card had to it (label changes).
                        body: "The card `{name}` was had the following label(s) added/removed:\n```diff\n{updates}```",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                assigneesUpdated: {
                    // This event is triggered whenever assignees are added/removed from a card.
                    enabled: true,
                    embedColor: 0x0080FF,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Card Assignees Updated",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The card's name.
                        // {updates}: The updates that the card had to it (assignee changes).
                        body: "The card `{name}` was had the following assignee(s) added/removed:\n```diff\n{updates}```",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
            },
        },
        comment: {
            events: {
                // Dispatched events for comments:
                added: {
                    // This event is triggered whenever a comment is added.
                    enabled: true,
                    embedColor: 0x00FF80,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Comment Deleted",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The added comment's card.
                        // {comment}: The comment text.
                        body: "A new comment was added to `{name}` saying:\n```\n{comment}```.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                updated: {
                    // This event is triggered whenever a comment is updated.
                    enabled: true,
                    embedColor: 0x0080FF,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Comment Updated",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The updated comment's card.
                        // {prevComment}: The previous comment.
                        // {comment}: The new comment.
                        body: "The comment in the card `{name}` was changed from:\n```\n{prevComment}```to\n```\n{comment}```",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
                deleted: {
                    // This event is triggered whenever a comment is deleted.
                    enabled: true,
                    embedColor: 0xFF3333,
                    format: {
                        title: {
                            // The title of the embed.
                            name: "Comment Deleted",
                            // The URL that the title leads to when clicked, can be set to "" to be disabled.
                            url: "https://app.gitkraken.com/glo/",
                        },
                        // Variables:
                        // {name}: The delted comment's card.
                        // {comment}: The comment text.
                        body: "The comment ```\n{comment}```Was deleted from the card `{name}`.",
                        // Variables:
                        // {username}: The user's username
                        // {name}: The user's real name
                        footer: "Triggered by: {name} ({username})",
                        timestamp: true,
                    },
                },
            },
        },
    },
}