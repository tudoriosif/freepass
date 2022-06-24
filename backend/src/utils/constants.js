export const FINGER_OP = {
    CHECK: 'check',
    EMPTY: 'empty',
    SCAN: 'scan'
};

export const NODE_TYPES = {
    WEB: 'webcam',
    FP: 'fingerprint',
    PLATFORM: 'platform',
    CAM: 'cam',
    PIR: 'pir',
    AS_ARRAY: ['webcam', 'fingerprint', 'pir', 'cam', 'platform']
};

export const EVENT_TYPES = {
    DETECT: 'detect',
    NEW_ACCOUNT: 'new_account',
    VIDEO_START: 'video_start',
    FINGERPRINT: 'fingerprint',
    FACE: 'face',
    LOGIN: 'login',
    AS_ARRAY: ['detect', 'new_account', 'video_start', 'fingerprint', 'face', 'login']
};
