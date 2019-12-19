import React, {useEffect, useState} from 'react';
import useRouter from 'use-react-router';
import {Card, Icon, Statistic} from 'antd';
import Col from "antd/es/grid/col";

const data = [
    {
        name: "学者",
        countIndex: 0,
        icon: "user"
    },
    {
        name: "领域",
        countIndex: 1,
        icon: "dot-chart"
    },
    {
        name: "知识概念",
        countIndex: 2,
        icon: "alert"
    }
];


const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};


export default () => {
    const {history} = useRouter();
    const [countAr, setCountAr] = useState([0, 0, 0]);
    const [countrun, setCountRun] = useState(0);

    const maxCount = [2230000, 1233430, 2130320];

    const addCount = async (num: number, ms: number) => {
        for (let j = 0; j < countAr.length; j += 1) {
            if (countAr[j] + num <= maxCount[j]) countAr[j] += num;
            await sleep(ms);
            setCountAr(countAr);
            setCountRun(countrun + num * j);
        }
    };
    // 数字增长函数，完成动效，勿删
    const updateData = async () => {
        const br = (add: number) => {
            let b = 0;
            for (let t = 0; t < countAr.length; t += 1) {
                if (countAr[t] + add >= maxCount[t]) b += 1;
            }
            return b === countAr.length
        };
        for (let i = 1; i < 10000000; i += 12432) {
            await addCount(i, 10);
            if (br(i)) break;
        }
        for (let i = 1; i < 10000000; i += 1243) {
            await addCount(i, 10);
            if (br(i)) break;
        }
        for (let i = 1; i < 10000000; i += 12) {
            await addCount(i, 10);
            if (br(i)) break;
        }
        for (let i = 1; i < 10000000; i += 132) {
            await addCount(12, 10);
            if (br(12)) break;
        }
        for (let i = 0; i < 1000; i += 1) {
            await addCount(1, 0);
            setCountAr(countAr);
            setCountRun(i + countrun);
            if (br(0)) break;
        }
    };


    useEffect(() => {
        setTimeout(updateData, 1000)
    }, [history]);


    const card = data.map(key => (
        <Col style={{marginRight: "3%"}} span={4} key={key.name}>
            <Card
                hoverable
                style={{width: '100%'}}
            >
                <Statistic title={key.name} value={countAr[key.countIndex]} prefix={<Icon type={key.icon}/>}/>
            </Card>
        </Col>
    ));


    return (
        <div style={{marginBottom: "12%", verticalAlign: "middle", paddingLeft: "30%"}}>
            {card}
        </div>
    );
};
