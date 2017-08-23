import * as React from 'react';

interface IProps {
    imagePath?: string
    imagePaths?: string[]
    onLoad?: () => void
    onAllLoaded?: () => void
    onFail?: () => void
}

export class ImageLoader extends React.Component<IProps, any> {

    loadId;
    errorId;
    backgroundImage;

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        if (this.props.imagePath) {
            this.loadSingle();
        }
        if (this.props.imagePaths) {
            this.loadMultiple();
        }
    }

    loadSingle() {
        const that = this;

        this.handleLoadBackgroundImage(that.props.imagePath).then(

            function fulfilled() {
                that.props.onLoad();
            },

            function rejected() {
              if (!!that.props.onFail()) {
                that.props.onFail();
              }
            }
        );
    }

    componentWillUnmount() {
        this.backgroundImage.removeEventListener('load', this.loadId);
        this.backgroundImage.removeEventListener('error', this.errorId);
    }

    loadMultiple() {
        const that = this;

        Promise.all(this.props.imagePaths.map(imagePath => this.handleLoadBackgroundImage(imagePath)))
            .then(

                function fulfilled(x) {
                    that.props.onLoad();
                },

                function rejected() {
                  if (!!that.props.onFail()) {
                    that.props.onFail();
                  }
                }
            );
    }

    handleLoadBackgroundImage = (imageURL) => {
        // Define the promise
        return new Promise((resolve, reject) => {

            this.backgroundImage = new Image();

            // Create the image
            this.loadId = () => resolve(this);

            // When image is loaded, resolve the promise
            this.backgroundImage.addEventListener('load', this.loadId);

            this.errorId = () => reject();

            // When there's an error during load, reject the promise
            this.backgroundImage.addEventListener('error', this.errorId);

            // Assign URL
            this.backgroundImage.src = imageURL;
        });
    }
    render(): JSX.Element {
        return null;
    }
}
