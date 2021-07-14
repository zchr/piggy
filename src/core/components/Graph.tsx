import React from 'react';
import { LineChart, XAxis, YAxis, Line } from 'recharts';

interface Props {
	title?: string;
	data: any;
	lines: string[];
}

export const Graph = (props: Props) => {
	const { title, data, lines } = props;
	const colors = ['#8884d8', '#82ca9d'];

	return (
		<>
			{title && <h4>{title}</h4>}
			<LineChart
				width={700}
				height={300}
				data={data}
				className='mb-3 graph-wrapper'
			>
				<XAxis
					dataKey='date'
					type='number'
					domain={['0', 'dataMax']}
					tickFormatter={(date) => new Date(date).toLocaleDateString()}
				/>
				<YAxis />
				{lines.map((l, i) => (
					<Line key={l} type='monotone' dataKey={l} stroke={colors[i]} />
				))}
			</LineChart>
		</>
	);
};
