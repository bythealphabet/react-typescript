import React from "react";

function Heading({ title }: { title: string }) {
	return <h1>{title}</h1>;
}

function App(): JSX.Element {
	return (
		<div>
			<Heading title={"Great"} />
		</div>
	);
}

export default App;
