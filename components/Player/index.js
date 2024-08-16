const { default: ReactPlayer } = require("react-player")

const Player = (props) => {

    const { url,muted,playing} = props;
    return (
            <ReactPlayer muted={muted} url={url} playing={playing} />

    )
}

export default Player;
