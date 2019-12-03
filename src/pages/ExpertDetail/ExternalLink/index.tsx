import React from 'react';
import './ExternalLink.css'

const link = 'https://github.com/wwthh/frontend/tree/khunkin'

export default () => {
    return (
        <div>
            外链
            <a href={link}>github主页</a>
        </div>
    )
} 