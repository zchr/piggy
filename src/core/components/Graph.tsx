import React from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip } from 'recharts';

interface Props {
	title?: string;
	data: any;
	lines: string[];
}

export const Graph = (props: Props) => {
	const { title, data, lines } = props;
	const colors = ['#8884d8', '#82ca9d'];

	const keyNameMapping: { [key: string]: string } = {
		totalValue: 'Total value',
		cashAdded: 'Cash added',
	};

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
					tickFormatter={date => new Date(date).toLocaleDateString()}
				/>
				<Tooltip
					cursor={false}
					labelFormatter={date => new Date(date).toLocaleDateString()}
					wrapperStyle={{ zIndex: 10000 }}
				/>
				<YAxis />
				{lines.map((l, i) => (
					<Line
						key={l}
						type='monotone'
						dataKey={l}
						stroke={colors[i]}
						name={keyNameMapping[l]}
					/>
				))}
			</LineChart>
		</>
	);
};
