
const fileType = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
}
const fileObj = {
    'text/x-python': {
        language: 'python',
        type: fileType.TEXT
    },
    // 'application/x-python-code': {
    //     language: 'python',
    //     type: fileType.TEXT
    // },
    'text/plain': {
        language: 'plaintext',
        type: fileType.TEXT
    },
    'image/png': {
        language: 'plaintext',
        type: fileType.IMAGE
    }
} as Record<string, { language: string, type: string }>

export {
    fileType,
    fileObj
}
