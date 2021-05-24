import React, { useEffect, useState } from 'react';

const videoHooks = () => {
	const [ctrl, setCtrl] = useState({
		playing: true,
		duration: 0,
		vol: 0.5,
		mute: false,
		progress: 0,
	});
};
