import React from 'react'
import { CommonView } from '../../../../utils/common'
import { Text } from 'react-native'

const KeywordCloud = ({ data }: any) => {
    return (
        <CommonView>
            {data?.trends?.map((item: any, index: number) => (
                <Text
                    key={index}
                    style={{
                        fontSize: 12 + item[1] / 10,
                        color: "#00D4FF",
                        margin: 5
                    }}>
                    {item[0]}
                </Text>
            ))}
        </CommonView>
    )
}

export default KeywordCloud