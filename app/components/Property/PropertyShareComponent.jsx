'use client';
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
  } from 'next-share';


export default function PropertyShareComponent() {
    return (
        <div className="my-4">
            <FacebookShareButton
                url={'https://github.com/next-share'}
                quote={'next-share is a social share buttons for your next React apps.'}
                hashtag={'#nextshare'}
                >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <PinterestShareButton
                url={'https://github.com/next-share'}
                media={'next-share is a social share buttons for your next React apps.'}
                >
                <PinterestIcon size={32} round />
            </PinterestShareButton>
            <TwitterShareButton
                url={'https://github.com/next-share'}
                title={'next-share is a social share buttons for your next React apps.'}
                >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={'https://github.com/next-share'}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
        </div>
    );
}
