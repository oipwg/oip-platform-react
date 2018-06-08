import React, { Component } from 'react';
import videojs from 'video.js';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

class VideoPlayer extends Component {
    constructor(props){
        super(props);

        this.state = {
            options: {
                sources: {src: "", type: 'video/mp4'},
                poster: "",
                autoplay: true,
                controls: true,
                preload: "auto"
            }
        }

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let options = prevState.options;

        if (nextProps.Artifact && nextProps.ActiveFile && nextProps.ActiveFile.info) {
            options.sources.src = nextProps.buildIPFSURL(nextProps.buildIPFSShortURL(nextProps.Artifact.getLocation(), nextProps.ActiveFile.info.getFilename()))

            let thumbnail
            if (nextProps.Artifact.getThumbnail()) {
                thumbnail = nextProps.Artifact.getThumbnail()
                options.poster = nextProps.buildIPFSURL(nextProps.buildIPFSShortURL(nextProps.Artifact.getLocation(), thumbnail.getFilename()));
            }

            if (nextProps.ActiveFile.isPaid && (nextProps.ActiveFile.hasPaid && !nextProps.ActiveFile.owned)){
                options.autoplay = false;
            }

        }
        return {
            ActiveFile: nextProps.ActiveFile,
            options: options
        }
    }

    componentDidMount(){
        this.player = videojs(this.videoNode, this.state.options);
    }

    componentDidUpdate(){
        if (this.player) {
            let opts = this.player.options_;

            if (opts.autoplay != this.state.options.autoplay) {
                this.player.autoplay(this.state.options.autoplay)
            }
            if (opts.post != this.state.options.poster) {
                this.player.poster(this.state.options.poster)
            }
            if (opts.sources != this.state.options.sources) {
                this.player.src(this.state.options.sources)
            }

            if (!this.props.DisplayPaywall){
                this.player.play();
            }
        }
    }

    componentWillUnmount(){
        if (this.player) {
            try {
                this.player.pause()
                this.player.reset()
            } catch(e){
                console.error(e);
            }
        }
    }

    render() {
        return (
            <div>
                <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered">
                </video>
            </div>
        );
    }
}

VideoPlayer.SUPPORTED_FILE_TYPES = ["mp4"];

export default VideoPlayer;