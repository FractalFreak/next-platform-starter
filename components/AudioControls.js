export default function AudioControls({ isPlaying, onToggle }) {
    return (
        <button onClick={onToggle} style={{ color: '#c5a047' }}>
            {isPlaying ? '❚❚' : '▶'}
        </button>
    );
}
