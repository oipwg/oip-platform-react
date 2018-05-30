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

        this.updateVideoPlayer = this.updateVideoPlayer.bind(this);

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let autoplay = nextProps.autoplay, videoURL = prevState.sources.src, thumbnailURL = prevState.poster;
        if (nextProps.Artifact && nextProps.ActiveFile && nextProps.ActiveFile.info && nextProps.ActiveFile.hasPaid) {
            if (nextProps.ActiveFile.info != prevState.ActiveFile.info || nextProps.ActiveFile.hasPaid != prevState.ActiveFile.hasPaid) {
                //THEN UPDATE
                if (this.player) {
                   let thumbnail;

                   videoURL = nextProps.buildIPFSURL(nextProps.buildIPFSShortURL(nextProps.Artifact.getLocation(), nextProps.ActiveFile.info))
                   if (nextProps.Artifact.getThumbnail()) { thumbnail = nextProps.Artifact.getThumbnail()} else {thumbnail = ""}
                   thumbnailURL = nextProps.buildIPFSURL(nextProps.buildIPFSShortURL(nextProps.Artifact.getLocation(), thumbnail));

                    if (!this.state.ActiveFile.hasPaid && !this.state.ActiveFile.isOwned){
                        autoplay = false;
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

    componentDidUpdate(prevProps, prevState){
        if (!this.player) {
            this.player = videojs(this.videoNode, this.getPlayerOptions());
        }

        this.player.autoplay(this.state.autoplay),
        this.player.poster(this.state.poster),
        this.player.src(this.state.sources)

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

        if (this.state.Artifact && this.state.ActiveFile.info){
            videoURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.state.Artifact.getLocation(), this.state.ActiveFile.info));
        } else {
            videoURL = "";
        }

        let thumbnailURL = "";

        if (this.state.Artifact){
            let thumbnail = this.state.Artifact.getThumbnail();
            thumbnailURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.state.Artifact.getLocation(), thumbnail));
        }

        let autoplay = true;

        if (this.state.ActiveFile.isPaid && (!this.state.ActiveFile.hasPaid && !this.state.ActiveFile.isOwned)){
            autoplay = false;
        }

        if (thumbnailURL){
            options.poster = thumbnailURL;
        }

        options.autoplay = autoplay;
        options.sources = [{src: videoURL, type: 'video/mp4'}];

        return options;
    }

    updateVideoPlayer(){
        if (this.state.Artifact && this.state.ActiveFile){
            if (this.player){
                try {
                    //this.player.reset();
                } catch(e){}

                let options = this.getPlayerOptions();

                if (options.poster){
                    this.player.poster = options.poster;
                }

                this.player.autoplay(options.autoplay);

                this.player.src(options.sources);
                console.log(options);

                if (!this.props.DisplayPaywall){
                    this.player.play();
                }
            } else {
                this.createVideoPlayer();
            }
        }
    }

    buildIPFSShortURL(location, file) {
        if (!location || !file)
            return "";

        return location + "/" + file.fname;
    }

    buildIPFSURL(hash, fname) {
        let trailURL = "";
        if (!fname) {
            let parts = hash.split('/');
            if (parts.length == 2) {
                trailURL = parts[0] + "/" + encodeURIComponent(parts[1]);
            } else {
                trailURL = hash;
            }
        } else {
            trailURL = hash + "/" + encodeURIComponent(fname);
        }
        return "https://gateway.ipfs.io/ipfs/" + trailURL;
    }

    render() {
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