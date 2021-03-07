module.exports = {
    defaultNavigation: "main",
    defaultSortSetting: {
        "name": "Recent",
        "field": "createdAt",
        "value": "-1"
    },
    defaultTypeSetting: {
        "name": "All",
        "value": "all"
    },
    sortSettings: [
        {
            name: "Recent",
            field: "createdAt",
            value: "-1"
        },
        {
            name: "Highest Likes",
            field: "likes",
            value: "-1"
        },
        {
            name: "Highest Views",
            field: "views",
            value: "-1"
        },
        {
            name: "Highest Comments",
            field: "commentsCount",
            value: "-1"
        },
    ],
    typeSettings: [
        {
            name: "All",
            value: "all"
        },
        {
            name: "Text",
            value: "text",
            icon: "fa-keyboard"
        },
        {
            name: "Image",
            value: "image",
            icon: "fa-image"
        },
        {
            name: "Video",
            value: "video",
            icon: "fa-video"
        },
        {
            name: "Audio",
            value: "audio",
            icon: "fa-file-audio"
        },
    ]
}