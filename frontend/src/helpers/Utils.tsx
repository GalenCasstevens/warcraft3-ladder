export const ordinalSuffixOf = (n: number) => {
	var j = n % 10;
	var k = n % 100;
	if (j == 1 && k != 11)
		return (
			<>
				{n}
				<sup>st</sup>
			</>
		);
	if (j == 2 && k != 12)
		return (
			<>
				{n}
				<sup>nd</sup>
			</>
		);
	if (j == 3 && k != 13)
		<>
			{n}
			<sup>rd</sup>
		</>;
	return (
		<>
			{n}
			<sup>th</sup>
		</>
	);
};
