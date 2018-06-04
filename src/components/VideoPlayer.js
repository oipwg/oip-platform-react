import React, { Component } from 'react';
import videojs from 'video.js';

import '../assets/css/video-js.css';
import '../assets/css/alexandria.videojs.css';

class VideoPlayer extends Component {
    constructor(props){
        super(props);

        this.state = {
            sources: {src: "", type: 'video/mp4'},
            poster: "",
            autoplay: true
        }

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let autoplay = prevState.autoplay, videoURL = prevState.sources.src, thumbnailURL = prevState.poster;
        if (nextProps.ActiveFile && nextProps.ActiveFile.info) {
            if (prevState.ActiveFile && prevState.ActiveFile.info) {
                if (nextProps.ActiveFile.info != prevState.ActiveFile.info || (nextProps.ActiveFile.hasPaid && !prevState.ActiveFile.hasPaid)) {
                    //THEN UPDATE
                    if (this.player) {
                        let thumbnail;

                        videoURL = nextProps.buildIPFSURL(nextProps.buildIPFSShortURL(nextProps.Artifact.getLocation(), nextProps.ActiveFile.info.getFilename()))
                        if (nextProps.Artifact.getThumbnail()) { thumbnail = nextProps.Artifact.getThumbnail()} else {thumbnail = ""}
                        thumbnailURL = nextProps.buildIPFSURL(nextProps.buildIPFSShortURL(nextProps.Artifact.getLocation(), thumbnail));

                        if (!this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned){
                            // console.log("Step 4 Check")
                            autoplay = false;
                        }

                    }
                }
            }
        }

        return {
            ActiveFile: nextProps.ActiveFile,
            sources: {src: videoURL, type: 'video/mp4'},
            poster: thumbnailURL,
            autoplay: autoplay
        }
    }

    componentDidMount(){
        this.player = videojs(this.videoNode, this.getPlayerOptions());
    }

    componentDidUpdate(){
        if (!this.player) {
            this.player = videojs(this.videoNode, this.getPlayerOptions());
        }

        this.player.autoplay(this.state.autoplay),
        this.player.poster(this.state.poster),
        this.player.src(this.state.sources)

        if (!this.props.DisplayPaywall){
            this.player.play();
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

    getPlayerOptions() {
        var options = {};

        options.controls = true;
        options.preload = "auto";

        let videoURL;

        if (this.props.Artifact && this.props.ActiveFile.info){
            console.log("building videoURL")
            videoURL = this.props.buildIPFSURL(this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), this.props.ActiveFile.info.getFilename()));
        } else {
            videoURL = "";
        }

        let thumbnailURL = "";

        if (this.props.Artifact){
            let thumbnail = this.props.Artifact.getThumbnail();
            thumbnailURL = this.props.buildIPFSURL(this.props.buildIPFSShortURL(this.props.Artifact.getLocation(), thumbnail.getFilename()));
        }

        let autoplay = true;

        if (this.props.ActiveFile.isPaid && (!this.props.ActiveFile.hasPaid && !this.props.ActiveFile.owned)){
            autoplay = false;
        }

        if (thumbnailURL){
            options.poster = thumbnailURL;
        }

        options.autoplay = autoplay;
        options.sources = [{src: videoURL, type: 'video/mp4'}];
        console.log("OPTIONS", options)
        return options;
    }

    render() {
        console.log("player", this.player)
        return (
            <div data-vjs-player>
                <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered">
                </video>
            </div>
        );
    }
}

VideoPlayer.SUPPORTED_FILE_TYPES = ["mp4", "webm", "ogg"];

export default VideoPlayer;