import React from 'react'
import { CommonView } from '../../../../utils/common'
import { Text } from 'react-native'

const LinkAnalysis = ({ data }: any) => {
    return (
        <CommonView>
            <Text style={{ color: "#fff" }}>
                Total Links: {data?.relationships?.length}
            </Text>

        </CommonView>
    )
}

export default LinkAnalysis