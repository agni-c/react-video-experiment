import { useState, useRef } from 'react';
import screenFull from 'screenfull';

const VideoHooks = () => {
	const playerRef = useRef(null);
	const screenFullRef = useRef(null);
	const [ctrl, setCtrl] = useState({
		playing: true,
		duration: 0,
		vol: 0.5,
		mute: false,
		progress: 0,
	});
	const [progress, setProgress] = useState(0);

	const setDuration = e => setCtrl({ ...ctrl, duration: e });
	const setVol = e => setCtrl({ ...ctrl, vol: parseFloat(e.target.value) });

	const progressHandler = e => {
		setProgress(e.playedSeconds);
	};
	const pauseHandler = () => {
		setCtrl({ ...ctrl, playing: !ctrl.playing });
	};
	const seekHandler = e => {
		playerRef.current.seekTo(parseFloat(e.target.value), 'seconds');
		setProgress(parseFloat(e.target.value));
	};
	const muteVideo = () => {
		setCtrl({ ...ctrl, mute: !ctrl.mute });
	};
	const skipHandler = (e, skipVal) => {
		if (progress > 0 && ctrl.duration > progress) {
			let newVal = progress + skipVal;
			playerRef.current.seekTo(parseFloat(newVal), 'seconds');
			setProgress(newVal);
		}
	};
	const onToggleFullScreen = e => {
		screenFull.toggle(screenFullRef.current);
	};

	return {
		playerRef,
		screenFullRef,
		ctrl,
		progress,
		setDuration,
		setVol,
		progressHandler,
		pauseHandler,
		seekHandler,
		muteVideo,
		skipHandler,
		onToggleFullScreen,
	};
};
export default VideoHooks;
