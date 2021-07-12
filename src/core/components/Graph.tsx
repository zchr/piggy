import React from 'react';
import { LineChart, XAxis, YAxis, Line } from 'recharts';

interface Props {
	data: any;
	lines: string[];
}

export const Graph = (props: Props) => {
	const { data, lines } = props;
	const colors = ['#8884d8', '#82ca9d'];

	return (
		<>
			<LineChart width={700} height={300} data={data} className='mb-3'>
				<XAxis
					dataKey='date'
					type='number'
					domain={['0', 'dataMax']}
					tickFormatter={(date) => new Date(date).toDateString()}
				/>
				<YAxis />
				{lines.map((l, i) => (
					<Line key={l} type='monotone' dataKey={l} stroke={colors[i]} />
				))}
			</LineChart>
		</>
	);
};
