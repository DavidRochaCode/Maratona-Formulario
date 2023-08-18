import{ useState, useEffect } from "react";

const COUNTDOWN_TARGET = new Date("2023-08-30T23:59:59");

const getTimeLeft = () => {
	const totalTimeLeft = COUNTDOWN_TARGET - new Date();
	const Dias = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const Horas = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const Minutos = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const Segundos = Math.floor((totalTimeLeft / 1000) % 60);
	return { Dias, Horas, Minutos, Segundos };
};

const Countdown = () => {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='countdown'>
			<div className='content'>
				{Object.entries(timeLeft).map((el) => {
					const label = el[0];
					const value = el[1];
					return (
						<div className='box' key={label}>
							<div className='value'>
								<span>{value}</span>
							</div>
							<span className='label'> {label} </span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Countdown;