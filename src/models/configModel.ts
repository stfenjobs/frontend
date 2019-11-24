import { useState, useEffect } from 'react';
import { createModel } from 'hox';

import Storage from '../utils/Storage';
import { IConfig } from '../types';


const useConfig = () => {
    const [locale, setLocale] = useState('zh_CH');

    useEffect(() => {
        // restore from storage
        const config: IConfig | null = Storage.get('config');
        if (config) {
            setLocale(config.locale);
        } else {
            const cachedConfig: IConfig = {
                locale
            };
            Storage.put('config', cachedConfig);
        }
    }, []);


    return { locale, setLocale };
};

export default createModel(useConfig);
