import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import vid from './asset/passenger.mp4';
import screenFull from 'screenfull';
import './asset/styles/reactPlayer.scss';

const App = () => {
	const [isHovering, setIsHovering] = useState(true);
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

	return (
		<>
			<div ref={screenFullRef} className='player-wrapper'>
				<ReactPlayer
					className='react-player'
					playing={ctrl.playing}
					controls={false}
					ref={playerRef}
					// url='https://www.youtube.com/watch?v=25EHkmF1MD8'
					url={vid}
					config={config}
					onDuration={e => setCtrl({ ...ctrl, duration: e })}
					onProgress={progressHandler}
					onSeek={e => console.log(e)}
					volume={ctrl.vol}
					muted={ctrl.mute}
					height='auto'
					width='100%'
					loop
				/>
				<div
					className={`${
						ctrl.playing ? 'controls' : 'paused-controls'
					} d-flex justify-content-between flex-column`}>
					<div className={`middle-ctrl `}>
						<h1 className={ctrl.playing ? 'd-none' : ''}>
							Life's For The Living
						</h1>
						<p className={ctrl.playing ? 'd-none' : ''}>
							Well grey clouds wrapped round the town like elastic Cars stood
							like toys made of Taiwanese plastic The boy laughed at the spastic
							dancing round in the rain While laundrettes cleaned clothes, high
							heals rubbed toes Puddles splashed huddles of bus stop crows
						</p>
					</div>
					<div className='bottom-ctrl'>
						<input
							type='range'
							id='seek-bar'
							name='seek-bar'
							className='custom-slide'
							min={0}
							max={ctrl.duration}
							value={progress}
							onInput={seekHandler}
						/>
						<div className='btn-ctrl pt-1 d-flex row justify-content-between '>
							<div className='col-6 d-flex'>
								<button
									onClick={pauseHandler}
									className='play bg-transparent border-0'>
									{ctrl.playing ? (
										<span className='material-icons text-light'>pause</span>
									) : (
										<span className='material-icons text-light'>
											play_arrow
										</span>
									)}
								</button>
								<span
									class='material-icons mx-2 text-light'
									onClick={e => skipHandler(e, -5)}>
									replay_5
								</span>
								<span
									class='material-icons mx-2 text-light'
									onClick={e => skipHandler(e, 5)}>
									forward_5
								</span>
								<div className='vol-ctrl  d-flex align-items-center'>
									{ctrl.mute ? (
										<span
											onClick={muteVideo}
											className='material-icons text-light'>
											volume_off
										</span>
									) : (
										<span
											onClick={muteVideo}
											className='material-icons text-light'>
											volume_up
										</span>
									)}

									<input
										className='w-50 custom-slide'
										onInput={e =>
											setCtrl({ ...ctrl, vol: parseFloat(e.target.value) })
										}
										value={ctrl.vol}
										type='range'
										min={0}
										max={1}
										step={0.1}
									/>
								</div>
							</div>

							<div className='col-4 d-flex justify-content-end'>
								<span class='material-icons mx-2 text-light'>speed</span>
								<span class='material-icons mx-2 text-light'>hd</span>
								<span
									className='material-icons text-light'
									onClick={onToggleFullScreen}>
									fullscreen
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
