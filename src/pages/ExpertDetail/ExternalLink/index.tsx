import React from 'react';

import ReactWordcloud, { Word, Scale, Spiral } from 'react-wordcloud';
import {BackTop, Affix, Card, Icon, Avatar} from 'antd'
import useService from "../services";
import ReactEcharts from 'echarts-for-react'

function ExternalLink() {
    const {publications, loading, expert} = useService();
    const [words, setWords] = React.useState<Word[]>([]);
    const [wordLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (loading === false && expert.name !== '') {
            setWords(expert.tags
                .slice(0, expert.tags.length > 30 ? 30 : expert.tags.length)
                .map((tag: { t: string, w: number }) => ({
                    text: tag.t, value: tag.w
                })));
            setTimeout(() => {
                console.log(publications);
                setLoading(false)
            }, 300);
        }
    }, [loading])

    const wordCloudCard = () => {
        return <Card
            loading={wordLoading}
            title="专家词云"
        >
            <div style={{ width: '100%'}}>
                {
                    !wordLoading && words.length !== 0 ?
                    <ReactWordcloud
                        words={words}
                        options={{
                            colors: [
                                '#1f77b4',
                                '#ff7f0e',
                                '#2ca02c',
                                '#d62728',
                                '#9467bd',
                                '#8c564b',
                            ],
                            enableTooltip: true,
                            scale: Scale.Linear,
                            spiral: Spiral.Rectangular,
                            deterministic: false,
                            fontSizes: [25, 45],
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            padding: 1,
                            transitionDuration: 1000,
                            rotations: 3,
                            rotationAngles: [0, 180],
                        }}
                    /> :
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        该专家未收录词条
                    </div>
                }
            </div>

        </Card>
    }

    const option = {
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 3, 5]
               }
            },
            indicator: [
               { name: '论文数', max: 25.39},
               { name: '被引数', max: 574.54},
               { name: 'H因子', max:  2.16},
            ],
            radius: 80,
        },
        series: [{
            type: 'radar',
            data : [
                 {
                    value: [
                        expert && expert.n_pubs && expert.n_pubs > 25.39 ? 27 : expert.n_pubs,
                        expert && expert.n_citation && expert.n_citation > 574.54 ? 576 : expert.n_citation,
                        expert && expert.h_index && expert.h_index > 2.16 ? 2.25 : expert.h_index
                    ],
                }
            ]
        }]
    }

    return (
        <div>
            <Affix offsetTop={10}>
                <div>
                    <div>
                        <Card
                            loading={wordLoading}
                            title="专家档案"
                        >
                            <ReactEcharts
                                option={option}
                            />
                        </Card>
                    </div>
                    <div style={{ marginTop: "1rem", }}>
                        {wordCloudCard()}
                    </div>
                </div>
            </Affix>
            <BackTop/>
        </div>
    )
}

export default ExternalLink;