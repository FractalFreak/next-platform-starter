import { memo } from 'react';

const AudioControls = ({ isPlaying, onToggle }) => (
    <button onClick={onToggle} style={{ color: '#c5a047' }}>
        {isPlaying ? '❚❚' : '▶'}
    </button>
);

export default memo(AudioControls);
