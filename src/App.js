import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import vid from './asset/passenger.mp4';

import VideoPlayer from './components/videoPlayer/videoPlayer';

const App = () => {
	const config = {
		youtube: {
			playerVars: {
				iv_load_policy: 3,
				modestbranding: 1,
				controls: 0,
				disablekb: 1,
				rel: 0,
			},
		},
	};

	return (
		<>
			<VideoPlayer vid={vid} config={config} />
		</>
	);
};

export default App;
