import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export const Bar = ({ data }) => {
    return (
        < div style={{ height: '400px', width: "500px", overflow: 'scrollX', margin: "auto" }}>
            <ResponsiveBar
                data={data}
                keys={['value']}
                indexBy="name"
                margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
                padding={0.4}
                valueScale={{ type: 'linear' }}
                colors={(bar) => `hsl(${bar.index * 50}, 70%, 50%)`}
                animate={true}
                layout="horizontal"
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'States',
                    legendPosition: 'middle',
                    legendOffset: 40,
                }}
            />
        </div >
    );
}
export default Bar;